import { RunEvent } from "../type/interface";
import { DMChannel, NewsChannel, TextChannel, MessageEmbed } from "discord.js";
import GuildController from "../controllers/Guild.controller";

function sendHelpMessage(channel: TextChannel | DMChannel | NewsChannel, p?: string) {
    const prefix = p || '$'
    const embed: MessageEmbed = new MessageEmbed()
        .setTitle('Paindel de Ajuda')
        .setDescription('Esses são alguns comandos que consigo executar\nPara mais comandos acesse https://www.bit.ly/com_ava')
        .setColor('#7f29bb')
        .addFields([
            { name: `${prefix}addChannel <command | chat | welcome> <idDoCanal>`, value: 'Comando para adicionar um canal usado para redirecionar mensagens.' },
            { name: `${prefix}removeChannel <command | chat | welcome> <idChannel>`, value: 'Comando para remover um canal usado para redirecionar mensagens.' },
            { name: `${prefix}addPrefix <prefix>`, value: 'Comando para adicionar prefixos usados para redirecionar mensagens.' },
            { name: `${prefix}removePrefix <prefix>`, value: 'Comando para remover prefixo usado para redirecionar mensagens.' },
            { name: `${prefix}kick <idMember | mention> <?motivo>`, value: 'Comando para kickar um membro.' },
            { name: `${prefix}ban <idMember | mention> <?motivo>`, value: 'Comando para banir um membro.' },
            { name: `${prefix}createInvite`, value: 'Comando para criar um convite para o servidor.' },
        ])

    return channel.send(embed)
}

export function run(event: RunEvent) {
    const channel = event.message.channel
    const guild = event.message.guild

    GuildController().getPrefix(Number(guild?.id) || 0)
        .then(({ prefix }) => sendHelpMessage(channel, prefix))
        .catch(() => sendHelpMessage(channel))
}

export const names = ['help']