// const express = require('express');
// const cors = require('cors');
// const stripe = require('stripe')('sk_test_51QOg4EDhFaA8J4k38Ni1UUnxzagSjRGrZZQcagm7CTQW7ERiWmc3AYuFDsJ6tPY5ywBv2mwgNmmSQ1ovtlsf84UO00WyOXvE8T');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Define a route to create a Stripe Checkout session
// app.post('/create-checkout-session', async (req, res) => {
//   const { slot } = req.body;

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: `Tarot Reading Appointment (${slot})`,
//             },
//             unit_amount: 2000, // Amount in cents (e.g., $20.00)
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: 'https://your-success-url.com',
//       cancel_url: 'https://your-cancel-url.com',
//     });

//     res.json({ url: session.url });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// const PORT = 4242;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require('dotenv').config();

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const app = express();

app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const { slot } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: `Tarot Reading Appointment (${slot})` },
            unit_amount: 2000, // $20.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/canceled`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe Checkout session:', error.message);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

app.listen(4242, () => console.log('Server running on http://localhost:4242'));

