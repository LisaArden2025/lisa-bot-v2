const { createClient } = require('@supabase/supabase-js');
const Fuse = require('fuse.js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Capitalize each word helper
function capitalizeWords(str) {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

// Fuzzy match store names
async function matchStore(storeName) {
  const { data, error } = await supabase.from('Stores').select('Store');
  if (error || !data) return storeName;

  const stores = data.map(s => s.Store);
  const fuse = new Fuse(stores, {
    includeScore: true,
    threshold: 0.4, // Sensitive but flexible
  });

  const result = fuse.search(storeName);
  return result.length ? result[0].item : storeName;
}

// Fuzzy match vendor names
async function matchVendor(vendorName) {
  const { data, error } = await supabase.from('Vendors').select('Vendor');
  if (error || !data) return vendorName;

  const vendors = data.map(v => v.Vendor);
  const fuse = new Fuse(vendors, {
    includeScore: true,
    threshold: 0.4,
  });

  const result = fuse.search(vendorName);
  return result.length ? result[0].item : vendorName;
}

// Handle incoming tool calls
async function handleToolCall(toolCall) {
  const { name, arguments: args } = toolCall.function;
  const parsedArgs = JSON.parse(args);

  // --- Order Logging ---
  if (name === 'log_order_smart') {
    const { store, vendor, order_date, total, raw_notes } = parsedArgs;
    const matchedStore = capitalizeWords(await matchStore(store));
    const matchedVendor = capitalizeWords(await matchVendor(vendor));

    const { error } = await supabase.from('Orders').insert([
      {
        Store: matchedStore,
        Vendor: matchedVendor,
        "Order Date": order_date,
        Total: total,
        Notes: raw_notes
      }
    ]);
    if (error) throw error;
    return `✅ Order logged for ${matchedVendor} at ${matchedStore}.`;
  }

  // --- Vendor Rank ---
  if (name === 'query_vendor_rank') {
    const { store } = parsedArgs;
    const matchedStore = capitalizeWords(await matchStore(store));

    const { data, error } = await supabase
      .from('vendor_rank')
      .select('*')
      .eq('Store', matchedStore)
      .order('Rank', { ascending: true })
      .limit(1);

    if (error) throw error;
    if (!data.length) return `⚠️ No vendor ranking found for ${matchedStore}.`;

    const topVendor = data[0];
    return `🏆 Top vendor at ${topVendor.Store}: ${topVendor.Vendor} (#${topVendor.Rank}) with $${topVendor["Total Revenue"]} revenue and $${topVendor["Total Profit"]} profit.`;
  }

  // --- List Stores ---
  if (name === 'list_stores') {
    const { data, error } = await supabase.from('Stores').select('Store');
    if (error) throw error;
    return `🏪 Stores you buy for: ${data.map(s => s.Store).join(', ')}.`;
  }

  // --- List Vendors ---
  if (name === 'list_vendors') {
    const { data, error } = await supabase.from('Vendors').select('Vendor');
    if (error) throw error;
    return `🏷️ Vendors you work with: ${data.map(v => v.Vendor).join(', ')}.`;
  }

  // --- Log Inventory Check ---
  if (name === 'log_inventory_check') {
    const { store, vendor, notes } = parsedArgs;
    const matchedStore = capitalizeWords(await matchStore(store));
    const matchedVendor = capitalizeWords(await matchVendor(vendor));

    const { error } = await supabase.from('checked_not_ready').insert([
      {
        Store: matchedStore,
        Vendor: matchedVendor,
        Notes: notes,
        "Date Checked": new Date().toISOString()
      }
    ]);
    if (error) throw error;
    return `✅ Inventory check logged for ${matchedVendor} at ${matchedStore}.`;
  }

  // --- List Reminders Due ---
  if (name === 'list_reminders_due') {
    const { data, error } = await supabase.from('Reminders').select('*');
    if (error) throw error;
    const upcoming = data.filter(r => new Date(r["Reminder Date"]) > new Date());
    if (!upcoming.length) return `📭 No upcoming reminders.`;

    return `⏰ Upcoming reminders: ${upcoming.map(r => `${r.Store} - ${r.Vendor} on ${r["Reminder Date"]}`).join('; ')}`;
  }

  // --- Vendor Sales ---
  if (name === 'query_vendor_sales') {
    const { store, vendor } = parsedArgs;
    const matchedStore = capitalizeWords(await matchStore(store));
    const matchedVendor = capitalizeWords(await matchVendor(vendor));

    const { data, error } = await supabase
      .from(`${matchedStore} Sales & Inventory by Day`)
      .select('Vendor, Units Sold, Revenue')
      .eq('Vendor', matchedVendor)
      .limit(1);

    if (error) throw error;
    if (!data.length) return `⚠️ No sales found for ${matchedVendor} at ${matchedStore}.`;

    return `📈 ${matchedVendor} sold ${data[0]["Units Sold"]} units for $${data[0].Revenue} at ${matchedStore}.`;
  }

  // --- Top Selling Vendor ---
  if (name === 'query_top_selling_vendor') {
    const { store } = parsedArgs;
    const matchedStore = capitalizeWords(await matchStore(store));

    const { data, error } = await supabase
      .from(`${matchedStore} Sales & Inventory by Day`)
      .select('Vendor, Units Sold')
      .order('Units Sold', { ascending: false })
      .limit(1);

    if (error) throw error;
    if (!data.length) return `⚠️ No top-selling vendor data for ${matchedStore}.`;

    return `🥇 Top selling vendor at ${matchedStore}: ${data[0].Vendor} with ${data[0]["Units Sold"]} units sold.`;
  }

  // --- Lowest Margin Vendor ---
  if (name === 'query_lowest_margin_vendor') {
    const { store } = parsedArgs;
    const matchedStore = capitalizeWords(await matchStore(store));

    const { data, error } = await supabase
      .from('vendor_rank')
      .select('Vendor, Gross Margin %')
      .eq('Store', matchedStore)
      .order('Gross Margin %', { ascending: true })
      .limit(1);

    if (error) throw error;
    if (!data.length) return `⚠️ No margin data found for ${matchedStore}.`;

    return `📉 Vendor with lowest margin at ${matchedStore}: ${data[0].Vendor} (${data[0]["Gross Margin %"]}% margin).`;
  }

  // --- Vendor % of Revenue ---
  if (name === 'query_vendor_percent_revenue') {
    const { store, vendor } = parsedArgs;
    const matchedStore = capitalizeWords(await matchStore(store));
    const matchedVendor = capitalizeWords(await matchVendor(vendor));

    const { data, error } = await supabase
      .from('vendor_rank')
      .select('Percent Revenue')
      .eq('Store', matchedStore)
      .eq('Vendor', matchedVendor)
      .single();

    if (error) throw error;
    if (!data) return `⚠️ No percent revenue data found for ${matchedVendor} at ${matchedStore}.`;

    return `📊 ${matchedVendor} generates ${data["Percent Revenue"]}% of ${matchedStore}'s revenue.`;
  }

  return '❌ Tool call not recognized.';
}

module.exports = { handleToolCall };
