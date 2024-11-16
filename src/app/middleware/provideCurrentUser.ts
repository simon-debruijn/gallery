import type { MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";
import { decodeToken } from "../utils/jwt.js";
import type { AppEnv } from "../app.js";

export const provideCurrentUser: MiddlewareHandler<AppEnv> = async function (
  c,
  next,
) {
  const token = getCookie(c, "token");
  const userDetails = decodeToken(token);
  c.set("currentUser", userDetails);
  await next();
};
