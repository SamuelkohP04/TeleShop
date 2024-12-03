import dotenv from "dotenv";
dotenv.config();

const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf(TOKEN);
const web_link = 'https://dancing-fox-b4fa82.netlify.app/';

const availableSlots = [
  '10:00 AM - 10:30 AM',
  '11:00 AM - 11:30 AM',
  '2:00 PM - 2:30 PM',
  '4:00 PM - 4:30 PM',
];

bot.start((ctx) => {
    ctx.reply('Click to browse the menu or place your order or book a tarot reading appointment', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Crystal Shop Menu',
            web_app: { url: web_link }
          }
        ],
        [
          {
            text: 'Book Tarot Reading Appointment',
            callback_data: 'book_tarot'
          }
        ]
      ]
    }
  });
});


// Handle "Book Tarot Reading Appointment"
bot.action('book_tarot', (ctx) => {
  ctx.reply('Please select a slot for your tarot reading:', {
    reply_markup: {
      inline_keyboard: availableSlots.map((slot) => [
        { text: slot, callback_data: `slot_${slot}` },
      ]),
    },
  });
});

// Handle slot selection and redirect to payment
availableSlots.forEach((slot) => {
  bot.action(`slot_${slot}`, async (ctx) => {
    ctx.reply(`You selected: ${slot}. Generating your payment link...`);

    try {
      // Send a request to the Stripe server to create a Checkout session
      const response = await axios.post('http://localhost:4242/create-checkout-session', { slot });
      const paymentLink = response.data.url;

      // Provide the payment link to the user
      ctx.reply(`Please complete your payment here: ${paymentLink}`);
    } catch (error) {
      ctx.reply('Failed to generate payment link. Please try again later.');
    }
  });
});

bot.launch();
