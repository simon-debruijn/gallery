import "dotenv/config";
import { createConsumer } from "../infra/eventing/createConsumer.js";
import { AlbumEvent } from "../infra/eventing/albums.js";
import { db } from "../infra/persistence/db/index.js";
import { AlbumStatus } from "../app/albums/AlbumStatus.js";
import { updateStatusAlbum } from "../infra/persistence/repositories/albums.repo.js";

await createConsumer(AlbumEvent.ClaimRequested, async ({ payload }) => {
  await updateStatusAlbum(
    { db },
    { id: payload.id, status: AlbumStatus.CLAIM_REQUESTED },
  );

  console.log("should send mail to", payload.email);
});
