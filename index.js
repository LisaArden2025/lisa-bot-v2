require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { handleToolCall } = require('./supabase');
const functionDefinitions = require('./uploadFunctions.js'); // 💥 <-- ADDED
const app = express();
app.use(express.json());

// Memory store
const userMemory = {}; 
// { chatId: { lastStore: '...', lastVendor: '...', lastAction: '...', lastResult: '...' } }

// Telegram and OpenAI keys
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// OpenAI call function
async function askOpenAI(message, memory = {}) {
  const systemPrompt = `You are Lisa Bot v2, an AI assistant for Cade.

You must ALWAYS respond with a raw JSON object like:
{
  "action": "function_name",
  "parameters": { "store": "...", "vendor": "...", ... }
}

Memory:
- Last Store: ${memory.lastStore || "unknown"}
- Last Vendor: ${memory.lastVendor || "unknown"}

If information is missing, guess intelligently based on memory.

NO explanations. NO markdown. NO code blocks. Respond ONLY with pure JSON.`;

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4-1106-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0,
      functions: functionDefinitions,   // 💥 <-- Tell OpenAI about the full list of your 125+ functions
      function_call: 'auto'              // 💥 <-- Let OpenAI auto pick the correct function
    },
    { headers: { Authorization: `Bearer ${OPENAI_API_KEY}` } }
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

  // Initialize memory for user if doesn't exist
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
