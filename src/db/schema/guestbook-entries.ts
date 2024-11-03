import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import {createInsertSchema, createSelectSchema } from 'drizzle-zod'
import users from "./users";

const guestbookEntries = pgTable("guestbook_entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const guestbookEntriesRelations = relations(guestbookEntries, ({ one }) => ({
  user: one(users, {
    fields: [guestbookEntries.userId],
    references: [users.id],
  }),
}));

export const InsertGuestbookEntrySchema = createInsertSchema(guestbookEntries).omit({
  createdAt: true,
  userId: true
});


export default guestbookEntries;
