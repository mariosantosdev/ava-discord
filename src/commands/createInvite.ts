import { RunEvent } from "../type/interface";

export function run(event: RunEvent) {
    // Get channel id
    const channel = event.message.channel.id

    // Get guild
    const guild = event.message.guild

    // Get channel of guild from channel id
    guild?.channels.cache.get(channel)
        ?.createInvite({ maxUses: 5 }) // Create invite with max uses of 5
        .then(invite => { // Success generated
            event.message.reply(`seu convite pode ser usado no máximo 5 vezes\nAqui está ele: ${invite}`)
        })
        .catch((error) => { // Error generated
            event.message.reply(`não foi possivel criar um convite`)
            console.log(error);
        })
}

export const names = ['createInvite']