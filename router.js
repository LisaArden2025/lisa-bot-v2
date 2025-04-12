// router.js
const ORDERS_FUNCTIONS = [
    "log_order_smart", "log_inventory_check", "set_reminder"
  ];
  
  const INVENTORY_FUNCTIONS = [
    "query_clearance_candidates", "query_low_inventory_products", "query_dead_inventory_products",
    "query_clearance_inventory_value", "query_store_clearance_units_on_hand", "query_vendor_clearance_units_on_hand",
    "detect_new_delivery_by_inventory_spike", "detect_product_count_increase",
    "compare_store_inventory_values", "compare_store_clearance_inventory",
    // Add all other Inventory related function names here
  ];
  
  const DATA_FUNCTIONS = [
    "query_top_x_vendors", "query_vendor_total_units", "query_vendor_total_revenue",
    "query_top_selling_product", "query_vendor_most_sold_product", "query_units_sold_last_7_days",
    "query_vendor_percent_revenue", "query_vendor_unit_share", "query_vendor_gross_margin",
    // Add all other Data related function names here
  ];
  
  // Pick the right Assistant
  function routeToAssistant(functionName) {
    if (ORDERS_FUNCTIONS.includes(functionName)) {
      return process.env.OPENAI_ORDERS_ASSISTANT_ID;
    }
    if (INVENTORY_FUNCTIONS.includes(functionName)) {
      return process.env.OPENAI_INVENTORY_ASSISTANT_ID;
    }
    if (DATA_FUNCTIONS.includes(functionName)) {
      return process.env.OPENAI_DATA_ASSISTANT_ID;
    }
    return null;
  }
  
  module.exports = { routeToAssistant };
  