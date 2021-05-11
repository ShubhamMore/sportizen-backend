const DeliveryAddress = require('../../models/shopping-model/delivery-address.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getAllDeliveryAddress = async (req, res) => {
  try {
    const deliveryAddresses = await DeliveryAddress.find({ sportizenUser: req.user.sportizenId });

    responseHandler(deliveryAddresses, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = getAllDeliveryAddress;
