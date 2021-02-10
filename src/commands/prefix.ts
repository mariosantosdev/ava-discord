import { RunEvent } from '../type/interface'
import GuildController from '../controllers/Guild.controller'
import { MANAGE_GUILD } from '../utils/Permitions'

export async function run(event: RunEvent) {
        // Check if the author of message has permition to execute command
        if(!event.message.member || !MANAGE_GUILD(event.message.member)) return event.message.reply('Você não pode utilizar esse comando!')

    // If not exists new prefix
    if (!event.args[0]) return event.message.reply('Adicione um novo prefixo para ser alterado')

    // guild id to update prefix
    const guildID = Number(event.message.guild?.id) || 0
    const prefix = event.args[0]
    const prefixLength = event.args[0].length

    try {
        await GuildController().updateGuild({
            id: guildID,
            prefix,
            prefixLength
        })

        event.message.reply(`Novo prefixo alterado para \`${prefix}\``)
    } catch (error) {
        console.log(error);
    }
}

export const names = ["prefix"]