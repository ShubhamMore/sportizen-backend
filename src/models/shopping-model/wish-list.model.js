const mongoose = require('mongoose');
const validator = require('validator');

const wishListSchema = new mongoose.Schema({
  sportizenUser: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
});

wishListSchema.methods.toJSON = function () {
  const wishList = this;
  const wishListObject = wishList.toObject();

  delete wishListObject.__v;

  return wishListObject;
};

const WishList = mongoose.model('WishList', wishListSchema);

module.exports = WishList;
