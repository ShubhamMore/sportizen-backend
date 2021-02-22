const BillingDetails = require('../../models/shopping-model/billing-details.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getBillingDetails = async (req, res) => {
  try {
    const billingDetails = await BillingDetails.findById(req.body.id);

    if (!billingDetails) {
      throw new Error('Billing Details Not Found');
    }

    responseHandler(billingDetails, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getBillingDetails;
