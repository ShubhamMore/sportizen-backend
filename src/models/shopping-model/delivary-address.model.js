const mongoose = require('mongoose');
const validator = require('validator');

const deliveryAddressSchema = new mongoose.Schema({
  sportizenId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    // required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
});

deliveryAddressSchema.methods.toJSON = function () {
  const deliveryAddress = this;
  const deliveryAddressObject = deliveryAddress.toObject();

  delete deliveryAddressObject.__v;

  return deliveryAddressObject;
};

const DeliveryAddress = mongoose.model('DeliveryAddress', deliveryAddressSchema);

module.exports = DeliveryAddress;
