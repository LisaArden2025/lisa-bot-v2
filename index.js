require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { handleToolCall } = require('./supabase');
const functionDefinitions = require('./uploadFunctions.js'); // ✅ Corrected
const app = express();
app.use(express.json());

// Memory store
const userMemory = {}; 

// Telegram and OpenAI keys
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Router: Pick which Assistant ID to use
function decideAssistant(message) {
  const text = message.toLowerCase();

  if (text.includes('order') || text.includes('log') || text.includes('inventory check') || text.includes('remind me')) {
    return process.env.OPENAI_ORDERS_ASSISTANT_ID; // 🚀 Order Assistant
  }

  if (text.includes('vendor') || text.includes('sales') || text.includes('revenue') || text.includes('margin') || text.includes('profit') || text.includes('units sold')) {
    return process.env.OPENAI_DATA_ASSISTANT_ID; // 🚀 Data Assistant
  }

  if (text.includes('clearance') || text.includes('dead stock') || text.includes('discount') || text.includes('inventory spike')) {
    return process.env.OPENAI_INVENTORY_ASSISTANT_ID; // 🚀 Inventory Assistant
  }

  return process.env.OPENAI_DATA_ASSISTANT_ID; // Default fallback
}

// OpenAI call function
async function askOpenAI(message, memory = {}) {
  const assistantId = decideAssistant(message); // 🔥 Pick the right assistant dynamically

  const systemPrompt = `You are Lisa Bot v2, an AI assistant for Cade.

Always respond ONLY with a raw JSON object:
{
  "action": "function_name",
  "parameters": { "store": "...", "vendor": "...", ... }
}

Memory:
- Last Store: ${memory.lastStore || "unknown"}
- Last Vendor: ${memory.lastVendor || "unknown"}

Use memory intelligently to fill missing details.
No explanations. No markdown. No code blocks. Respond ONLY with raw JSON.`

  const response = await axios.post(
    `https://api.openai.com/v1/chat/completions`,
    {
      model: 'gpt-4-1106-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0,
      functions: functionDefinitions, // ✅ Your full tool list
      function_call: 'auto'
    },
    { 
      headers: { 
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'OpenAI-Assistant-Id': assistantId // ✅ Specify the right Assistant dynamically!
      } 
    }
  );

  return response.data.choices[0].message;
}

// Send message back to Telegram
async function sendMessage(chatId, text) {
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text,
  });
}

// Telegram Webhook
app.post('/webhook', async (req, res) => {
  const message = req.body.message;
  if (!message || !message.text) {
    return res.sendStatus(200);
  }

  const chatId = message.chat.id;
  const userText = message.text;

  // Initialize memory for user if it doesn't exist
  if (!userMemory[chatId]) {
    userMemory[chatId] = {
      lastStore: null,
      lastVendor: null,
      lastAction: null,
      lastResult: null
    };
  }

  try {
    // Ask OpenAI what to do
    const aiResponse = await askOpenAI(userText, userMemory[chatId]);

    if (aiResponse.function_call) {
      // Parse OpenAI's selected function call
      const toolCall = {
        function: {
          name: aiResponse.function_call.name,
          arguments: aiResponse.function_call.arguments
        }
      };

      // Fill missing parameters from memory
      const parsedArgs = JSON.parse(toolCall.function.arguments);
      if (!parsedArgs.store && userMemory[chatId].lastStore) {
        parsedArgs.store = userMemory[chatId].lastStore;
      }
      if (!parsedArgs.vendor && userMemory[chatId].lastVendor) {
        parsedArgs.vendor = userMemory[chatId].lastVendor;
      }
      toolCall.function.arguments = JSON.stringify(parsedArgs);

      // Handle the function call (Supabase query)
      const result = await handleToolCall(toolCall);

      // Update memory
      if (parsedArgs.store) userMemory[chatId].lastStore = parsedArgs.store;
      if (parsedArgs.vendor) userMemory[chatId].lastVendor = parsedArgs.vendor;
      userMemory[chatId].lastAction = toolCall.function.name;
      userMemory[chatId].lastResult = result;

      // Send back to Telegram
      await sendMessage(chatId, result);
    } else {
      await sendMessage(chatId, "Sorry, I didn't understand that.");
    }
  } catch (error) {
    console.error('Full error:', error.response?.data || error.message);
    await sendMessage(chatId, 'Sorry, something went wrong. Please try again!');
  }

  res.sendStatus(200);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Lisa Bot v2 Server running on port ${PORT}`);
});
