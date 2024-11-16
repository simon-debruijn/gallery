import { pgTable, varchar, integer, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./users.table.js";
import { timestamps } from "../helpers/timestamps.js";
import { AlbumStatus } from "../../../../app/domain/albums/AlbumStatus.js";

export const albumsTable = pgTable("albums", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  ownerId: integer().references(() => usersTable.id),
  status: varchar({ length: 100 })
    .$type<AlbumStatus>()
    .notNull()
    .default(AlbumStatus.UNCLAIMED),
  ...timestamps,
});
