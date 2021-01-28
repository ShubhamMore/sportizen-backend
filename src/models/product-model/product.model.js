const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      imageName: {
        type: String,
        required: true,
      },
      secureUrl: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        required: true,
      },
    },
  ],
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
