import { OpenAPIHono } from "@hono/zod-openapi";
import { authRouter } from "./routes/auth.js";

export const apiRouter = new OpenAPIHono().route("/auth", authRouter);

export type AppRouter = typeof apiRouter;
export type AppType = typeof apiRouter;
