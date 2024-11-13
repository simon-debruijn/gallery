import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { albumsController } from "./albums/album.controller.js";
import { LandingPage } from "./ui/pages/Landing.page.js";
import { type DB, db } from "../infra/persistence/db/index.js";
import { usersController } from "./users/users.controller.js";
import { jsxRenderer } from "hono/jsx-renderer";
import { Layout } from "./ui/layouts/Layout.js";
import { getCookie } from "hono/cookie";
import * as jwt from "hono/jwt";

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

app.use("*", (c, next) => {
  return jsxRenderer(({ children }) => {
    const token = getCookie(c, "token");
    const user = token ? jwt.decode(token ?? "").payload : undefined;
    // @ts-expect-error
    return <Layout user={user}>{children}</Layout>;
  })(c, next);
});

app.get("/", (c) => c.render(<LandingPage />));

app.route("/albums", albumsController);
app.route("/users", usersController);

app.onError((err, c) => {
  console.error(err);

  return c.json(
    {
      message: "Internal Server Error",
    },
    500,
  );
});
