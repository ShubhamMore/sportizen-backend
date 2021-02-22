const DeliveryAddress = require('../../models/shopping-model/delivery-address.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const addDeliveryAddress = async (req, res) => {
  try {
    req.body.sportizenUser = req.user.sportizenId;

    const deliveryAddress = new DeliveryAddress(req.body);

    await deliveryAddress.save();

    responseHandler(deliveryAddress, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = addDeliveryAddress;
