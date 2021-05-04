const PaymentReceipt = require('../models/payment-model/payment-receipt.model');
const Event = require('../models/event-model/event.model');

const errorHandler = require('../handlers/error.handler');

const verifyEventPayment = async (req, res, next) => {
  try {
    const event = await Event.findById(req.body.event, { fees: 1 });

    if (event.fees === 0) {
      next();
    } else {
      const paymentReceipt = await PaymentReceipt.findById(req.body.receiptId, { status: 1 });

      if (!paymentReceipt && !paymentReceipt.status) {
        throw new Error('Payment not Done');
      }

      next();
    }
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = verifyEventPayment;
