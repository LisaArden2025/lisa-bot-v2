// telegram.js
const axios = require('axios');

async function sendTelegramMessage(chatId, text) {
  await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
    chat_id: chatId,
    text: text,
  });
}

module.exports = { sendTelegramMessage };
