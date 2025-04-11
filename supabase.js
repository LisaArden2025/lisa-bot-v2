// supabase.js
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function handleToolCall(toolCall) {
  const { name, arguments: args } = toolCall.function;
  const parsedArgs = JSON.parse(args);

  if (name === 'query_sales') {
    const { store, product } = parsedArgs;
    const { data, error } = await supabase
      .from('Sales')
      .select('units_sold')
      .eq('store', store)
      .eq('product', product)
      .limit(1);

    if (error) throw error;
    return `You sold ${data[0]?.units_sold || 0} units of ${product} at ${store} last week.`;
  }

  if (name === 'log_order') {
    const { store, vendor, amount, notes } = parsedArgs;
    const { error } = await supabase
      .from('Orders')
      .insert([{ store, vendor, amount, notes }]);

    if (error) throw error;
    return `Order logged for ${vendor} at ${store} for $${amount}.`;
  }

  if (name === 'set_reminder') {
    const { store, notes, reminder_date } = parsedArgs;
    const { error } = await supabase
      .from('Reminders')
      .insert([{ store, notes, reminder_date }]);

    if (error) throw error;
    return `Reminder set for ${store}: "${notes}" on ${reminder_date}.`;
  }

  return 'Tool call not recognized.';
}

module.exports = { handleToolCall };
