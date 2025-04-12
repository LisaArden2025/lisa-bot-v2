[
    {
      "name": "query_top_3_vendors",
      "description": "Find the top 3 ranked vendors for a specific store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string", "description": "Store name." }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_vendor_total_units",
      "description": "Find the total units sold for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_total_revenue",
      "description": "Find the total revenue for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_top_selling_product",
      "description": "Find the highest selling product at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_vendor_most_sold_product",
      "description": "Find a vendor's top selling product at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_clearance_candidates",
      "description": "Find products discounted more than 30% at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_low_inventory_products",
      "description": "Find products with less than 10 units in stock at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_vendor_average_price",
      "description": "Find a vendor's average item price at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_inventory_value",
      "description": "Calculate the total inventory value at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_vendor_total_profit",
      "description": "Find the total profit made by a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_highest_profit_product",
      "description": "Find the most profitable product at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_discounted_products",
      "description": "List all products with a discount applied at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_units_sold_last_7_days",
      "description": "Find total units sold at a store in the last 7 days.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_vendor_sales_growth",
      "description": "Compare a vendor's revenue this month vs last month at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_top_categories",
      "description": "Find top 3 product categories by revenue at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_vendor_percent_revenue",
      "description": "Find what percentage of store revenue comes from a vendor.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_unit_share",
      "description": "Find what percentage of units sold comes from a vendor.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_gross_margin",
      "description": "Find the gross margin percentage for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_average_markup",
      "description": "Find the average markup percentage for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_product_count",
      "description": "Find the number of active SKUs for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_total_inventory_value",
      "description": "Find the total inventory value for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_discounted_units",
      "description": "Find the number of discounted units sold for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_discount_rate",
      "description": "Find the average discount rate applied to a vendor's products at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_clearance_items",
      "description": "Find clearance items for a vendor at a store (discount > 30%).",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_active_units",
      "description": "Find the number of active units in inventory for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    }
    ,{
      "name": "query_vendor_stale_products",
      "description": "Find stale products (not selling) for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_inventory_turnover",
      "description": "Calculate inventory turnover rate for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_slow_moving_products",
      "description": "Identify slow-moving products for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_store_total_revenue",
      "description": "Find total revenue for a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_store_total_profit",
      "description": "Find total profit for a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_store_gross_margin",
      "description": "Find gross margin percentage for a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_store_average_markup",
      "description": "Find average markup percentage for a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_store_inventory_value",
      "description": "Find total inventory value for a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_store_discounted_units",
      "description": "Find total discounted units sold at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_store_average_discount",
      "description": "Find average discount percentage for all products at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_store_units_sold_last_7_days",
      "description": "Find total units sold at a store in the last 7 days.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_store_units_sold_last_30_days",
      "description": "Find total units sold at a store in the last 30 days.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_store_sales_growth",
      "description": "Compare store sales this month vs last month.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_store_top_categories",
      "description": "Find top 3 selling categories at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_store_lowest_margin_vendors",
      "description": "Find vendors with the lowest margins at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_store_highest_margin_vendors",
      "description": "Find vendors with the highest margins at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_clearance_inventory_value",
      "description": "Calculate total value of clearance inventory at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_dead_inventory_products",
      "description": "Find products that haven't sold in 30 days at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_total_clearance_units",
      "description": "Find the number of clearance units in stock at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_vendor_percent_units_sold",
      "description": "Find vendor's percentage of total units sold at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_profit_contribution",
      "description": "Find vendor's contribution to total profit at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_overstock_products",
      "description": "Find vendor products overstocked (high inventory) at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_understock_products",
      "description": "Find vendor products understocked (low inventory) at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    }
    ,{
      "name": "query_vendor_weekly_sales",
      "description": "Find vendor's total sales at a store in the last 7 days.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_monthly_sales",
      "description": "Find vendor's total sales at a store in the last 30 days.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_store_total_units",
      "description": "Find total units on hand at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_store_discounted_inventory",
      "description": "Find all discounted inventory items at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_store_inventory_health",
      "description": "Get a summary of inventory health at a store (clearance, deadstock, normal).",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_top_vendors_by_profit",
      "description": "Find top 5 vendors by profit at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_vendor_average_discount",
      "description": "Find average discount percentage for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_top_5_products_by_units",
      "description": "Find the top 5 products sold by units at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_top_5_products_by_revenue",
      "description": "Find the top 5 products sold by revenue at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_category_total_revenue",
      "description": "Find total revenue for a category at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "category": { "type": "string" }
        },
        "required": ["store", "category"]
      }
    },
    {
      "name": "query_category_units_sold",
      "description": "Find total units sold for a category at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "category": { "type": "string" }
        },
        "required": ["store", "category"]
      }
    },
    {
      "name": "query_category_profit",
      "description": "Find total profit for a category at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "category": { "type": "string" }
        },
        "required": ["store", "category"]
      }
    },
    {
      "name": "query_category_gross_margin",
      "description": "Find gross margin percentage for a category at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "category": { "type": "string" }
        },
        "required": ["store", "category"]
      }
    },
    {
      "name": "query_category_average_price",
      "description": "Find average item price in a category at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "category": { "type": "string" }
        },
        "required": ["store", "category"]
      }
    },
    {
      "name": "query_vendor_product_categories",
      "description": "List all product categories for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_total_categories",
      "description": "Find number of unique product categories a vendor is selling at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_most_profitable_category",
      "description": "Find the vendor's most profitable category at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_highest_units_category",
      "description": "Find the vendor category where they sell the most units at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_clearance_units_sold",
      "description": "Find number of clearance units sold at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_clearance_revenue",
      "description": "Find total clearance revenue at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_clearance_profit_loss",
      "description": "Find estimated profit loss due to clearance discounts at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_vendor_clearance_loss",
      "description": "Find estimated profit loss from clearance items for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    }
    ,{
      "name": "query_product_total_units",
      "description": "Find total units in stock for a specific product at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "product": { "type": "string" }
        },
        "required": ["store", "product"]
      }
    },
    {
      "name": "query_product_total_revenue",
      "description": "Find total revenue generated by a product at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "product": { "type": "string" }
        },
        "required": ["store", "product"]
      }
    },
    {
      "name": "query_product_total_profit",
      "description": "Find total profit generated by a product at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "product": { "type": "string" }
        },
        "required": ["store", "product"]
      }
    },
    {
      "name": "query_product_average_price",
      "description": "Find the average sale price of a product at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "product": { "type": "string" }
        },
        "required": ["store", "product"]
      }
    },
    {
      "name": "query_product_gross_margin",
      "description": "Find gross margin percentage of a product at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "product": { "type": "string" }
        },
        "required": ["store", "product"]
      }
    },
    {
      "name": "query_product_discounted_units",
      "description": "Find number of discounted units sold for a product at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "product": { "type": "string" }
        },
        "required": ["store", "product"]
      }
    },
    {
      "name": "query_product_clearance_status",
      "description": "Check if a product is on clearance (discount > 30%) at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "product": { "type": "string" }
        },
        "required": ["store", "product"]
      }
    },
    {
      "name": "query_product_inventory_value",
      "description": "Find the inventory value for a product at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "product": { "type": "string" }
        },
        "required": ["store", "product"]
      }
    },
    {
      "name": "query_product_last_sale_date",
      "description": "Find the last sale date of a product at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "product": { "type": "string" }
        },
        "required": ["store", "product"]
      }
    },
    {
      "name": "query_dead_stock_products",
      "description": "List products that haven't sold in 30+ days at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_high_margin_products",
      "description": "List products with gross margins over 65% at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_low_margin_products",
      "description": "List products with gross margins under 40% at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_fast_selling_products",
      "description": "List products that sold more than 50 units last week at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_slow_selling_products",
      "description": "List products that sold less than 5 units last week at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_vendor_units_in_stock",
      "description": "Find total units in stock for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_inventory_value",
      "description": "Find total inventory value for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_total_discounts",
      "description": "Find total discount dollars given for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_average_units_per_sku",
      "description": "Find average units in stock per SKU for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_total_products",
      "description": "Find total number of unique products from a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_total_categories",
      "description": "Find total number of product categories a vendor sells at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_highest_margin_product",
      "description": "Find the vendor's product with the highest margin at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_lowest_margin_product",
      "description": "Find the vendor's product with the lowest margin at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    }
    ,{
      "name": "query_vendor_clearance_products",
      "description": "List all clearance products for a vendor at a store (discount over 30%).",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_store_total_clearance_value",
      "description": "Find total value of clearance inventory at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_store_total_discount_loss",
      "description": "Estimate profit loss due to all discounts at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_vendor_discount_loss",
      "description": "Estimate profit loss due to discounts for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_last_inventory_check",
      "description": "Find last date vendor's inventory was checked at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_upcoming_reminders",
      "description": "List all upcoming reminders due for inventory checks.",
      "parameters": {
        "type": "object",
        "properties": {}
      }
    },
    {
      "name": "query_pending_inventory_reviews",
      "description": "List all vendors that need a follow-up inventory check soon.",
      "parameters": {
        "type": "object",
        "properties": {}
      }
    },
    {
      "name": "query_vendor_return_products",
      "description": "List products flagged for return to vendor.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_store_lowest_profit_products",
      "description": "Find the bottom 5 products by profit at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_vendor_lowest_profit_products",
      "description": "Find the bottom 5 products by profit for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_store_average_units_per_product",
      "description": "Find the average units in stock per product at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_vendor_fastest_selling_product",
      "description": "Find the vendor's fastest selling product at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_slowest_selling_product",
      "description": "Find the vendor's slowest selling product at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_total_product_count",
      "description": "Find total active SKUs for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_units_sold_last_week",
      "description": "Find total vendor units sold at a store in the last 7 days.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_vendor_revenue_last_week",
      "description": "Find total vendor revenue at a store in the last 7 days.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_store_clearance_units_on_hand",
      "description": "Find total clearance units currently in stock at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_vendor_clearance_units_on_hand",
      "description": "Find clearance units currently in stock for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_clearance_discount_average",
      "description": "Find the average discount percent of all clearance products at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "query_vendor_clearance_discount_average",
      "description": "Find the average discount percent of clearance products for a vendor at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "query_inventory_check_due_today",
      "description": "List all vendors whose inventory check is due today.",
      "parameters": {
        "type": "object",
        "properties": {}
      }
    }
    ,{
      "name": "compare_vendors_between_stores",
      "description": "Compare two stores and list vendors carried at one but not the other.",
      "parameters": {
        "type": "object",
        "properties": {
          "store1": { "type": "string" },
          "store2": { "type": "string" }
        },
        "required": ["store1", "store2"]
      }
    },
    {
      "name": "find_vendors_only_in_store",
      "description": "Find vendors carried only at a specific store (not others).",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "find_common_vendors_across_stores",
      "description": "Find vendors carried across all selected stores.",
      "parameters": {
        "type": "object",
        "properties": {
          "stores": {
            "type": "array",
            "items": { "type": "string" }
          }
        },
        "required": ["stores"]
      }
    },
    {
      "name": "detect_new_delivery_by_inventory_spike",
      "description": "Detect potential vendor deliveries by sudden inventory spikes at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "compare_vendor_product_counts",
      "description": "Compare a vendor's product counts between two stores.",
      "parameters": {
        "type": "object",
        "properties": {
          "store1": { "type": "string" },
          "store2": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store1", "store2", "vendor"]
      }
    },
    {
      "name": "detect_product_count_increase",
      "description": "Detect an increase in a vendor's product count at a store over the last 24 hours.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" },
          "vendor": { "type": "string" }
        },
        "required": ["store", "vendor"]
      }
    },
    {
      "name": "detect_inventory_jump_by_vendor",
      "description": "Detect any vendors that had a large jump in inventory in the past day at a store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "detect_vendor_removed_from_store",
      "description": "Detect vendors that are no longer carried at a store compared to last week.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "compare_store_inventory_values",
      "description": "Compare total inventory values between two stores.",
      "parameters": {
        "type": "object",
        "properties": {
          "store1": { "type": "string" },
          "store2": { "type": "string" }
        },
        "required": ["store1", "store2"]
      }
    },
    {
      "name": "compare_store_clearance_inventory",
      "description": "Compare clearance inventory values between two stores.",
      "parameters": {
        "type": "object",
        "properties": {
          "store1": { "type": "string" },
          "store2": { "type": "string" }
        },
        "required": ["store1", "store2"]
      }
    },
    {
      "name": "find_vendors_missing_in_store",
      "description": "Find vendors carried by other stores but missing from a specific store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "list_all_vendors_in_store",
      "description": "List all vendors active in a specific store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "find_shared_products_across_stores",
      "description": "Find products sold in multiple stores.",
      "parameters": {
        "type": "object",
        "properties": {
          "stores": {
            "type": "array",
            "items": { "type": "string" }
          }
        },
        "required": ["stores"]
      }
    },
    {
      "name": "find_unique_products_in_store",
      "description": "Find products only available at a specific store.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "compare_store_total_units",
      "description": "Compare total units on hand between two stores.",
      "parameters": {
        "type": "object",
        "properties": {
          "store1": { "type": "string" },
          "store2": { "type": "string" }
        },
        "required": ["store1", "store2"]
      }
    },
    {
      "name": "find_store_with_most_clearance",
      "description": "Find the store with the highest amount of clearance inventory.",
      "parameters": {
        "type": "object",
        "properties": {}
      }
    },
    {
      "name": "find_store_with_highest_inventory_value",
      "description": "Find the store with the highest total inventory value.",
      "parameters": {
        "type": "object",
        "properties": {}
      }
    },
    {
      "name": "find_vendor_highest_units_store",
      "description": "Find which store has the most units of a vendor in stock.",
      "parameters": {
        "type": "object",
        "properties": {
          "vendor": { "type": "string" }
        },
        "required": ["vendor"]
      }
    },
    {
      "name": "find_vendor_highest_revenue_store",
      "description": "Find which store generates the most revenue for a vendor.",
      "parameters": {
        "type": "object",
        "properties": {
          "vendor": { "type": "string" }
        },
        "required": ["vendor"]
      }
    },
    {
      "name": "detect_new_vendor_in_store",
      "description": "Detect if a new vendor appears in inventory compared to the last check.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "detect_vendor_removed_across_stores",
      "description": "Detect if a vendor was removed from all stores recently.",
      "parameters": {
        "type": "object",
        "properties": {}
      }
    },
    {
      "name": "query_stores_missing_vendor",
      "description": "List all stores missing a specific vendor.",
      "parameters": {
        "type": "object",
        "properties": {
          "vendor": { "type": "string" }
        },
        "required": ["vendor"]
      }
    },
    {
      "name": "detect_product_added_to_store",
      "description": "Detect if a new product was added to a store today.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    },
    {
      "name": "detect_product_removed_from_store",
      "description": "Detect if a product was removed from a store recently.",
      "parameters": {
        "type": "object",
        "properties": {
          "store": { "type": "string" }
        },
        "required": ["store"]
      }
    }
]
            