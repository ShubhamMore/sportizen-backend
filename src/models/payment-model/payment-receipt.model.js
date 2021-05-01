const mongoose = require('mongoose');

const paymentReceiptSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userPhone: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  sportizenId: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  status: {
    type: Boolean,
    default: false,
  },
  orderId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    default: null,
  },
});

paymentReceiptSchema.methods.toJSON = function () {
  const paymentReceipt = this;
  const paymentReceiptObject = paymentReceipt.toObject();

  delete paymentReceiptObject.__v;

  return paymentReceiptObject;
};

const PaymentReceipt = mongoose.model('PaymentReceipt', paymentReceiptSchema);
module.exports = PaymentReceipt;
