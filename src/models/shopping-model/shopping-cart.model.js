const mongoose = require('mongoose');
const validator = require('validator');

const shoppingCartSchema = new mongoose.Schema({
  sportizenUser: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

shoppingCartSchema.methods.toJSON = function () {
  const shoppingCart = this;
  const shoppingCartObject = shoppingCart.toObject();

  delete shoppingCartObject.__v;

  return shoppingCartObject;
};

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

module.exports = ShoppingCart;
