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
const ordersFunctions = require('./uploadFunctionsOrders.js');
const salesFunctions = require('./uploadFunctionsSales.js');
const inventoryFunctions = require('./uploadFunctionsInventory.js');

// Router: Pick which Assistant ID to use
function pickBot(message) {
  const lower = message.toLowerCase();

  if (lower.includes('order') || lower.includes('log')) {
    return { bot: 'orders', functions: ordersFunctions };
  } else if (lower.includes('sales') || lower.includes('revenue') || lower.includes('profit')) {
    return { bot: 'sales', functions: salesFunctions };
  } else if (lower.includes('inventory') || lower.includes('clearance') || lower.includes('stock')) {
    return { bot: 'inventory', functions: inventoryFunctions };
  } else {
    return { bot: 'default', functions: salesFunctions }; // Default to Sales
  }
}



// OpenAI call function
async function askOpenAI(message, memory = {}) {
  const systemPrompt = `You are Lisa Bot v2, an AI assistant for Cade.

Always respond ONLY with a raw JSON object:
{
  "action": "function_name",
  "parameters": { "store": "...", "vendor": "...", ... }
}

Memory:
- Last Store: ${memory.lastStore || "unknown"}
- Last Vendor: ${memory.lastVendor || "unknown"}

No explanations. No markdown. Only raw JSON.`;

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4-1106-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      functions: functionDefinitions,
      function_call: 'auto',
    },
    { headers: { Authorization: `Bearer ${OPENAI_API_KEY}` } }
  );

  return response.data.choices[0].message; // 💥 THIS WAS MISSING
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

  // Initialize memory
  if (!userMemory[chatId]) {
    userMemory[chatId] = {
      lastStore: null,
      lastVendor: null,
      lastAction: null,
      lastResult: null
    };
  }

  try {
    // 🔥 New: Pick bot first
    const { bot, functions } = pickBot(userText);

    // 🔥 New: Pass correct functions
    const aiResponse = await askOpenAI(userText, userMemory[chatId], functions);

    if (aiResponse.function_call) {
      const toolCall = {
        function: {
          name: aiResponse.function_call.name,
          arguments: aiResponse.function_call.arguments
        }
      };

      const parsedArgs = JSON.parse(toolCall.function.arguments);
      if (!parsedArgs.store && userMemory[chatId].lastStore) {
        parsedArgs.store = userMemory[chatId].lastStore;
      }
      if (!parsedArgs.vendor && userMemory[chatId].lastVendor) {
        parsedArgs.vendor = userMemory[chatId].lastVendor;
      }
      toolCall.function.arguments = JSON.stringify(parsedArgs);

      const result = await handleToolCall(toolCall);

      if (parsedArgs.store) userMemory[chatId].lastStore = parsedArgs.store;
      if (parsedArgs.vendor) userMemory[chatId].lastVendor = parsedArgs.vendor;
      userMemory[chatId].lastAction = toolCall.function.name;
      userMemory[chatId].lastResult = result;

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
