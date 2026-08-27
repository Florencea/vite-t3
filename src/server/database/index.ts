import { createClient } from "@libsql/client";
import "dotenv/config";
import { drizzle as drizzleLibsql } from "drizzle-orm/libsql";
import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import { defineRelations } from "drizzle-orm/relations";
import type { Context } from "hono";
import * as schema from "./schema.js";

const connectionString = process.env.DATABASE_URL || "file:./database.sqlite";

const client = createClient({
  url: connectionString,
});

const relations = defineRelations(schema);

export const db = drizzleLibsql({ client, relations });

export type Database = typeof db;

interface CloudflareEnv {
  DB?: Parameters<typeof drizzleD1>[0];
}

export function getDb(c?: Context): Database {
  const env = c?.env as CloudflareEnv | undefined;
  if (env?.DB) {
    return drizzleD1(env.DB, { relations });
  }
  return db;
}
