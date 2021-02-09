import { GuildMember } from "discord.js";

export const ADMIN = (member: GuildMember) => member.hasPermission('ADMINISTRATOR')
export const BAN_MEMBER = (member: GuildMember) => member.hasPermission('BAN_MEMBERS')
export const KICK_MEMBER = (member: GuildMember) => member.hasPermission('KICK_MEMBERS')