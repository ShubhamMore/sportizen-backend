const mongoose = require('mongoose');
const validator = require('validator');

const shoppingOrderSchema = new mongoose.Schema({
  sportizenUser: {
    type: String,
    required: true,
  },
  products: [
    {
      product: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
    },
  ],
  deliveryAddress: {
    type: String,
    required: true,
  },
  billingDetails: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  modifiedAt: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

shoppingOrderSchema.methods.toJSON = function () {
  const shoppingOrder = this;
  const shoppingOrderObject = shoppingOrder.toObject();

  delete shoppingOrderObject.__v;

  return shoppingOrderObject;
};

const ShoppingOrder = mongoose.model('ShoppingOrder', shoppingOrderSchema);

module.exports = ShoppingOrder;
