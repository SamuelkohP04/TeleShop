import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import dotenv from "dotenv";

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN as string;
if (!BOT_TOKEN) {
  throw new Error('Bot token is required!');
}
const bot = new Telegraf(BOT_TOKEN)

// Start command
bot.start((ctx) => {
  ctx.reply(
    '*🌟 Welcome to using Awareness Scheduler by Awareness Living\\!*\n\n' +
      'Introducing a Tarot card/Numerology reading service, a session to consult about your life\\. This aims to guide you to chart out your life\\.',
    {
      parse_mode: 'MarkdownV2',
    }
  );
  ctx.reply(
    '*🌟 Need guidance in decision making for business, career, studies, relationships, etc\\.\\?* \n' +
    'Tarot Card Reading guides you to find direction, clarity, love, truth & insights ' +
    'to face your difficulties\\. \n\n' +

  '*💡 Do you know what is your personal strength, weaknesses, opportunities & threats \\(SWOT\\)\\?* \n' +
  'Numerology helps you decode your hidden powers, personality traits and life challenges through a series of numbers derived from your date of birth\\. \n\n' +

  'Meet AwarenessAI, your Telegram bot assistant\\! I help to automate booking your next consulting session with ease\\. \n\n' +
  '📌 What is your name\\?',
  {
    parse_mode: 'MarkdownV2',
  }
  )
});

// Help command
bot.help((ctx) => {
  ctx.reply(
    '🤖 *Awareness scheduler at your service\\!*\n\n' +
    '*🌟 /start* \\- Begin your journey with scheduling a Tarot or Numerology reading session \n' +
    '*💡 /help* \\- Show this help message\n' +
    '*📅 /book* \\- Book a session with AwarenessAI\n' +
    'I am here to guide you with clarity and insights\\! Let us chart your path forward\\.',
  {
    parse_mode: 'MarkdownV2',
  });
});

bot.command('book', (ctx) => {
  ctx.reply('📅 *Ready to book a session?*\n\n', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '✅ Yes, take me there!',
            web_app: {
              url: 'https://p6zlt81q-3000.asse.devtunnels.ms/login'
            }
          },
          {
            text: '❌ Nope, not for now!',
            callback_data: 'no',
          },
        ],
      ],
    },
    parse_mode: 'MarkdownV2',
  });
});

// Handle user reply with name (after /start)
bot.on(message('text'), async (ctx) => {
  const name = ctx.message.text;

  await ctx.reply(`👋 Nice to meet you, ${name}! Would you like to book a session now?`, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '✅ Yes, take me there!',
            web_app: {
              url: 'https://p6zlt81q-3000.asse.devtunnels.ms/login' // Replace with your actual web app URL
            }
          },
          {
            text: '❌ Nope, not for now!',
            callback_data: 'no',
          },
  
        ],
      ],
    },
  });
});

bot.action('no', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('😊 No worries! You can book a session anytime by sending /start.');
});

// Error handling
bot.catch((err) => {
  console.error('Error:', err);
});

// Start polling
bot.launch().then(() => {
  console.log('Bot started successfully!');
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))