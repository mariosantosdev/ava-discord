import { getConnection } from 'typeorm'
import Guild from '@models/Guild'
import { GuildProps } from '@type/interface'

export default function GuildController() {
    // Find guild on DATABASE
    async function findGuild(id: number) {
        try {
            // SELECT guild from ID using getConnection with name `sqlite` and 
            const guild = await getConnection('sqlite')
                .createQueryBuilder()
                .select('guild')
                .from(Guild, "guild")
                .where("guild.id = :id", { id })
                .getOneOrFail()

            return guild
        } catch (error) {
            // If guild not found on DATABASE
            return false
        }
    }

    async function addGuild(values: GuildProps) {
        // Check if guild exists on DATABASE
        if (await findGuild(values.id)) {
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

    async function updateGuild(values: GuildProps) {
        // Check if guild exists on DATABASE
        if (await !findGuild(values.id)) return

        try {
            await getConnection('sqlite')
                .createQueryBuilder()
                .update(Guild)
                .set({ ...values })
                .where("id = :id", { id: values.id })
                .execute()
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.log(error);

            return false
        }
    }

    return {
        findGuild,
        addGuild,
        updateGuild,
    }
}