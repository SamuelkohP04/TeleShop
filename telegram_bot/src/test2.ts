import dotenv from 'dotenv';
dotenv.config();

import { Telegraf, Context, Markup } from 'telegraf';
import axios from 'axios';

const TOKEN = process.env.BOT_TOKEN;

if (!TOKEN) {
  throw new Error('BOT TOKEN is missing in .env');
}

const bot = new Telegraf(TOKEN);
const web_link = 'https://dancing-fox-b4fa82.netlify.app/';

const availableSlots: string[] = [
  '10:00 AM - 10:30 AM',
  '11:00 AM - 11:30 AM',
  '2:00 PM - 2:30 PM',
  '4:00 PM - 4:30 PM',
];

// Handle /start command
bot.start((ctx: Context) => {
  ctx.reply('Click to browse the menu or place your order or book a tarot reading appointment', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Crystal Shop Menu',
            web_app: { url: web_link },
          },
        ],
        [
          {
            text: 'Book Tarot Reading Appointment',
            callback_data: 'book_tarot',
          },
        ],
      ],
    },
  });
});

// Handle tarot booking button
bot.action('book_tarot', (ctx: Context) => {
  ctx.reply('Please select a slot for your tarot reading:', {
    reply_markup: {
      inline_keyboard: availableSlots.map((slot) => [
        { text: slot, callback_data: `slot_${slot}` },
      ]),
    },
  });
});

// Handle slot selection
availableSlots.forEach((slot) => {
  bot.action(`slot_${slot}`, async (ctx: Context) => {
    await ctx.reply(`You selected: ${slot}. Generating your payment link...`);

    try {
      const response = await axios.post('http://localhost:4242/create-checkout-session', {
        slot,
      });
      const paymentLink = response.data.url;

      await ctx.reply(`Please complete your payment here: ${paymentLink}`);
    } catch (error) {
      console.error(error);
      await ctx.reply('Failed to generate payment link. Please try again later.');
    }
  });
});

bot.launch();
