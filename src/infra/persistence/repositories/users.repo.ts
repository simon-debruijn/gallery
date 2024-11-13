import { usersTable } from "../db/tables/users.table.js";
import { eq } from "drizzle-orm";
import type { DB } from "../db/index.js";

export async function findUserByEmail({ db }: { db: DB }, email: string) {
  const results = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  return results.at(0);
}

export async function insertUser(
  { db }: { db: DB },
  {
    name,
    email,
    encryptedPassword,
  }: { name: string; email: string; encryptedPassword: string },
) {
  return db.insert(usersTable).values({
    name,
    email,
    password: encryptedPassword,
  });
}
