import 'dotenv/config'
import { Client, Collection } from 'discord.js'
import { readdirSync } from 'fs'
import path from 'path'

import { RunEvent } from '@type/interface'

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
bot.login(process.env.TOKEN)
    .catch(console.error)