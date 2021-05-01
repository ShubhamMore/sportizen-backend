// https://razorpay.com/docs/api/refunds/
const request = require('request');

request(
  {
    method: 'POST',
    url:
      'https://<YOUR_KEY_ID>:<YOUR_KEY_SECRET>@api.razorpay.com/v1/payments/pay_DgExayLn3RBbZX/refund',
  },
  function (error, response, body) {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', body);
  }
);
