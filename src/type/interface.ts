import Guild from '@models/Guild'
import { Message, Client } from 'discord.js'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export interface RunEvent {
    message: Message,
    bot: Client,
    args: string[],
    prefix?: string,
    prefixLength?: number
}

/**
 * Interface to Add Prefix of another bots on DATABASE
 */
export interface AddPrefixProps {
    /**
     * The Unique ID of the guild
     */
    guildID: number
    /**
     * The prefix to insert
     */
    newPrefix: string
    /**
     * Array with full current prefix
     */
    prefix: string[]
}

/**
 * Interface to Add Prefix of another bots on DATABASE
 */
export interface RemovePrefixProps {
    /**
     * The Unique ID of the guild
     */
    guildID: number
    /**
     * The prefix to remove
     */
    removePrefix: string
    /**
     * Array with full current prefix
     */
    prefix: string[]
}

/**
 * Interface to Add Channel on DATABASE
 */
export interface AddChannelProps {
    /**
     * The Unique ID of the guild
     */
    guildID: number
    /**
     * The ID of the channel to insert
     */
    newChannel: string
    /**
     * Array with full current channels
     */
    channels: string[]
    /**
     * Type of channel to be insert
     */
    type: 'chat' | 'command'
}

/**
 * Interface to Remove Channel on DATABASE
 */
export interface RemoveChannelProps {
    /**
     * The Unique ID of the guild
     */
    guildID: number
    /**
     * The ID of the channel to remove
     */
    removeChannel: string
    /**
     * Array with full current channels
     */
    channels: string[]
    /**
     * Type of channel to be insert
     */
    type: 'chat' | 'command'
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
     * The prefix command of bot in the guild
     */
    prefix?: string
    /**
     * The prefix length command of bot in the guild
     */
    prefixLength?: number
    /**
     * The channels commands in the guild
     */
    channels_command?: string[] | [],
    /**
     * The channels chat in the guild
     */
    channels_chat?: string[] | []
    /**
     * The prefix command of another bots
     */
    prefix_redirect?: string[] | []
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