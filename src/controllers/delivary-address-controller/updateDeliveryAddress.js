const DeliveryAddress = require('../../models/shopping-model/delivery-address.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const updateDeliveryAddress = async (req, res) => {
  try {
    const deliveryAddress = await DeliveryAddress.findByIdAndUpdate(req.body.id, req.body);

    if (!deliveryAddress) {
      throw new Error('Delivery Address Not Found');
    }

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = updateDeliveryAddress;
