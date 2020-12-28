import { Message, Client } from 'discord.js'

export interface RunEvent {
    message: Message,
    bot: Client,
    args: string[]
}
