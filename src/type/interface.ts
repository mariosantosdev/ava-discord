import { Message, Client } from 'discord.js'

export interface RunEvent {
    message: Message,
    bot: Client,
    args: string[]
}

export interface GuildProps {
    /**
     * The Unique ID of the guild
     */
    id: number,
    /**
     * The name of the guild
     */
    name?: string,
    /**
     * The full amount of members in this guild
     */
    memberCount?: number,
    /**
     * The region the guild is located in
     */
    region?: string,
    /**
     * The timestamp the client user joined the guild at
     */
    joined?: number
    /**
     * The user ID of this guild's owner
     */
    ownerID?: string,
    /**
     * If bot has been removed from the guild
     */
    deleted?: boolean,
}