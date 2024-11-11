import { integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { albumsTable } from "./albums.table.js";
import { usersTable } from "./users.table.js";

export const albumsCustomersTable = pgTable("albums_customers", {
  albumId: uuid().references(() => albumsTable.id),
  customerId: integer().references(() => usersTable.id),
});
