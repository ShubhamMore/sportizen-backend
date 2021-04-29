const mongoose = require('mongoose');

// order registration schema
const orderSchema = mongoose.Schema({
  order_id: {
    type: String,
    required: true,
  },
  entity: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  amount_paid: {
    type: String,
    required: true,
  },
  amount_due: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  receipt: {
    type: String,
    required: true,
  },
  offer_id: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  attempts: {
    type: String,
    required: true,
  },
  notes: [],
  created_at: {
    type: Date,
    default: new Date().toISOString(),
  },
});

orderSchema.methods.toJSON = function () {
  const order = this;
  const orderObject = order.toObject();

  delete orderObject.__v;

  return orderObject;
};

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
