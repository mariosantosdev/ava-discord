import { RunEvent, RemoveChannelProps } from '../type/interface'
import GuildController from '../controllers/Guild.controller'

// Insert channel on DATABASE
async function removeChannel({ guildID: id, type, channels, removeChannel }: RemoveChannelProps) {

    // Get position of channel in list
    const channelPositionInList = channels.indexOf(removeChannel)

    // Remove channel of list
    channels.splice(channelPositionInList, 1)


    // Check type of channel
    if (type === 'chat') {
        // Remove channel on database
        return await GuildController().updateGuild({ id, channels_chat: channels })

            // If success
            .then(() => 'Canal de chat removido')

            // If Error
            .catch(() => 'Desculpe, não consegui remover este canal')
    } else {
        // Remove channel on database
        return await GuildController().updateGuild({ id, channels_command: channels })

            // If success
            .then(() => 'Canal de comando removido')

            // If Error
            .catch(() => 'Desculpe, não consegui remover este canal')
    }

}

// Run command
export async function run(event: RunEvent) {
    // If not exists new prefix
    if (!event.args[0]) return event.message.reply('Especifiue o tipo de canal você quer remover')
    if (!event.args[1]) return event.message.reply('Especifique o id do canal para ser removido')

    // Get UNIQUE guild ID
    const guildID = Number(event.message.guild?.id) || 0
    // Get Channel ID to be insert
    const channelID = event.args[1]


    // If type channel is a chat
    if (event.args[0] === 'chat') {
        // Get current channels of guild
        const { channels_chat } = await GuildController().selectField(guildID, ["channels_chat"])
        // If not get channels chat
        if (!channels_chat) return event.message.reply('Desculpe, não consegui analisar seus canais atual')

        // Check if the channel is already insert on database
        if (!channels_chat.includes(channelID)) return event.message.reply('Este canal ainda não foi adicionado')

        // Create channel on database and get status of inserted
        const statusRemove = await removeChannel({
            guildID,
            removeChannel: channelID,
            channels: channels_chat,
            type: 'chat'
        })

        // Send message
        return event.message.reply(statusRemove)

    } else if (event.args[0] === 'command') {
        // Get current channels of guild
        const { channels_command } = await GuildController().selectField(guildID, ["channels_command"])
        // If not get channels chat
        if (!channels_command) return event.message.reply('Desculpe, não consegui analisar seus canais atual')

        // Check if the channel is already insert on database
        if (!channels_command.includes(channelID)) return event.message.reply('Este canal ainda não foi adicionado')

        // Create channel on database and get status of inserted
        const statusRemove = await removeChannel({
            guildID,
            removeChannel: channelID,
            channels: channels_command,
            type: 'command'
        })

        // Send message
        return event.message.reply(statusRemove)

    } else {
        // If the type channel not matching with availables
        return event.message.reply('Este tipo de canal é inválido')
    }
}

export const names = ["removeChannel"]