import { RunEvent } from "../type/interface";
import { KICK_MEMBER } from '../utils/Permitions'

// Replace characters of target to return only id
const formatTarget = (target: string) => target.replace(/[<@!>]/g, '')

export function run(event: RunEvent) {
    // Check if member has a permition to kick members
    if (!event.message.member || !KICK_MEMBER(event.message.member)) return event.message.reply(`Você não tem permissão para usar esse comando`)

    // Check if a member is mentioned
    if(!event.args[0]) return event.message.reply(`Você não informou um membro alvo`)

    // Get formatedTarget
    const formatedTarget = formatTarget(event.args[0])

    // Get reason of kick
    const reason = event.args.slice(1).join(' ')

    // Get a GuildMember from target id
    const targetMember = event.message.guild?.members.cache.get(formatedTarget)

    // Check if exist the target member
    if(!targetMember) return event.message.reply(`não encontramos este membro no servidor`)

    // Kick Member
    targetMember?.kick(reason)
        .then(() => {
            // If exist a reason
            if(reason.trim() !== ''){
                event.message.reply(`acabou de kickar ${targetMember} do servidor\nMotivo: ${reason}`)
            }else{
                event.message.reply(`acabou de kickar ${targetMember} do servidor`)
            }
        })
        .catch((error) => {
            event.message.reply(`Não foi possivel kickar este membro!`)
            console.log(error);
        })
}

export const names = ['kick']