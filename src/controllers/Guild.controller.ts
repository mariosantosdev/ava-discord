import { getConnection } from 'typeorm'
import Guild from '../models/Guild'
import { GuildProps } from '../type/interface'
import { ResponseSelectField, ResponseGetPrefix } from '../type/response'

export default function GuildController() {
    // Check if exist guild on DATABASE
    async function existGuild(id: number) {
        // SELECT guild from ID using getConnection with name `sqlite` and 
        const guild = await getConnection()
            .createQueryBuilder()
            .select('guild')
            .from(Guild, 'guild')
            .where("guild.id = :id", { id })
            .getOne()

        // Return wheter exist guild
        return guild ? true : false
    }

    // Add guild on DATABASE
    async function addGuild(values: GuildProps) {
        // Check if guild exists on DATABASE
        if (await existGuild(Number(values.id))) {
            // Update state of guild on DATABASE
            return updateGuild({ id: values.id, deleted: false })
        }

        try {
            // Insert new guild using getConnection with name `sqlite`
            await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Guild)
                .values(values)
                .execute()
        } catch (error) {
            console.log(error);

            return false
        }
    }

    // Update a specific guild on DATABASE
    async function updateGuild(values: GuildProps) {
        // Check if guild exists on DATABASE
        if (await !existGuild(Number(values.id))) return

        try {
            await getConnection()
                .createQueryBuilder()
                .update(Guild)
                .set({ ...values })
                .where("id = :id", { id: values.id })
                .execute()
        } catch (error) {
            console.log(error);

            return false
        }
    }

    // Get prefix of the guild on DATABASE
    async function getPrefix(id: number): Promise<ResponseGetPrefix> {
        if (await !existGuild(Number(id))) return { prefix: '$', prefixLength: 1 }

        const response = await getConnection()
            .createQueryBuilder()
            .select(["guild.prefix", "guild.prefixLength"])
            .from(Guild, "guild")
            .where("guild.id = :id", { id })
            .getOne()

        if(!response) return { prefix: '$', prefixLength: 1 }

        return { prefix: response.prefix, prefixLength: response.prefixLength }
    }

    // Select specific fields of the guild on DATABASE
    async function selectField(id: number, values: string[]): Promise<ResponseSelectField> {
        // Check if exist guild ond DATABASE
        if (await !existGuild(id)) return {}

        // Insert `guild.` in all fields
        const fields = values.map(field => `guild.${field}`)
        const response: { [key: string]: any } = {}

        const result: { [key: string]: any } | undefined = await getConnection()
            .createQueryBuilder()
            .select(fields)
            .from(Guild, "guild")
            .where("guild.id = :id", { id })
            .getOne()

        if(!result) return {}

        // Add each field passed on parameters the response variable
        values.forEach(elem => {
            response[elem] = result[elem]
        })

        return response
    }

    return {
        existGuild,
        addGuild,
        updateGuild,
        getPrefix,
        selectField
    }
}