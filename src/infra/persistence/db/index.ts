import { drizzle } from "drizzle-orm/node-postgres";
import { ENV } from "../../config/env.js";

export const db = drizzle(ENV.DATABASE_URL, {
  logger: ENV.NODE_ENV === "development",
  casing: "snake_case",
});

export type DB = typeof db;
