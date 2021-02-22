const BillingDetails = require('../../models/shopping-model/billing-details.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const addBillingDetails = async (req, res) => {
  try {
    req.body.sportizenUser = req.user.sportizenId;

    const billingDetails = new BillingDetails(req.body);

    await billingDetails.save();

    responseHandler(billingDetails, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = addBillingDetails;
