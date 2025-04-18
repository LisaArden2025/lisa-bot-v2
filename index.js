require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { handleToolCall } = require('./supabase');
const orderFunctions = require('./uploadFunctionsOrders.js');
const salesFunctions = require('./uploadFunctionsSales.js');
const inventoryFunctions = require('./uploadFunctionsInventory.js');
const { detectAssistantId } = require('./router');

const app = express();
app.use(express.json());

// Memory store
const userMemory = {};

// Telegram and OpenAI keys
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Bot Picker based on message
function pickBot(message) {
  const lower = message.toLowerCase();

  if (lower.includes('order') || lower.includes('log') || lower.includes('place order')) {
    return { bot: 'orders', functions: orderFunctions };
  } else if (
    lower.includes('sales') || 
    lower.includes('revenue') || 
    lower.includes('profit') || 
    lower.includes('vendor') || 
    lower.includes('rank') || 
    lower.includes('units') || 
    lower.includes('top') ||
    lower.includes('highest')
  ) {
    return { bot: 'sales', functions: salesFunctions };
  } else if (
    lower.includes('inventory') || 
    lower.includes('clearance') || 
    lower.includes('stock') || 
    lower.includes('overstock') || 
    lower.includes('dead inventory') || 
    lower.includes('slow movers')
  ) {
    return { bot: 'inventory', functions: inventoryFunctions };
  } else {
    return { bot: 'sales', functions: salesFunctions };  // Default fallback
  }
}

async function askOpenAIFollowUp(toolResult, assistantId) {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4-1106-preview',
      temperature: 0,  // ✅ No randomness
      messages: [
        { role: 'system', content: "You are Lisa Bot v2. You just received real database information. Turn it into a clear, professional, friendly human response for the user." },
        { role: 'user', content: `Here is the database result:\n\n${toolResult}\n\nPlease summarize and respond nicely to the user.` }
      ],
      assistant_id: assistantId
    },
    { headers: { Authorization: `Bearer ${OPENAI_API_KEY}` } }
  );

  return response.data.choices[0].message.content.trim();
}

// OpenAI call function
async function askOpenAI(message, memory = {}, functions = [], assistantId) {
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
      temperature: 0,   // ✅ Always set temperature to 0 for strict behavior
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      assistant_id: assistantId
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

  if (!userMemory[chatId]) {
    userMemory[chatId] = {
      lastStore: null,
      lastVendor: null,
      lastAction: null,
      lastResult: null
    };
  }

  try {
    // Pick the bot based on user text
    const { bot, functions } = pickBot(userText);
    const assistantId = detectAssistantId(bot);

    // Ask OpenAI
    const aiResponse = await askOpenAI(userText, userMemory[chatId], functions, assistantId);

    if (aiResponse.function_call) {
      const toolCall = {
        function: {
          name: aiResponse.function_call.name,
          arguments: JSON.parse(aiResponse.function_call.arguments)  // ✅ Parse ONCE here
        }
      };

      // Autofill store/vendor from memory if missing
      if (!toolCall.function.arguments.store && userMemory[chatId].lastStore) {
        toolCall.function.arguments.store = userMemory[chatId].lastStore;
      }
      if (!toolCall.function.arguments.vendor && userMemory[chatId].lastVendor) {
        toolCall.function.arguments.vendor = userMemory[chatId].lastVendor;
      }

      // Run real Supabase function call
      const toolResult = await handleToolCall(toolCall);

      // 🛠️ NEW: Send real Supabase data BACK to OpenAI for nice human wording
      const aiResponse = await askOpenAIFollowUp(toolResult, assistantId);
      
      // 🛠️ THEN send the final human-style AI message to Telegram
      await sendMessage(chatId, aiResponse);
      
      // Update memory
      if (toolCall.function.arguments.store) userMemory[chatId].lastStore = toolCall.function.arguments.store;
      if (toolCall.function.arguments.vendor) userMemory[chatId].lastVendor = toolCall.function.arguments.vendor;
      userMemory[chatId].lastAction = toolCall.function.name;
      userMemory[chatId].lastResult = result;

      // Send the real result to Telegram
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