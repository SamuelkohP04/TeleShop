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
  ctx.reply('Welcome to AwarenessAI Scheduler! Introducing a Tarot card/Numerology reading service, a session to consult about your life. This aims to guide you to chart out your life.');
  ctx.reply(
    `Need guidance in decision making for business, career, studies, relationships, etc.? Tarot Card Reading guides you to find direction, clarity, love, truth & insights to face your difficulties. 

  Do you know what is your personal strength, weaknesses, opportunities & threats (SWOT)? numerology helps you decode your hidden powers, personality traits and life challenges through a series of numbers derived from your date of birth. 

  The telegram bot, AwarenessAI, helps to automate booking your next consulting session. What is your name?`,
  )
});

// Handle user reply with name (after /start)
bot.on(message('text'), async (ctx) => {
  const name = ctx.message.text;

  await ctx.reply(`Nice to meet you, ${name}! Would you like to book a session now?`, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Yes, take me there!',
            web_app: {
              url: 'https://your-mini-app-url.com/' // Replace with your actual web app URL
            }
          },
          {
            text: 'Nope, not for now!',
            callback_data: 'no',
          },
  
        ],
      ],
    },
  });
});

bot.action('no', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('No worries! You can book a session anytime by sending /start.');
});

// Help command
bot.help((ctx) => {
  ctx.reply(`
    Available commands:
    /start - Start the bot
    /help - Show this help message
    `);
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