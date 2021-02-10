import { RunEvent, RemovePrefixProps } from '../type/interface'
import GuildController from '../controllers/Guild.controller'
import { MANAGE_CHANNELS } from '../utils/Permitions'

// Insert channel on DATABASE
async function removePrefix({ guildID: id, prefix, removePrefix }: RemovePrefixProps) {
    // Get position of channel in list
    const prefixPositionInList = prefix.indexOf(removePrefix)

    // Remove channel of list
    prefix.splice(prefixPositionInList, 1)

    // Remove prefix on database with current prefixs and newPrefix
    return await GuildController().updateGuild({ id, prefix_redirect: [...prefix] })

        // If success
        .then(() => 'Prefixo removido')

        // If Error
        .catch(() => 'Desculpe, não consegui remover este prefixo')
}

// Run command
export async function run(event: RunEvent) {
    // If not exists new prefix
    if (!event.args[0]) return event.message.reply('Especifique o prefixo para ser removido')

    // Check if the author of message has permition to execute command
    if (!event.message.member || !MANAGE_CHANNELS(event.message.member)) return event.message.reply('Você não pode utilizar esse comando!')

    // Get prefix to remove
    const prefix = event.args[0]

    // Check if exist comma in command
    if (prefix.includes(',')) return event.message.reply('Prefixo com virgula não são válidos')

    // Get UNIQUE guild ID
    const guildID = Number(event.message.guild?.id) || 0

    // Get current prefix of guild
    const { prefix_redirect } = await GuildController().selectField(guildID, ["prefix_redirect"])

    // If not get prefix chat
    if (!prefix_redirect) return event.message.reply('Desculpe, não consegui analisar seus prefixos atuais')

    // Check if the prefix is already insert on database
    if (!prefix_redirect.includes(prefix)) return event.message.reply('Este prefixo ainda não foi adicionado')

    // Remove prefix on database and get status of removed
    const statusRemove = await removePrefix({
        guildID,
        prefix: prefix_redirect,
        removePrefix: prefix
    })

    // Send message
    return event.message.reply(statusRemove)
}

export const names = ["removePrefix"]