import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { albumsController } from "./albums/album.controller.js";
import { LandingPage } from "./ui/pages/Landing.page.js";
import { type DB } from "../infra/persistence/db/index.js";
import { usersController } from "./users/users.controller.js";
import { type UserDetails } from "./utils/jwt.js";
import { provideDatabase } from "./middlewares/provideDatabase.js";
import { provideCurrentUser } from "./middlewares/provideCurrentUser.js";
import { provideDefaultLayout } from "./middlewares/provideDefaultLayout.js";

type Variables = {
  db: DB;
  currentUser: UserDetails | undefined;
};

export type AppEnv = {
  Variables: Variables;
};

export const app = new Hono<AppEnv>();

app.use(provideDatabase);
app.use("/public/*", serveStatic({ root: "." }));
app.use(provideCurrentUser);
app.use(provideDefaultLayout);

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
