import { GuildMember } from "discord.js";

export const ADMIN = (member: GuildMember) => member.hasPermission('ADMINISTRATOR')
export const BAN_MEMBER = (member: GuildMember) => member.hasPermission('BAN_MEMBERS')
export const KICK_MEMBER = (member: GuildMember) => member.hasPermission('KICK_MEMBERS')
export const MANAGE_CHANNELS = (member: GuildMember) => member.hasPermission('MANAGE_CHANNELS')
export const MANAGE_GUILD = (member: GuildMember) => member.hasPermission('MANAGE_GUILD')