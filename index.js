require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { handleToolCall } = require('./supabase');
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
  
  You must always respond with a raw JSON object like:
  {
    "action": "function_name",
    "parameters": { "store": "...", "vendor": "...", ... }
  }
  
  Previous memory:
  - Last Store: ${memory.lastStore || "unknown"}
  - Last Vendor: ${memory.lastVendor || "unknown"}
  
  Use the memory to fill in missing details if user asks "they" or "there" or "that store".
  
  If it's unclear, use the closest guess based on memory.`;
  
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-1106-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0,
      },
      { headers: { Authorization: `Bearer ${OPENAI_API_KEY}` } }
    );
  
    return response.data.choices[0].message.content;
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

  // 1. Initialize memory for user if doesn't exist
  if (!userMemory[chatId]) {
    userMemory[chatId] = {
      lastStore: null,
      lastVendor: null,
      lastAction: null,
      lastResult: null
    };
  }

  try {
    // 2. Ask OpenAI to understand the message
    const aiResponse = await askOpenAI(userText, userMemory[chatId]);
    const toolCall = JSON.parse(aiResponse);

    // 3. Fill in missing parameters from memory
    if (!toolCall.parameters.store && userMemory[chatId].lastStore) {
      toolCall.parameters.store = userMemory[chatId].lastStore;
    }
    if (!toolCall.parameters.vendor && userMemory[chatId].lastVendor) {
      toolCall.parameters.vendor = userMemory[chatId].lastVendor;
    }

    // 4. Handle the function call (query Supabase)
    const result = await handleToolCall({
      function: { name: toolCall.action, arguments: JSON.stringify(toolCall.parameters) },
    });

    // 5. Update memory after action
    if (toolCall.parameters.store) {
      userMemory[chatId].lastStore = toolCall.parameters.store;
    }
    if (toolCall.parameters.vendor) {
      userMemory[chatId].lastVendor = toolCall.parameters.vendor;
    }
    userMemory[chatId].lastAction = toolCall.action;
    userMemory[chatId].lastResult = result;

    // 6. Reply to Telegram
    await sendMessage(chatId, result);
  } catch (error) {
    console.error('Full error:', error);
    await sendMessage(chatId, 'Sorry, something went wrong. Please try again!');
  }

  res.sendStatus(200);
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Lisa Bot v2 Server running on port ${PORT}`);
});
