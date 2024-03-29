const BillingDetails = require('../../models/shopping-model/billing-details.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getAllBillingDetails = async (req, res) => {
  try {
    const billingDetails = await BillingDetails.find({ sportizenUser: req.user.sportizenId });

    responseHandler(billingDetails, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = getAllBillingDetails;
