import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { albumRouter } from "./albums/album.controller.js";
import { LandingPage } from "./ui/pages/Landing.page.js";
import { type DB, db } from "../infra/persistence/db/index.js";

type Variables = {
  db: DB;
};

export type AppEnv = {
  Variables: Variables;
};

export const app = new Hono<AppEnv>();

app.use(async (c, next) => {
  c.set("db", db);
  await next();
});

app.use("/public/*", serveStatic({ root: "." }));

app.get("/", (c) => c.html(<LandingPage />));

app.route("/albums", albumRouter);

app.onError((err, c) => {
  console.error(err);

  return c.json(
    {
      message: "Internal Server Error",
    },
    500,
  );
});
