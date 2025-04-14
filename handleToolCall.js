const { createClient } = require('@supabase/supabase-js');

// Connect to Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Handle incoming tool calls
async function handleToolCall(toolCall) {
  const { name, arguments: args } = toolCall.function;

  // Example for query_vendor_total_revenue
  if (name === 'query_vendor_total_revenue') {
    const store = args.store;
    const vendor = args.vendor;

    const { data, error } = await supabase
      .from('sales')  // ✅ (Replace 'sales' with your actual table name if different)
      .select('revenue')
      .eq('store', store)
      .eq('vendor', vendor);

    if (error) {
      console.error(error);
      return `Error fetching revenue for ${vendor} at ${store}.`;
    }

    if (!data || data.length === 0) {
      return `No revenue data found for ${vendor} at ${store}.`;
    }

    const totalRevenue = data.reduce((sum, row) => sum + (row.revenue || 0), 0);

    return `Total revenue for ${vendor} at ${store} is $${totalRevenue.toLocaleString()}.`;
  }

  // Add more functions like query_store_total_profit, query_top_x_vendors here later...

  return `Unknown function call: ${name}`;
}

module.exports = { handleToolCall };
