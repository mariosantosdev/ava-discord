import GuildController from "../controllers/Guild.controller";
import { RunEvent } from "../type/interface";

export async function run(event: RunEvent) {
    // Get id of guild
    const guildID = Number(event.message.guild?.id || 0)

    // Get status enable welcome message
    const { welcome_message_status } = await GuildController().selectField(guildID, ['welcome_message_status'])

    // Update welcome message status on database
    await GuildController().updateGuild({
        id: guildID,
        welcome_message_status: !welcome_message_status
    })
        .then(() => {
            // Transform `true` or `false` in words
            const statusMessage = !welcome_message_status ? 'ativadas' : 'desativadas'
            // Send message reply
            event.message.reply(`As mensagens de boas vindas foram ${statusMessage}`)
        })
        .catch((error) => {
            console.log(error);
            // Send message with error
            event.message.reply(`Não foi possivel alterar o status das mensagens de boas vindas!`)
        })
}

export const names = ['welcomeMessage']