import type { MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";
import { decodeToken } from "../utils/jwt.js";

export const provideCurrentUser: MiddlewareHandler = async (c, next) => {
  const token = getCookie(c, "token");
  const userDetails = decodeToken(token);
  c.set("currentUser", userDetails);
  await next();
};
