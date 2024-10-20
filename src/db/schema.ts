import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { nanoid } from "nanoid";
import { z } from "zod";

export const fieldSchema = z.object({
  name: z.string().min(1, "Must be at least 1 character"),
  url: z.string().url("Must be a valid URL"),
  icon: z.string().optional(),
});
export type Field = z.infer<typeof fieldSchema>;

export const directsTable = sqliteTable("directs", {
  id: text("id").$defaultFn(nanoid).primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  fields: text("fields", { mode: "json" })
    .notNull()
    .$type<Field[]>()
    .default(sql`(json_array())`),

  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  expiresAt: text("expires_at")
    .default(sql`(date('now', '+1 month'))`)
    .notNull(),
});

export const insertDirectSchema = createInsertSchema(directsTable, {
  title: z.string().min(3, "Must be at least 3 characters"),
  description: z
    .string()
    .min(5, "Must be at least 5 characters")
    .optional()
    .or(z.literal("").transform((value) => (value === "" ? null : value))),
  fields: z.array(fieldSchema),
});

export type InsertDirect = typeof directsTable.$inferInsert;
export type SelectDirect = typeof directsTable.$inferSelect;
