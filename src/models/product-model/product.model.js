const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

productSchema.methods.toJSON = function () {
  const product = this;
  const productObject = product.toObject();

  delete productObject.__v;

  return productObject;
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
