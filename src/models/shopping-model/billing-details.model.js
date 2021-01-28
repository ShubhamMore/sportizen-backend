const mongoose = require('mongoose');
const validator = require('validator');

const billingDetailsSchema = new mongoose.Schema({
  sportizenId: {
    type: String,
    required: true,
  },
  billingName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  gstNo: {
    type: String,
    // required: true,
  },
  billingAddress: {
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
  },
});

billingDetailsSchema.methods.toJSON = function () {
  const billingDetails = this;
  const billingDetailsObject = billingDetails.toObject();

  delete billingDetailsObject.__v;

  return billingDetailsObject;
};

const BillingDetails = mongoose.model('BillingDetails', billingDetailsSchema);

module.exports = BillingDetails;
