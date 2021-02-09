import { RunEvent } from "../type/interface";
import { BAN_MEMBER } from '../utils/Permitions'

// Replace characters of target to return only id
const formatTarget = (target: string) => target.replace(/[<@!>]/g, '')

export function run(event: RunEvent) {
    // Check if a member is mentioned
    if (!event.args[0]) return event.message.reply(`Você não informou um membro alvo`)

    // Get member author of message
    const member = event.message.member

    // Get formatedTarget
    const formatedTarget = formatTarget(event.args[0])

    // Get reason of ban
    const reason = event.args.slice(1).join(' ')

    // Check if member has a permition to ban members
    if (!member || !BAN_MEMBER(member)) return event.message.reply(`Você não tem permissão para usar esse comando`)

    // Get a GuildMember from target id
    const targetMember = event.message.guild?.members.cache.get(formatedTarget)

    // Check if exist the target member
    if (!targetMember) return event.message.reply(`não encontramos este membro no servidor`)

    // Ban Member
    targetMember?.ban({ reason })
        .then(() => {
            // If exist a reason
            if (reason.trim() !== '') {
                event.message.reply(`acabou de banir ${targetMember} do servidor\nMotivo: ${reason}`)
            } else {
                event.message.reply(`acabou de banir ${targetMember} do servidor`)
            }
        })
        .catch((error) => {
            event.message.reply(`Não foi possivel banir este membro!`)
            console.log(error);
        })
}

export const names = ['ban']