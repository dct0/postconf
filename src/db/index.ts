import { config } from "@dotenvx/dotenvx";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

config({ path: ".env" });

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});
export const db = drizzle({ client });
