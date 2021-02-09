import { GuildMember, Client, Guild, TextChannel } from 'discord.js'
import GuildController from '../controllers/Guild.controller'

export default class WelcomeMessage {
    constructor(bot: Client, member: GuildMember) {
        this.bot = bot
        this.member = member
        this.guild = member.guild
    }

    private bot: Client
    private member: GuildMember
    private guild: Guild

    // Phrases of Welcome
    private phrases = [
        `uuuuh olha quem chegou! [NOME]`,
        `abram alas que [NOME] chegou!`,
        `licencinha, vim anunciar a chegada de [NOME]`,
        `agora ta confirmado, temos uma lenda entre nós... [NOME]`,
        `ulala [NOME] chegou`,
        `[NOME] entrou no servidor`,
        `saudemos o(a) [NOME]`
    ]

    // Function to draw a phrase from list
    drawPhrase = (): string => {
        // Get the max number is avaible draw
        let maxIndex = this.phrases.length
        // Draw the index number
        let drawedIndex = Math.floor(Math.random() * (maxIndex + 1))

        // Return the phrase of index drawed or the last phrase of list
        return this.phrases[drawedIndex] ? this.phrases[drawedIndex] : this.phrases[maxIndex]
    }

    // Function to replace character `[NOME]` to mention of member
    formatPhrase = () => {
        // Get the drawed phrase
        let phrase = this.drawPhrase()

        // Return formated phrase
        return phrase.replace('[NOME]', this.member.toString())
    }

    // Function to send message
    sendMessage = async () => {
        // Get welcome channel
        const channel = await this.getWelcomeChannel()

        // Check if exists a welcome channel and send the formated phrase
        if (channel) return channel.send(this.formatPhrase())
        console.log('channel undefined');
    }

    // Getting welcome channel
    getWelcomeChannel = async () => {
        // Fetch id channel from database
        const { channel_welcome } = await GuildController().selectField(Number(this.guild.id), ['channel_welcome'])
        // Check if found any id channel on database
        if(!channel_welcome) return

        // Get the TextChannel from id channel and return it
        return this.bot.channels.cache.get(channel_welcome) as TextChannel
    }
}