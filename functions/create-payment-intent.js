require("dotenv").config();
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);
exports.handler = async function (event, context) {
  console.log(event.body);
  if (event.body) {
    const { cart, shippingfee, totalprice } = JSON.parse(event.body);
    const calculateOrderAmount = () => {
      return shippingfee + totalprice;
    };
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        description: "Modern Chairs Payment",
        amount: calculateOrderAmount(),
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ ClientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ msg: error.message }) };
    }
  }
  return {
    statusCode: 200,
    body: "create payment intent",
  };
};
