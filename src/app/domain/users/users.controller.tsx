import { Hono } from "hono";
import type { AppEnv } from "../../app.js";
import { LoginPage } from "../../ui/pages/LoginPage.js";
import { RegisterPage } from "../../ui/pages/RegisterPage.js";
import { comparePassword, encryptPassword } from "../../utils/password.js";
import { setToken } from "./users.service.js";
import {
  findUserByEmail,
  insertUser,
} from "../../../infra/persistence/repositories/users.repo.js";

export const usersController = new Hono<AppEnv>();

usersController.get("/login", (c) => {
  const email = c.req.query("email");

  return c.render(<LoginPage email={email} />);
});

usersController.post("/login", async (c) => {
  const formData = await c.req.formData();

  // TODO: Use zod for form validation
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await findUserByEmail({ db: c.var.db }, email);

  if (!user) {
    return c.redirect("/users/login?error=1");
  }

  const isSuccess = await comparePassword(password, user.password);

  if (!isSuccess) {
    return c.redirect("/users/login?error=2");
  }

  await setToken(c, user);

  return c.redirect("/");
});

usersController.get("/register", (c) => {
  return c.render(<RegisterPage />);
});

usersController.post("/register", async (c) => {
  const formData = await c.req.formData();

  // TODO: Use zod for form validation
  const name = (formData.get("name") as string).trim();
  const email = (formData.get("email") as string).trim();
  const password = formData.get("password") as string;

  const user = await findUserByEmail({ db: c.var.db }, email);

  if (user) {
    return c.redirect("/users/register?error=1");
  }

  const encryptedPassword = await encryptPassword(password);

  await insertUser(
    { db: c.var.db },
    {
      name,
      email,
      encryptedPassword,
    },
  );

  return c.redirect(`/users/login?email=${email}`);
});
