"use server";

import { db } from "@/db";
import {
  directsTable,
  InsertDirect,
  insertDirectSchema,
  SelectDirect,
} from "@/db/schema";
import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createDirect = async (data: InsertDirect) => {
  const parsed = insertDirectSchema.parse(data);

  const [direct] = await db.insert(directsTable).values(parsed).returning();

  revalidatePath(`/directs/${direct.id}`);
  return direct;
};

export const getDirect = async (id: SelectDirect["id"]) => {
  const [direct] = await db
    .select()
    .from(directsTable)
    .where(
      sql`${directsTable.id} = ${id} AND ${directsTable.expiresAt} > date('now')`
    );

  return direct;
};
