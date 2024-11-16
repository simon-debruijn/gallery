import type { MiddlewareHandler } from "hono";
import { db } from "../../infra/persistence/db/index.js";
import type { AppEnv } from "../app.js";

export const provideDatabase: MiddlewareHandler<AppEnv> = async function (
  c,
  next,
) {
  c.set("db", db);
  await next();
};
