import { getConnection } from 'typeorm'
import Guild from '@models/Guild'
import { GuildProps } from '@type/interface'
import { ResponseSelectField } from '@type/response'

export default function GuildController() {
    // Check if exist guild on DATABASE
    async function existGuild(id: number, getGuild?: boolean) {
        try {
            // SELECT guild from ID using getConnection with name `sqlite` and 
            const guild = await getConnection('sqlite')
                .createQueryBuilder()
                .select('guild')
                .from(Guild, "guild")
                .where("guild.id = :id", { id })
                .getOneOrFail()

            return getGuild ? guild : true
        } catch (error) {
            // If guild not found on DATABASE
            return false
        }
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
            await getConnection('sqlite')
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
            await getConnection('sqlite')
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
    async function getPrefix(id: number): Promise<{ prefix: string, prefixLength: number } | undefined> {
        if (await !existGuild(id)) return

        const response = await getConnection('sqlite')
            .createQueryBuilder()
            .select(["guild.prefix", "guild.prefixLength"])
            .from(Guild, "guild")
            .where("guild.id = :id", { id })
            .getOneOrFail()

        return { prefix: response.prefix, prefixLength: response.prefixLength }
    }

    // Select specific fields of the guild on DATABASE
    async function selectField(id: number, values: string[]): Promise<ResponseSelectField | undefined> {
        // Check if exist guild ond DATABASE
        if (await !existGuild(id)) return undefined

        // Insert `guild.` in all fields
        const fields = values.map(field => `guild.${field}`)
        const response = {}

        const result = await getConnection('sqlite')
            .createQueryBuilder()
            .select(fields)
            .from(Guild, "guild")
            .where("guild.id = :id", { id })
            .getOneOrFail()

        // Add each field passed on parameters the response variable
        values.forEach(elem => {
            response[`${elem}`] = result[`${elem}`]
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