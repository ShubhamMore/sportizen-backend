const BillingDetails = require('../../models/shopping-model/billing-details.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const deleteBillingDetails = async (req, res) => {
  try {
    const billingDetails = await BillingDetails.findByIdAndDelete(req.body.id);

    if (!billingDetails) {
      throw new Error('Billing Details Not Found');
    }

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = deleteBillingDetails;
