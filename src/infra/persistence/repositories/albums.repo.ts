import { albumsTable } from "../db/tables/albums.table.js";
import assert from "assert";
import { and, eq, isNull, sql } from "drizzle-orm";
import { type DB } from "../db/index.js";
import { AlbumStatus } from "../../../app/domain/albums/AlbumStatus.js";

export async function createNewAlbum(
  { db }: { db: DB },
  { title }: { title: string },
) {
  const results = await db
    .insert(albumsTable)
    .values({
      title: title,
    })
    .returning({ insertedId: albumsTable.id });

  const first = results.at(0);

  assert(!!first?.insertedId, "at least one item should be inserted");

  return first.insertedId;
}

export async function getAlbumById({ db }: { db: DB }, id: string) {
  const results = await db
    .select()
    .from(albumsTable)
    .where(eq(albumsTable.id, id))
    .limit(1);

  const first = results.at(0);

  if (!first) {
    return undefined;
  }

  return first;
}

export async function deleteUnclaimedAlbums(
  { db }: { db: DB },
  { maxMinutesUnclaimed }: { maxMinutesUnclaimed: number },
) {
  return db.delete(albumsTable).where(
    and(
      isNull(albumsTable.ownerId),
      sql`(extract (epoch from now()) - extract (epoch from ${albumsTable.createdAt}))
          / 60 >
          ${maxMinutesUnclaimed}`,
    ),
  );
}

export async function updateStatusAlbum(
  { db }: { db: DB },
  { id, status }: { id: string; status: AlbumStatus },
) {
  return db
    .update(albumsTable)
    .set({
      status,
    })
    .where(eq(albumsTable.id, id));
}
