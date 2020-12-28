import '@database/connection'
import 'dotenv/config'
import { Client, Collection } from 'discord.js'
import { readdirSync } from 'fs'
import path from 'path'

import { RunEvent } from '@type/interface'

import CheckWhereMessageWasSent from '@utils/Message'

const bot = new Client()
const commands: Collection<string[], (event: RunEvent) => any> = new Collection()

// Emit a message in console when bot is ready
bot.on('ready', () => console.log('[core] => bot start done'))

// Handle commands file
try {
    // Read all files in path './commands'
    const commandsFiles = readdirSync(path.resolve(__dirname, 'commands'))

    // If not find any file command throw Error
    if (commandsFiles.length <= 0) throw new Error('File not find in path commands')

    commandsFiles.forEach(file => {
        // Import espefic command file
        const command: { names: string[], run: (event: RunEvent) => any } = require(`./commands/${file}`)

        // Set a command in Collection
        commands.set(command.names, command.run)
    })
} catch (error) {
    console.log(error);
}

// Event message discord.js
bot.on('message', async message => {
    // Get all args of message
    const args = message.content.split(' ')
    if (args.length < 1) return

    // Check if message is a command
    const isCommand = args[0].split('')[0] === process.env.PREFIX ? true : false

    // Check the channel of message
    CheckWhereMessageWasSent({ message, bot, args })

    if (isCommand) {
        if (message.author.bot) return

        // Get name command
        const command = args.shift()!.slice(process.env.PREFIX?.length);
        
        // Find in commands a command with key of above 
        const commandFile = commands.find((value, key) => key.includes(command));
        if (!commandFile) return

        // If found a command execute it
        commandFile && commandFile({ message, bot, args })
    }
})

bot.login(process.env.TOKEN)
    .catch(console.error)