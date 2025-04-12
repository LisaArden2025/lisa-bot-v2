const inventoryFunctions = [
    {
      name: "query_inventory_value",
      description: "Get the total inventory value at a store.",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" }
        },
        required: ["store"]
      }
    },
    {
      name: "query_clearance_candidates",
      description: "Find products that should be considered for clearance based on slow sales.",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" }
        },
        required: ["store"]
      }
    },
    {
      name: "query_dead_inventory_products",
      description: "List products at a store with no sales in the last 90+ days.",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" }
        },
        required: ["store"]
      }
    },
    {
      name: "query_clearance_inventory_value",
      description: "Get the total dollar value of clearance inventory at a store.",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" }
        },
        required: ["store"]
      }
    },
    {
      name: "query_store_inventory_health",
      description: "Analyze overall inventory health (fast movers vs slow movers).",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" }
        },
        required: ["store"]
      }
    },
    {
      name: "query_store_clearance_units_on_hand",
      description: "Get the total number of clearance units currently in stock at a store.",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" }
        },
        required: ["store"]
      }
    },
    {
      name: "compare_store_inventory_values",
      description: "Compare inventory values between two stores.",
      parameters: {
        type: "object",
        properties: {
          store1: { type: "string", description: "First store name" },
          store2: { type: "string", description: "Second store name" }
        },
        required: ["store1", "store2"]
      }
    },
    {
      name: "compare_store_clearance_inventory",
      description: "Compare clearance inventory between two stores.",
      parameters: {
        type: "object",
        properties: {
          store1: { type: "string", description: "First store name" },
          store2: { type: "string", description: "Second store name" }
        },
        required: ["store1", "store2"]
      }
    },
    {
      name: "find_store_with_most_clearance",
      description: "Find the store with the highest amount of clearance inventory.",
      parameters: {
        type: "object",
        properties: {}
      }
    },
    {
      name: "find_store_with_highest_inventory_value",
      description: "Find the store with the highest total inventory value.",
      parameters: {
        type: "object",
        properties: {}
      }
    }
  ];
  