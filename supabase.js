const { createClient } = require('@supabase/supabase-js');
const Fuse = require('fuse.js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Capitalize helper
function capitalizeWords(str) {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

// Fuzzy Match Store
async function matchStore(storeName) {
  const { data } = await supabase.from('Stores').select('Store');
  if (!data) return storeName;
  const stores = data.map(s => s.Store);

  const fuse = new Fuse(stores, {
    includeScore: true,
    threshold: 0.4,
  });

  const result = fuse.search(storeName);
  return result.length ? result[0].item : storeName;
}

// Fuzzy Match Vendor
async function matchVendor(vendorName) {
  const { data } = await supabase.from('Vendors').select('Vendor');
  if (!data) return vendorName;
  const vendors = data.map(v => v.Vendor);

  const fuse = new Fuse(vendors, {
    includeScore: true,
    threshold: 0.4,
  });

  const result = fuse.search(vendorName);
  return result.length ? result[0].item : vendorName;
}

// Handle Tool Calls
async function handleToolCall(toolCall) {
  const { name, arguments: args } = toolCall.function;
  const parsedArgs = JSON.parse(args);

  // 📈 Dynamic Top Vendors (new!)
  if (name === 'query_top_vendors') {
    const { store, count } = parsedArgs;
    const matchedStore = capitalizeWords(await matchStore(store));
    const limit = count || 3; // default to 3 if not provided

    const { data, error } = await supabase
      .from('vendor_rank')
      .select('Vendor, Rank, Total Revenue, Total Profit')
      .eq('Store', matchedStore)
      .order('Rank', { ascending: true })
      .limit(limit);

    if (error) throw error;
    if (!data || data.length === 0) return `No vendor ranking found for ${matchedStore}.`;

    return data.map((vendor, index) =>
      `${index + 1}. ${vendor.Vendor} - $${vendor["Total Revenue"]} revenue, $${vendor["Total Profit"]} profit`
    ).join('\n');
  }

  if (name === 'log_order_smart') {
    const { store, vendor, order_date, total, raw_notes } = parsedArgs;
    const matchedStore = capitalizeWords(await matchStore(store));
    const matchedVendor = capitalizeWords(await matchVendor(vendor));
    const { error } = await supabase.from('Orders').insert([
      { Store: matchedStore, Vendor: matchedVendor, "Order Date": order_date, Total: total, Notes: raw_notes }
    ]);
    if (error) throw error;
    return `Order logged for ${matchedVendor} at ${matchedStore}.`;
  }

  if (name === 'query_vendor_rank') {
    const { store } = parsedArgs;
    const { data, error } = await supabase
      .from('vendor_rank')
      .select('*')
      .eq('Store', capitalizeWords(store))
      .order('Rank', { ascending: true })
      .limit(1);

    if (error) throw error;
    if (!data || data.length === 0) return `No vendor ranking found for ${store}.`;

    const topVendor = data[0];
    return `The top vendor at ${topVendor.Store} is ${topVendor.Vendor}, ranked #${topVendor.Rank}, with $${topVendor["Total Revenue"]} revenue and $${topVendor["Total Profit"]} profit.`;
  }

  if (name === 'list_stores') {
    const { data, error } = await supabase.from('Stores').select('Store');
    if (error) throw error;
    return `You buy for these stores: ${data.map(s => s.Store).join(', ')}.`;
  }

  if (name === 'list_vendors') {
    const { data, error } = await supabase.from('Vendors').select('Vendor');
    if (error) throw error;
    return `Your vendors: ${data.map(v => v.Vendor).join(', ')}.`;
  }

  if (name === 'log_inventory_check') {
    const { store, vendor, notes } = parsedArgs;
    const matchedStore = capitalizeWords(await matchStore(store));
    const matchedVendor = capitalizeWords(await matchVendor(vendor));
    const { error } = await supabase.from('checked_not_ready').insert([
      { Store: matchedStore, Vendor: matchedVendor, Notes: notes, "Date Checked": new Date().toISOString() }
    ]);
    if (error) throw error;
    return `Inventory check logged for ${matchedVendor} at ${matchedStore}.`;
  }

  if (name === 'list_reminders_due') {
    const { data, error } = await supabase.from('Reminders').select('*');
    if (error) throw error;
    const upcoming = data.filter(r => new Date(r["Reminder Date"]) > new Date());
    if (!upcoming.length) return `No upcoming reminders.`;
    return `Upcoming reminders: ${upcoming.map(r => `${r.Store} - ${r.Vendor} on ${r["Reminder Date"]}`).join('; ')}.`;
  }

  if (name === 'query_vendor_sales') {
    const { store, vendor } = parsedArgs;
    const matchedStore = capitalizeWords(await matchStore(store));
    const matchedVendor = capitalizeWords(await matchVendor(vendor));
    const { data, error } = await supabase
      .from(`${matchedStore} Sales & Inventory by Day`)
      .select('Vendor, Units Sold, Revenue')
      .eq('Vendor', matchedVendor)
      .limit(1);
    if (error || !data.length) return `No sales found for ${matchedVendor} at ${matchedStore}.`;
    return `${matchedVendor} sold ${data[0]["Units Sold"]} units and made $${data[0].Revenue} at ${matchedStore}.`;
  }

  if (name === 'query_top_selling_vendor') {
    const { store } = parsedArgs;
    const matchedStore = capitalizeWords(await matchStore(store));
    const { data, error } = await supabase
      .from(`${matchedStore} Sales & Inventory by Day`)
      .select('Vendor, Units Sold')
      .order('Units Sold', { ascending: false })
      .limit(1);
    if (error || !data.length) return `No sales found at ${matchedStore}.`;
    return `Top selling vendor at ${matchedStore} is ${data[0].Vendor} with ${data[0]["Units Sold"]} units sold.`;
  }

  if (name === 'query_lowest_margin_vendor') {
    const { store } = parsedArgs;
    const matchedStore = capitalizeWords(await matchStore(store));
    const { data, error } = await supabase
      .from('vendor_rank')
      .select('Vendor, Gross Margin %')
      .eq('Store', matchedStore)
      .order('Gross Margin %', { ascending: true })
      .limit(1);
    if (error || !data.length) return `No vendor margin data for ${matchedStore}.`;
    return `Vendor with lowest margin at ${matchedStore} is ${data[0].Vendor} (${data[0]["Gross Margin %"]}% margin).`;
  }

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
    if (error || !data) return `No percent revenue data found for ${matchedVendor} at ${matchedStore}.`;
    return `${matchedVendor} generates ${data["Percent Revenue"]}% of ${matchedStore}'s revenue.`;
  }

  return 'Tool call not recognized.';
}

module.exports = { handleToolCall };
