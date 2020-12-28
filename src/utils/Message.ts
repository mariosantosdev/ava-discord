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
        return message.content.split('')[0] === prefix ? true : false
    async function isCommand() {
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
    if (!await isCommand() && channelOfMessage() === 'command') {
        if (message.author.bot) return
        const guildId = Number(message.guild?.id) || 0

        GuildController().selectField(guildId, ['channels_chat'])
            .then(({ channels_chat }) => {
                // If not get channels_chat or there's no channel call redirectMessage with null string to return a error
                if (!channels_chat || channels_chat?.length <= 0) return redirectMessage('')

                // Redirection of message to first channel chat on database
                redirectMessage(channels_chat[0])
            })

            // If returned error when get channels on database
            .catch(() => redirectMessage(''))
    }

    // If a command and the message was sent on the chat channel
    if (await isCommand() && channelOfMessage() === 'chat') {
        if (message.author.bot) return
        const guildId = Number(message.guild?.id) || 0

        GuildController().selectField(guildId, ['channels_command'])
            .then(({ channels_command }) => {
                //If not get channels_command or there's no channel call redirectMessage with null string to return a error
                if (!channels_command || channels_command?.length <= 0) return redirectMessage('')

                // Redirection of message to first channel command on database
                redirectMessage(channels_command[0])
            })

            // If returned error when get channels on database
            .catch(() => redirectMessage(''))
    }

    // If a author of message is a bot and message sent on the chat channel
    if (message.author.bot && channelOfMessage() === 'chat') {
        const guildId = Number(message.guild?.id) || 0

        GuildController().selectField(guildId, ['channels_command'])
            .then(({ channels_command }) => {
                //If not get channels_command or there's no channel call redirectMessage with null string to return a error
                if (!channels_command || channels_command?.length <= 0) return redirectMessage('')

                // Redirection of message to first channel command on database
                redirectMessage(channels_command[0])
            })

            // If returned error when get channels on database
            .catch(() => redirectMessage(''))
    }
}