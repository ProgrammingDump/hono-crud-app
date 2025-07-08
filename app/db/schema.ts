import { pgTable, varchar, text, timestamp } from 'drizzle-orm/pg-core'

export const posts = pgTable('posts', {
    id: varchar('id').primaryKey().$defaultFn(() => 
        Math.random().toString(36).substring(2, 14)
    ),
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
})

