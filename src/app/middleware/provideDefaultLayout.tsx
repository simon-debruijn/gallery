import type { MiddlewareHandler } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import { Layout } from "../ui/layouts/Layout.js";
import type { AppEnv } from "../app.js";

export const provideDefaultLayout: MiddlewareHandler<AppEnv> = function (
  c,
  next,
) {
  return jsxRenderer(({ children }) => (
    <Layout currentUser={c.var.currentUser}>{children}</Layout>
  ))(c, next);
};
