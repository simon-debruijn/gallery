import * as repo from "../../infra/persistence/repositories/albums.repo.js";
import { createAlbumEvent, AlbumEvent } from "../../infra/eventing/albums.js";
import { publishEvent } from "../../infra/eventing/queueEvent.js";
import type { DB } from "../../infra/persistence/db/index.js";
import { generateRandomWord } from "../utils/randomwords.js";

export async function createRandomAlbum({ db }: { db: DB }) {
  const id = await repo.createNewAlbum(
    { db },
    { title: generateRandomWord(8) },
  );
  const randomCreated = createAlbumEvent(AlbumEvent.RandomCreated, { id });

  await publishEvent(randomCreated);

  return id;
}
