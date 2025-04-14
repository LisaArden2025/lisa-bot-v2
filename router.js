// router.js
function detectAssistantId(botType) {
  if (botType === 'orders') {
    return process.env.OPENAI_ORDERS_ASSISTANT_ID;
  }
  if (botType === 'inventory') {
    return process.env.OPENAI_INVENTORY_ASSISTANT_ID;
  }
  if (botType === 'data') {
    return process.env.OPENAI_DATA_ASSISTANT_ID;
  }
  return process.env.OPENAI_DEFAULT_ASSISTANT_ID;  // Fallback
}

module.exports = { detectAssistantId };
