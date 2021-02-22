const DeliveryAddress = require('../../models/shopping-model/delivery-address.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const deleteDeliveryAddress = async (req, res) => {
  try {
    const deliveryAddress = await DeliveryAddress.findByIdAndDelete(req.body.id);

    if (!deliveryAddress) {
      throw new Error('Billing Details Not Found');
    }

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = deleteDeliveryAddress;
