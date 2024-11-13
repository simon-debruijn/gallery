import { signToken } from "../utils/jwt.js";
import { setCookie } from "hono/cookie";
import type { Role } from "./Role.js";
import type { Context } from "hono";
import type { AppEnv } from "../app.js";

const TOKEN_EXP_IN_MINUTES = 5;

export async function setToken(
  c: Context<AppEnv>,
  userDetails: { id: number; role: Role },
) {
  const token = await signToken(userDetails, {
    expiresInMinutes: TOKEN_EXP_IN_MINUTES,
  });

  setCookie(c, "token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * TOKEN_EXP_IN_MINUTES),
  });
}
