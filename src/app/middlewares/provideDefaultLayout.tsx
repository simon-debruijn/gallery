import type { MiddlewareHandler } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import { Layout } from "../ui/layouts/Layout.js";

export const provideDefaultLayout: MiddlewareHandler = (c, next) =>
  jsxRenderer(({ children }) => (
    <Layout currentUser={c.var.currentUser}>{children}</Layout>
  ))(c, next);
