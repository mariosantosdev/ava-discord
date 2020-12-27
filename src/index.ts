import 'dotenv/config'
import { Client, Collection } from 'discord.js'
const bot = new Client()

// Emit a message in console when bot is ready
bot.on('ready', () => console.log('[core] => bot start done'))
bot.login(process.env.TOKEN)
    .catch(console.error)