const orderFunctions = [
    {
      name: "log_order_smart",
      description: "Log a new order for a store and vendor",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name (e.g., East, Belltown)" },
          vendor: { type: "string", description: "Vendor name (e.g., Northwest Cannabis Solutions)" },
          order_date: { type: "string", description: "Order date in YYYY-MM-DD format" },
          total: { type: "number", description: "Total dollar amount of the order" },
          raw_notes: { type: "string", description: "Raw notes about the order" }
        },
        required: ["store", "vendor", "order_date", "total"]
      }
    },
    {
      name: "log_inventory_check",
      description: "Log a vendor inventory check without placing an order",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" },
          vendor: { type: "string", description: "Vendor name" },
          notes: { type: "string", description: "Inventory notes (e.g., low stock, overstocked)" }
        },
        required: ["store", "vendor", "notes"]
      }
    },
    {
      name: "log_clearance_return",
      description: "Log when clearance products are returned to vendor",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" },
          vendor: { type: "string", description: "Vendor name" },
          reason: { type: "string", description: "Reason for return (e.g., expired, slow-moving)" }
        },
        required: ["store", "vendor", "reason"]
      }
    },
    {
      name: "log_vendor_flag",
      description: "Log if a vendor is flagged for issues (e.g., late deliveries, bad products)",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" },
          vendor: { type: "string", description: "Vendor name" },
          flag_reason: { type: "string", description: "Reason for flagging the vendor" }
        },
        required: ["store", "vendor", "flag_reason"]
      }
    },
    {
      name: "set_order_reminder",
      description: "Set a reminder to follow up on a vendor or product after an order",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" },
          vendor: { type: "string", description: "Vendor name" },
          reminder_date: { type: "string", description: "Reminder date in YYYY-MM-DD format" },
          notes: { type: "string", description: "Follow-up notes" }
        },
        required: ["store", "vendor", "reminder_date"]
      }
    }
  ];
  
  module.exports = orderFunctions;
  const orderFunctionsBatch2 = [
    {
      name: "log_order_adjustment",
      description: "Log an adjustment to an already placed order (e.g., missing items, wrong total)",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" },
          vendor: { type: "string", description: "Vendor name" },
          adjustment_notes: { type: "string", description: "Details about the adjustment" }
        },
        required: ["store", "vendor", "adjustment_notes"]
      }
    },
    {
      name: "log_vendor_discount",
      description: "Log when a vendor gives a discount after an order issue or as a deal",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" },
          vendor: { type: "string", description: "Vendor name" },
          discount_amount: { type: "number", description: "Dollar amount discounted" },
          reason: { type: "string", description: "Reason for discount" }
        },
        required: ["store", "vendor", "discount_amount", "reason"]
      }
    },
    {
      name: "log_order_issue",
      description: "Log any problems found with a vendor order (e.g., wrong products, missing SKUs)",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" },
          vendor: { type: "string", description: "Vendor name" },
          issue_description: { type: "string", description: "Description of the order issue" }
        },
        required: ["store", "vendor", "issue_description"]
      }
    },
    {
      name: "log_vendor_followup",
      description: "Log a follow-up action needed with a vendor after an order",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" },
          vendor: { type: "string", description: "Vendor name" },
          followup_notes: { type: "string", description: "Details about the follow-up" }
        },
        required: ["store", "vendor", "followup_notes"]
      }
    },
    {
      name: "log_order_cancellation",
      description: "Log a full order cancellation with a vendor",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" },
          vendor: { type: "string", description: "Vendor name" },
          cancellation_reason: { type: "string", description: "Reason for cancelling the order" }
        },
        required: ["store", "vendor", "cancellation_reason"]
      }
    }
  ];
  
  module.exports = orderFunctionsBatch2;
  const orderFunctionsBatch3 = [
    {
      name: "log_product_return",
      description: "Log when a product is returned to a vendor after delivery",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" },
          vendor: { type: "string", description: "Vendor name" },
          product: { type: "string", description: "Product name" },
          quantity: { type: "number", description: "Quantity returned" },
          reason: { type: "string", description: "Reason for return" }
        },
        required: ["store", "vendor", "product", "quantity", "reason"]
      }
    },
    {
      name: "log_partial_order_receipt",
      description: "Log when only part of an order is received from a vendor",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" },
          vendor: { type: "string", description: "Vendor name" },
          missing_items: { type: "string", description: "List of missing items" }
        },
        required: ["store", "vendor", "missing_items"]
      }
    },
    {
      name: "log_order_payment_status",
      description: "Log the payment status of an order (e.g., paid, unpaid, pending)",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" },
          vendor: { type: "string", description: "Vendor name" },
          status: { type: "string", description: "Payment status" }
        },
        required: ["store", "vendor", "status"]
      }
    },
    {
      name: "log_vendor_credit",
      description: "Log when a vendor issues a credit note for an order",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" },
          vendor: { type: "string", description: "Vendor name" },
          credit_amount: { type: "number", description: "Credit amount issued" },
          credit_reason: { type: "string", description: "Reason for issuing credit" }
        },
        required: ["store", "vendor", "credit_amount", "credit_reason"]
      }
    },
    {
      name: "log_order_receipt_confirmation",
      description: "Confirm the receipt of a full order and log it",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" },
          vendor: { type: "string", description: "Vendor name" },
          receipt_date: { type: "string", format: "date-time", description: "Date the order was received" }
        },
        required: ["store", "vendor", "receipt_date"]
      }
    }
  ];
  
  module.exports = orderFunctionsBatch3;
  const orderFunctionsBatch4 = [
    {
      name: "log_vendor_invoice_received",
      description: "Log when a vendor invoice is received for an order",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" },
          vendor: { type: "string", description: "Vendor name" },
          invoice_number: { type: "string", description: "Invoice number" },
          invoice_total: { type: "number", description: "Total amount on the invoice" }
        },
        required: ["store", "vendor", "invoice_number", "invoice_total"]
      }
    },
    {
      name: "log_vendor_invoice_discrepancy",
      description: "Log when there's a discrepancy between order and invoice amounts",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" },
          vendor: { type: "string", description: "Vendor name" },
          discrepancy_details: { type: "string", description: "Details about the discrepancy" }
        },
        required: ["store", "vendor", "discrepancy_details"]
      }
    },
    {
      name: "log_product_pricing_issue",
      description: "Log if a product arrives priced incorrectly compared to the order",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" },
          vendor: { type: "string", description: "Vendor name" },
          product: { type: "string", description: "Product name" },
          expected_price: { type: "number", description: "Expected price" },
          received_price: { type: "number", description: "Received price" }
        },
        required: ["store", "vendor", "product", "expected_price", "received_price"]
      }
    },
    {
      name: "log_order_urgent_followup",
      description: "Log an urgent follow-up needed with a vendor after an order issue",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" },
          vendor: { type: "string", description: "Vendor name" },
          urgency_reason: { type: "string", description: "Reason why the follow-up is urgent" }
        },
        required: ["store", "vendor", "urgency_reason"]
      }
    },
    {
      name: "log_order_notes_update",
      description: "Update or add detailed notes for an existing order after it was placed",
      parameters: {
        type: "object",
        properties: {
          store: { type: "string", description: "Store name" },
          vendor: { type: "string", description: "Vendor name" },
          additional_notes: { type: "string", description: "New notes or updates" }
        },
        required: ["store", "vendor", "additional_notes"]
      }
    }
  ];
  
  module.exports = orderFunctionsBatch4;
        