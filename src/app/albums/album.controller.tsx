import { Hono } from "hono";
import type { AppEnv } from "../app.js";
import { getAlbumById } from "../../infra/persistence/repositories/albums.repo.js";
import { createRandomAlbum } from "./albums.service.js";
import { AlbumDetailPage } from "../ui/pages/AlbumDetail.page.js";
import { AlbumEvent, createAlbumEvent } from "../../infra/eventing/albums.js";
import { publishEvent } from "../../infra/eventing/queueEvent.js";

export const albumsController = new Hono<AppEnv>();

albumsController.get("/", (c) => c.text("TODO"));

albumsController.get("/generate", async (c) => {
  const id = await createRandomAlbum({ db: c.var.db });

  return c.redirect(`/albums/${id}`);
});

albumsController.get("/:id", async (c) => {
  const id = c.req.param("id");

  const album = await getAlbumById({ db: c.var.db }, id);

  if (!album) {
    return c.notFound();
  }

  return c.render(
    <AlbumDetailPage id={album.id} title={album.title} status={album.status} />,
  );
});

albumsController.post("/:id/claim", async (c) => {
  const formData = await c.req.formData();
  const id = c.req.param("id");

  const claimRequested = createAlbumEvent(AlbumEvent.ClaimRequested, {
    id,
    email: `${formData.get("email")}`,
  });

  await publishEvent(claimRequested);

  return c.redirect(`/albums/${id}`);
});
