import * as jwt from "hono/jwt";
import { Role } from "../domain/users/Role.js";
import { z } from "zod";

const userDetailsSchema = z.object({
  sub: z.number(),
  role: z.nativeEnum(Role),
  exp: z.number(),
});

export type UserDetails = z.infer<typeof userDetailsSchema>;

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

export function decodeToken(token: string | undefined) {
  if (!token) return;

  const { payload } = jwt.decode(token);
  return userDetailsSchema.parse(payload);
}
