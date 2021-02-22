const BillingDetails = require('../../models/shopping-model/billing-details.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const updateBillingDetails = async (req, res) => {
  try {
    const billingDetails = await BillingDetails.findByIdAndUpdate(req.body.id, req.body);

    if (!billingDetails) {
      throw new Error('Billing Details Not Found');
    }

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = updateBillingDetails;
