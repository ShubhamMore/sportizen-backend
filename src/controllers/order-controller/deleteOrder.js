const Order = require('../../models/payment-model/order.model');
const PaymentReceipt = require('../../models/payment-model/payment-receipt.model');

const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const deleteOrder = async (req, res) => {
  try {
    const paymentReceipt = await PaymentReceipt.findByIdAndDelete(req.body.id);

    if (!paymentReceipt) {
      throw new Error('Payment Receipt Not Found');
    }

    await Order.findByIdAndDelete(paymentReceipt.orderId);

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = deleteOrder;
