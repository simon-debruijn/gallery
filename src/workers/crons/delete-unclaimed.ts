import "dotenv/config";
import { db } from "../../infra/persistence/db/index.js";
import { deleteUnclaimedAlbums } from "../../infra/persistence/repositories/albums.repo.js";

const MAX_MINUTES_UNCLAIMED = 30;

const results = await deleteUnclaimedAlbums(
  { db: db },
  { maxMinutesUnclaimed: MAX_MINUTES_UNCLAIMED },
);

console.info(`${results.rowCount ?? 0} temporary albums where deleted.`);

// @ts-expect-error
await db.$client.end();
