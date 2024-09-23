import { migrate } from "drizzle-orm/postgres-js/migrator";

import Config from "@/../drizzle.config";
import { env } from "@/env/server";

import db, { client } from "./index";

if (!env.DB_MIGRATING) {
  throw new Error("You must set DB_MIGRATING to true in your .env file");
}
await migrate(db, { migrationsFolder: Config.out! });
await client.end();
