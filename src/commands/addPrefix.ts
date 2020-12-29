import { RunEvent, AddPrefixProps } from '../type/interface'
import GuildController from '../controllers/Guild.controller'

// Insert channel on DATABASE
async function addPrefix({ guildID: id, prefix, newPrefix }: AddPrefixProps) {
    // Add prefix on database with current prefixs and newPrefi
    return await GuildController().updateGuild({ id, prefix_redirect: [...prefix, newPrefix] })

        // If success
        .then(() => 'Novo prefixo adicionado')

        // If Error
        .catch(() => 'Desculpe, não consegui adicionar este prefixo')
}

// Run command
export async function run(event: RunEvent) {
    // If not exists new prefix
    if (!event.args[0]) return event.message.reply('Especifique o prefixo para ser adicionado')

    // Get prefix to insert
    const prefix = event.args[0]

    // Check if exist comma in command
    if(prefix.includes(',')) return event.message.reply('Prefixo com virgula não são válidos')

    // Get UNIQUE guild ID
    const guildID = Number(event.message.guild?.id) || 0

    // Get current prefix of guild
    const { prefix_redirect } = await GuildController().selectField(guildID, ["prefix_redirect"])

    // If not get prefix chat
    if (!prefix_redirect) return event.message.reply('Desculpe, não consegui analisar seus prefixos atuais')

    // Check if the prefix is already insert on database
    if (prefix_redirect.includes(prefix)) return event.message.reply('Este prefixo já está adicionado')

    // Create prefix on database and get status of inserted
    const statusInsert = await addPrefix({
        guildID,
        prefix: prefix_redirect,
        newPrefix: prefix
    })

    // Send message
    return event.message.reply(statusInsert)
}

export const names = ["addPrefix"]