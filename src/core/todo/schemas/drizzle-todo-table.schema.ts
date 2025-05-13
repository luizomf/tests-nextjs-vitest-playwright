import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todoTable = sqliteTable('todo', {
  id: text('id').primaryKey(),
  description: text('description').notNull().unique(),
  createdAt: text('created_at').notNull(),
});

export type TodoTableSelectModel = InferSelectModel<typeof todoTable>;
export type TodoTableInsertModel = InferInsertModel<typeof todoTable>;
