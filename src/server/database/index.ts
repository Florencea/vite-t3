import { createClient } from "@libsql/client";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema.js";

const connectionString = process.env.DATABASE_URL || "file:./database.sqlite";

const client = createClient({
  url: connectionString,
});

export const db = drizzle(client, { schema });
