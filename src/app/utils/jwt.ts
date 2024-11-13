import * as jwt from "hono/jwt";
import type { Role } from "../users/Role.js";

export async function signToken(
  { id, role }: { id: number; role: Role },
  {
    expiresInMinutes,
  }: {
    expiresInMinutes: number;
  },
) {
  return await jwt.sign(
    {
      sub: id,
      role: role,
      exp: Math.floor(Date.now() / 1000) + 60 * expiresInMinutes,
    },
    "secret",
  );
}
