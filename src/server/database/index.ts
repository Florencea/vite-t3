import { createClient } from "@libsql/client";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { defineRelations } from "drizzle-orm/relations";
import * as schema from "./schema.js";

const connectionString = process.env.DATABASE_URL || "file:./database.sqlite";

const client = createClient({
  url: connectionString,
});

const relations = defineRelations(schema);

export const db = drizzle({ client, relations });
