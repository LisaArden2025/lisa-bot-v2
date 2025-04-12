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
    const availableActions = `
Available actions:
query_top_3_vendors, query_vendor_total_units, query_vendor_total_revenue, query_top_selling_product, query_vendor_most_sold_product, query_clearance_candidates, query_low_inventory_products, query_vendor_average_price, query_inventory_value, query_vendor_total_profit, query_highest_profit_product, query_discounted_products, query_units_sold_last_7_days, query_vendor_sales_growth, query_top_categories, query_vendor_percent_revenue, query_vendor_unit_share, query_vendor_gross_margin, query_vendor_average_markup, query_vendor_product_count, query_vendor_total_inventory_value, query_vendor_discounted_units, query_vendor_discount_rate, query_vendor_clearance_items, query_vendor_active_units, query_vendor_stale_products, query_vendor_inventory_turnover, query_vendor_slow_moving_products, query_store_total_revenue, query_store_total_profit, query_store_gross_margin, query_store_average_markup, query_store_inventory_value, query_store_discounted_units, query_store_average_discount, query_store_units_sold_last_7_days, query_store_units_sold_last_30_days, query_store_sales_growth, query_store_top_categories, query_store_lowest_margin_vendors, query_store_highest_margin_vendors, query_clearance_inventory_value, query_dead_inventory_products, query_total_clearance_units, query_vendor_percent_units_sold, query_vendor_profit_contribution, query_vendor_overstock_products, query_vendor_understock_products, query_vendor_weekly_sales, query_vendor_monthly_sales, query_store_total_units, query_store_discounted_inventory, query_store_inventory_health, query_top_vendors_by_profit, query_vendor_average_discount, query_top_5_products_by_units, query_top_5_products_by_revenue, query_category_total_revenue, query_category_units_sold, query_category_profit, query_category_gross_margin, query_category_average_price, query_vendor_product_categories, query_vendor_total_categories, query_vendor_most_profitable_category, query_vendor_highest_units_category, query_clearance_units_sold, query_clearance_revenue, query_clearance_profit_loss, query_vendor_clearance_loss, query_product_total_units, query_product_total_revenue, query_product_total_profit, query_product_average_price, query_product_gross_margin, query_product_discounted_units, query_product_clearance_status, query_product_inventory_value, query_product_last_sale_date, query_dead_stock_products, query_high_margin_products, query_low_margin_products, query_fast_selling_products, query_slow_selling_products, query_vendor_units_in_stock, query_vendor_inventory_value, query_vendor_total_discounts, query_vendor_average_units_per_sku, query_vendor_total_products, query_vendor_highest_margin_product, query_vendor_lowest_margin_product, query_vendor_clearance_products, query_store_total_clearance_value, query_store_total_discount_loss, query_vendor_discount_loss, query_vendor_last_inventory_check, query_upcoming_reminders, query_pending_inventory_reviews, query_vendor_return_products, query_store_lowest_profit_products, query_vendor_lowest_profit_products, query_store_average_units_per_product, query_vendor_fastest_selling_product, query_vendor_slowest_selling_product, query_vendor_total_product_count, query_vendor_units_sold_last_week, query_vendor_revenue_last_week, query_store_clearance_units_on_hand, query_vendor_clearance_units_on_hand, query_clearance_discount_average, query_vendor_clearance_discount_average, query_inventory_check_due_today, compare_vendors_between_stores, find_vendors_only_in_store, find_common_vendors_across_stores, detect_new_delivery_by_inventory_spike, compare_vendor_product_counts, detect_product_count_increase, detect_inventory_jump_by_vendor, detect_vendor_removed_from_store, compare_store_inventory_values, compare_store_clearance_inventory, find_vendors_missing_in_store, list_all_vendors_in_store, find_shared_products_across_stores, find_unique_products_in_store, compare_store_total_units, find_store_with_most_clearance, find_store_with_highest_inventory_value, find_vendor_highest_units_store, find_vendor_highest_revenue_store, detect_new_vendor_in_store, detect_vendor_removed_across_stores, query_stores_missing_vendor, detect_product_added_to_store, detect_product_removed_from_store
    `;

    const systemPrompt = `You are Lisa Bot v2, an AI assistant for Cade.

You must always respond with a raw JSON object like:
{
  "action": "function_name",
  "parameters": { "store": "...", "vendor": "...", ... }
}

Previous memory:
- Last Store: ${memory.lastStore || "unknown"}
- Last Vendor: ${memory.lastVendor || "unknown"}

${availableActions}

Use memory to fill in missing details if the user says "they" or "that store".

If unsure, guess based on memory.

Respond ONLY with raw JSON, no explanations or code blocks.`;

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
    // Ask OpenAI to understand the message
    const aiResponse = await askOpenAI(userText, userMemory[chatId]);
    const toolCall = JSON.parse(aiResponse);

    // Fill in missing parameters from memory
    if (!toolCall.parameters.store && userMemory[chatId].lastStore) {
      toolCall.parameters.store = userMemory[chatId].lastStore;
    }
    if (!toolCall.parameters.vendor && userMemory[chatId].lastVendor) {
      toolCall.parameters.vendor = userMemory[chatId].lastVendor;
    }

    // Handle the function call (query Supabase)
    const result = await handleToolCall({
      function: { name: toolCall.action, arguments: JSON.stringify(toolCall.parameters) },
    });

    // Update memory after action
    if (toolCall.parameters.store) {
      userMemory[chatId].lastStore = toolCall.parameters.store;
    }
    if (toolCall.parameters.vendor) {
      userMemory[chatId].lastVendor = toolCall.parameters.vendor;
    }
    userMemory[chatId].lastAction = toolCall.action;
    userMemory[chatId].lastResult = result;

    // Send reply to Telegram
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
