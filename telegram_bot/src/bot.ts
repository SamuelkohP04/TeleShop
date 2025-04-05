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
  ctx.reply('Welcome! I am your new Telegram bot. Use /help to see available commands.');
});

// Help command
bot.help((ctx) => {
  ctx.reply(`
    Available commands:
    /start - Start the bot
    /help - Show this help message
    /echo - Echo your message
    `);
});

// Echo command
bot.command('echo', (ctx) => {
  const input = ctx.message.text.split(' ').slice(1).join(' ');
  if (input) {
    ctx.reply(input);
  } else {
    ctx.reply('Please provide a message to echo.');
  }
});

bot.command('quit', async (ctx) => {
  // Explicit usage
  await ctx.telegram.leaveChat(ctx.message.chat.id)

  // Using context shortcut
  await ctx.leaveChat()
})

// bot.on(message('text'), async (ctx) => {
//   // Explicit usage
//   await ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`)

//   // Using context shortcut
//   await ctx.reply(`Hello ${ctx.state.role}`)
// })

// bot.on('callback_query', async (ctx) => {
//   // Explicit usage
//   await ctx.telegram.answerCbQuery(ctx.callbackQuery.id)

//   // Using context shortcut
//   await ctx.answerCbQuery()
// })

// bot.on('inline_query', async (ctx) => {
//   const result = []
//   // Explicit usage
//   await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)

//   // Using context shortcut
//   await ctx.answerInlineQuery(result)
// })

// bot.launch()

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