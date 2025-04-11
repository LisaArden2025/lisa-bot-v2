// openai.js
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function sendToAssistant(userMessage) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: userMessage }],
    tools: [
      {
        type: 'function',
        function: {
          name: 'query_sales',
          description: 'Query how many units were sold for a product at a store.',
          parameters: {
            type: 'object',
            properties: {
              store: { type: 'string' },
              product: { type: 'string' }
            },
            required: ['store', 'product']
          }
        }
      },
      {
        type: 'function',
        function: {
          name: 'log_order',
          description: 'Log a new order placed to a vendor.',
          parameters: {
            type: 'object',
            properties: {
              store: { type: 'string' },
              vendor: { type: 'string' },
              amount: { type: 'number' },
              notes: { type: 'string' }
            },
            required: ['store', 'vendor', 'amount']
          }
        }
      },
      {
        type: 'function',
        function: {
          name: 'set_reminder',
          description: 'Set a reminder for a future follow-up.',
          parameters: {
            type: 'object',
            properties: {
              store: { type: 'string' },
              notes: { type: 'string' },
              reminder_date: { type: 'string' }
            },
            required: ['store', 'notes', 'reminder_date']
          }
        }
      }
    ],
    tool_choice: 'auto'
  });
  return response;
}

module.exports = { sendToAssistant };
