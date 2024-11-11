import { pgTable, integer, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/timestamps.js";
import { Role } from "../../../../app/users/Role.js";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  role: varchar({ length: 100 }).$type<Role>().notNull().default(Role.CUSTOMER),
  ...timestamps,
});
