import Guild from '@models/Guild'
import { Message, Client } from 'discord.js'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export type GuildProps = QueryDeepPartialEntity<Guild>

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