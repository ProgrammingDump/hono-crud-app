import { db } from './index'
import { migrate } from 'drizzle-orm/neon-http/migrator'

const main = async () => {
    try {
        await migrate(db, {
            migrationsFolder: 'app/db/migrations/',
        })
        console.log('Migration complete')
        process.exit(0)
    } catch (error) {
        console.error('Migration failed', error)
        process.exit(1)
    }
}

main()