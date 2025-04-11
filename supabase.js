const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Helper: Capitalize Each Word
function capitalizeWords(str) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

// Helper: Fuzzy Match Store Name
async function matchStore(storeName) {
  const { data } = await supabase.from('Stores').select('store');
  if (!data) return storeName;
  const stores = data.map(s => s.store);
  return stores.find(s => storeName.toLowerCase().includes(s.toLowerCase().split(' ')[1])) || storeName;
}

// Helper: Fuzzy Match Vendor Name
async function matchVendor(vendorName) {
  const { data } = await supabase.from('Vendors').select('vendor');
  if (!data) return vendorName;
  const vendors = data.map(v => v.vendor);
  return vendors.find(v => vendorName.toLowerCase().includes(v.toLowerCase().split(' ')[0])) || vendorName;
}

// Tool Handler
async function handleToolCall(toolCall) {
  const { name, arguments: args } = toolCall.function;
  const parsedArgs = JSON.parse(args);

  if (name === 'log_order_smart') {
    const { store, vendor, order_date, total, raw_notes } = parsedArgs;
    const matchedStore = capitalizeWords(await matchStore(store));
    const matchedVendor = capitalizeWords(await matchVendor(vendor));
    const { error } = await supabase.from('Orders').insert([{
      store: matchedStore,
      vendor: matchedVendor,
      order_date,
      total,
      notes: raw_notes
    }]);
    if (error) throw error;
    return `Order logged for ${matchedVendor} at ${matchedStore}.`;
  }

  if (name === 'query_vendor_rank') {
    const { store, vendor, info_type } = parsedArgs;
    const matchedStore = capitalizeWords(await matchStore(store));
    const matchedVendor = capitalizeWords(await matchVendor(vendor));
    const { data, error } = await supabase.from('vendor_rank')
      .select('*')
      .eq('store', matchedStore)
      .eq('vendor', matchedVendor)
      .single();
    if (error || !data) return `No vendor ranking found for ${matchedVendor} at ${matchedStore}.`;

    if (info_type === 'rank') return `${matchedVendor} is ranked #${data.rank} at ${matchedStore}.`;
    if (info_type === 'revenue') return `${matchedVendor}'s revenue at ${matchedStore} is $${data.total_revenue}.`;
    if (info_type === 'profit') return `${matchedVendor}'s profit at ${matchedStore} is $${data.total_profit}.`;
    if (info_type === 'percent_revenue') return `${matchedVendor} generates ${data.percent_revenue}% of total revenue at ${matchedStore}.`;

    return `Details for ${matchedVendor}: ${JSON.stringify(data)}.`;
  }

  if (name === 'list_stores') {
    const { data, error } = await supabase.from('Stores').select('store');
    if (error) throw error;
    return `You buy for these stores: ${data.map(s => s.store).join(', ')}.`;
  }

  if (name === 'list_vendors') {
    const { data, error } = await supabase.from('Vendors').select('vendor');
    if (error) throw error;
    return `Your vendors: ${data.map(v => v.vendor).join(', ')}.`;
  }

  if (name === 'log_inventory_check') {
    const { store, vendor, notes } = parsedArgs;
    const matchedStore = capitalizeWords(await matchStore(store));
    const matchedVendor = capitalizeWords(await matchVendor(vendor));
    const { error } = await supabase.from('checked_not_ready').insert([{
      store: matchedStore,
      vendor: matchedVendor,
      notes,
      date_checked: new Date().toISOString()
    }]);
    if (error) throw error;
    return `Inventory check logged for ${matchedVendor} at ${matchedStore}.`;
  }

  if (name === 'list_reminders_due') {
    const { data, error } = await supabase.from('Reminders').select('*');
    if (error) throw error;
    const upcoming = data.filter(r => new Date(r.reminder_date) > new Date());
    if (!upcoming.length) return `No upcoming reminders.`;
    return `Upcoming reminders: ${upcoming.map(r => `${r.store} - ${r.vendor} on ${r.reminder_date}`).join('; ')}.`;
  }

  if (name === 'query_vendor_sales') {
    const { store, vendor } = parsedArgs;
    const matchedStore = capitalizeWords(await matchStore(store));
    const matchedVendor = capitalizeWords(await matchVendor(vendor));
    const { data, error } = await supabase
      .from(`${matchedStore} Sales & Inventory by Day`)
      .select('vendor, units_sold, revenue')
      .eq('vendor', matchedVendor)
      .limit(1);
    if (error || !data.length) return `No sales found for ${matchedVendor} at ${matchedStore}.`;
    return `${matchedVendor} sold ${data[0].units_sold} units and made $${data[0].revenue} at ${matchedStore}.`;
  }

  if (name === 'query_top_selling_vendor') {
    const { store } = parsedArgs;
    const matchedStore = capitalizeWords(await matchStore(store));
    const { data, error } = await supabase
      .from(`${matchedStore} Sales & Inventory by Day`)
      .select('vendor, units_sold')
      .order('units_sold', { ascending: false })
      .limit(1);
    if (error || !data.length) return `No sales found at ${matchedStore}.`;
    return `Top selling vendor at ${matchedStore} is ${data[0].vendor} with ${data[0].units_sold} units sold.`;
  }

  if (name === 'query_lowest_margin_vendor') {
    const { store } = parsedArgs;
    const matchedStore = capitalizeWords(await matchStore(store));
    const { data, error } = await supabase
      .from('vendor_rank')
      .select('vendor, gross_margin_pct')
      .eq('store', matchedStore)
      .order('gross_margin_pct', { ascending: true })
      .limit(1);
    if (error || !data.length) return `No vendor margin data for ${matchedStore}.`;
    return `Vendor with lowest margin at ${matchedStore} is ${data[0].vendor} (${data[0].gross_margin_pct}% margin).`;
  }

  if (name === 'query_vendor_percent_revenue') {
    const { store, vendor } = parsedArgs;
    const matchedStore = capitalizeWords(await matchStore(store));
    const matchedVendor = capitalizeWords(await matchVendor(vendor));
    const { data, error } = await supabase.from('vendor_rank')
      .select('percent_revenue')
      .eq('store', matchedStore)
      .eq('vendor', matchedVendor)
      .single();
    if (error || !data) return `No percent revenue data found for ${matchedVendor} at ${matchedStore}.`;
    return `${matchedVendor} generates ${data.percent_revenue}% of ${matchedStore}'s revenue.`;
  }

  return 'Tool call not recognized.';
}

module.exports = { handleToolCall };
