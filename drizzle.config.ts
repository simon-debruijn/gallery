import "dotenv/config";
import assert from "node:assert";
import { defineConfig } from "drizzle-kit";

assert(process.env.DATABASE_URL, "DATABASE_URL should be defined");

export default defineConfig({
  out: "./src/infra/persistence/db/migrations",
  schema: "./src/infra/persistence/db/tables/*.table.ts",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
});
