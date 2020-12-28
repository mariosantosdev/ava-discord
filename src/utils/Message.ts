import { RunEvent } from '@type/interface'
import { MessageEmbed, TextChannel } from 'discord.js'
import channels from './Channel'

import GuildController from '@controllers/Guild.controller'

export default async function CheckMessage(event: RunEvent) {
    const message = event.message
    const bot = event.bot
    const args = event.args
    const prefix = event.prefix

    // Check message is a command
    function isCommand() {
        return message.content.split('')[0] === prefix ? true : false
    }

    // Check what's the channel of message
    function channelOfMessage(): 'command' | 'chat' | undefined {
        const channel = message.channel.id
        if (!channel) return

        return channels.commads.includes(channel) ? 'command' : 'chat'
    }

    // Check message was sent by Ava
    function sentByAva() {
        if (!message.author.bot) return false

        return message.author === bot.user ? true : false
    }

    // Check if message has embeds
    function messageHasEmbeds() {
        return message.embeds.length >= 1
    }

    // Process Message to get embeds
    function getEmbeds(): MessageEmbed[] {
        return message.embeds.map(embed => {
            embed.setDescription(`${embed.description} \n\n\n Enviado por ${message.author} no canal ${message.channel.toString()}`)

            return embed
        })
    }

    // Redirect message to another channel
    async function redirectMessage(toId: string) {
        // If message send by Ava return function
        if (sentByAva()) return
        let messageToSend

        try {
            // Get channel to send message
            const toChannel = bot.channels.cache.get(toId) as TextChannel
            if (!toChannel) throw new Error('Channel to send message be not find')

            // Create message with or without embeds
            if (messageHasEmbeds()) {
                messageToSend = getEmbeds()
            } else {
                messageToSend = `${message}\n\n\nEnviado por ${message.author} no canal ${message.channel.toString()}`
            }

            // Send message to specific channel
            await toChannel.send(messageToSend)

            // Delete old message
            message.delete()
        } catch (error) {
            message.reply('Desta vez não consegui redirecionar sua mensagem...\nMas na próxima nn passa!')
        }
    }

    // If not a command and the message was sent on the command channel
    if (!isCommand() && channelOfMessage() === 'command') {
        if (message.author.bot) return

        redirectMessage(channels.chat[0])
    }

    // If a command and the message was sent on the chat channel
    if (isCommand() && channelOfMessage() === 'chat') {
        if (message.author.bot) return

        redirectMessage(channels.commads[0])
    }

    // If a author of message is a bot and message sent on the chat channel
    if (message.author.bot && channelOfMessage() === 'chat') redirectMessage(channels.commads[0])
}