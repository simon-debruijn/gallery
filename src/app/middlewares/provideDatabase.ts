import type { MiddlewareHandler } from "hono";
import { db } from "../../infra/persistence/db/index.js";

export const provideDatabase: MiddlewareHandler = async function (c, next) {
  c.set("db", db);
  await next();
};
