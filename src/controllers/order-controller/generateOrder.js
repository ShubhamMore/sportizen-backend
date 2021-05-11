const Razorpay = require('razorpay');
const Order = require('../../models/payment-model/order.model');
const PaymentReceipt = require('../../models/payment-model/payment-receipt.model');
const Event = require('../../models/event-model/event.model');

const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const generateOrder = async (req, res) => {
  try {
    const event = await Event.findById(req.body.event, { fees: 1 });

    if (!event) {
      throw new Error('Event Not Found');
    }

    const receiptData = { ...req.body };

    receiptData.amount = event.fees;

    const paymentReceipt = new PaymentReceipt(receiptData);

    const options = {
      amount: Math.round(+paymentReceipt.amount * 100), // amount in the smallest currency unit
      currency: 'INR',
      receipt: `order_rcptid_${paymentReceipt._id}`,
      payment_capture: '0',
    };

    instance.orders.create(options, async (err, order) => {
      try {
        if (err) {
          throw new Error(err.error.description);
        }

        const orderDetails = {
          order_id: order.id,
          entity: order.entity,
          amount: order.amount.toString(),
          amount_paid: order.amount_paid.toString(),
          amount_due: order.amount_due.toString(),
          currency: order.currency,
          receipt: order.receipt,
          offer_id: order.offer_id,
          status: order.status,
          attempts: order.attempts.toString(),
          notes: order.notes,
          created_at: order.created_at,
        };

        const generatedOrder = new Order(orderDetails);

        paymentReceipt.orderId = generatedOrder._id;

        await generatedOrder.save();
        await paymentReceipt.save();

        responseHandler({ paymentReceipt, order }, 200, req, res);
      } catch (e) {
        errorHandler(e, 400, req, res);
      }
    });
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = generateOrder;
