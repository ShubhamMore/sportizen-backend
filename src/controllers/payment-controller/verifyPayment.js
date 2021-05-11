const Order = require('../../models/payment-model/order.model');
const PaymentReceipt = require('../../models/payment-model/payment-receipt.model');

const crypto = require('crypto');

const responseHandler = require('../../handlers/response.handler');
const errorrHandler = require('../../handlers/error.handler');

const verifyPayment = async (req, res) => {
  try {
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);

    const payment = req.body.payment;
    const paymentReceipt = req.body.receipt;

    hmac.update(payment.razorpay_order_id + '|' + payment.razorpay_payment_id);
    let generatedSignature = hmac.digest('hex');

    if (generatedSignature == payment.razorpay_signature) {
      await PaymentReceipt.findByIdAndUpdate(paymentReceipt._id, {
        status: true,
        paymentId: payment.razorpay_payment_id,
      });

      responseHandler(
        { orderId: paymentReceipt.orderId, receiptId: paymentReceipt._id },
        200,
        req,
        res
      );

      const order = await Order.findById(paymentReceipt.orderId);
      order.amount_paid = order.amount;
      order.amount_due = '0';
      await order.save();
    } else {
      throw new Error('Payment Verification Failed');
    }
  } catch (e) {
    errorrHandler(e, 200, req, res);
  }
};

module.exports = verifyPayment;
