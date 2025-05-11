import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const examples = pgTable('examples', {
  id: serial('id').primaryKey(),
  message: text('message'),
});
