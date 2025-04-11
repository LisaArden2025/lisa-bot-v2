// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { sendToAssistant } = require('./openai');
const { handleToolCall } = require('./supabase');
const { sendTelegramMessage } = require('./telegram');

const app = express();
app.use(bodyParser.json());

app.post('/telegram-webhook', async (req, res) => {
  try {
    const message = req.body.message;
    const chatId = message.chat.id;
    const userText = message.text;

    const assistantResponse = await sendToAssistant(userText);

    if (assistantResponse.tool_calls && assistantResponse.tool_calls.length > 0) {
      const toolResult = await handleToolCall(assistantResponse.tool_calls[0]);
      await sendTelegramMessage(chatId, toolResult);
    } else {
      const reply = assistantResponse.choices[0].message.content;
      await sendTelegramMessage(chatId, reply);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Error in webhook:', error);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Lisa Bot v2 Server running on port ${PORT}`);
});
