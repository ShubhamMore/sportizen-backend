const DeliveryAddress = require('../../models/shopping-model/delivery-address.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getDeliveryAddress = async (req, res) => {
  try {
    const deliveryAddress = await DeliveryAddress.findById(req.body.id);

    if (!deliveryAddress) {
      throw new Error('Delivery Address Not Found');
    }

    responseHandler(deliveryAddress, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = getDeliveryAddress;
