import { RunEvent, AddChannelProps } from '../type/interface'
import GuildController from '../controllers/Guild.controller'
import { MANAGE_CHANNELS } from '../utils/Permitions'

// Insert channel on DATABASE
async function addChannel({ guildID: id, type, channels, newChannel }: AddChannelProps) {
    // Check type of channel
    if (type === 'chat') {
        // Check if exist channels in parameters
        if(!channels) return 'Desculpe, não encontrei os seus canais atuais de chat'

        // Add channel on database with current channels and newCannel
        return await GuildController().updateGuild({ id, channels_chat: [...channels, newChannel] })

            // If success
            .then(() => 'Canal de chat adicionado')

            // If Error
            .catch(() => 'Desculpe, não consegui adicionar este canal')
    } else if(type === 'command') {
        // Check if exist channels in parameters
        if(!channels) return 'Desculpe, não encontrei os seus canais atuais de comando'

        // Add channel on database with current channels and newCannel
        return await GuildController().updateGuild({ id, channels_command: [...channels, newChannel] })

            // If success
            .then(() => 'Canal de comando adicionado')

            // If Error
            .catch(() => 'Desculpe, não consegui adicionar este canal')
    } else {
        // Add welcome channel on database
        return await GuildController().updateGuild({ id, channel_welcome: newChannel })

            // If success
            .then(() => 'Canal de bem vindo adicionado')

            // If Error
            .catch(() => 'Desculpe, não consegui adicionar o canal de boas vindas')
    }

}

// Run command
export async function run(event: RunEvent) {
    // If not exists new prefix
    if (!event.args[0]) return event.message.reply('Adicione um tipo de canal')
    if (!event.args[1]) return event.message.reply('Adicione o id do canal')

    // Get UNIQUE guild ID
    const guildID = Number(event.message.guild?.id) || 0
    // Get Channel ID to be insert
    const channelID = event.args[1]
    // Get Channel from id
    const toChannel = event.message.guild?.channels.resolve(channelID)

    // Check if channel is a text channel
    if (toChannel?.type !== 'text') return event.message.reply('Este canal não me parece um canal de texto')

    // If type channel is a chat
    if (event.args[0] === 'chat') {
        // Get current channels of guild
        const { channels_chat } = await GuildController().selectField(guildID, ["channels_chat"])
        // If not get channels chat
        if (!channels_chat) return event.message.reply('Desculpe, não consegui analisar seus canais atual')

        // Check if the channel is already insert on database
        if (channels_chat.includes(channelID)) return event.message.reply('Este canal já está adicionado')

        // Create channel on database and get status of inserted
        const statusInsert = await addChannel({
            guildID,
            newChannel: channelID,
            channels: channels_chat,
            type: 'chat'
        })

        // Send message
        return event.message.reply(statusInsert)

    } else if (event.args[0] === 'command') {
        // Get current channels of guild
        const { channels_command } = await GuildController().selectField(guildID, ["channels_command"])
        // If not get channels chat
        if (!channels_command) return event.message.reply('Desculpe, não consegui analisar seus canais atual')

        // Check if the channel is already insert on database
        if (channels_command.includes(channelID)) return event.message.reply('Este canal já está adicionado')

        // Create channel on database and get status of inserted
        const statusInsert = await addChannel({
            guildID,
            newChannel: channelID,
            channels: channels_command,
            type: 'command'
        })

        // Send Message
        return event.message.reply(statusInsert)

    // If typing welcome channel
    } else if(event.args[0] === 'welcome'){
        // Create welcome channel on database and get status of inserted
        const statusInsert = await addChannel({
            guildID,
            newChannel: channelID,
            type: 'welcome'
        })

        // Send message with status
        return event.message.reply(statusInsert)
    } else {
        // If the type channel not matching with availables
        return event.message.reply('Este tipo de canal é inválido')
    }
}

export const names = ["addChannel"]