import { initTRPC } from "@trpc/server";
import type { OpenApiMeta } from "trpc-to-openapi";
import type { Context } from "./context";
import { auth } from "./procedure/auth";

const t = initTRPC.context<Context>().meta<OpenApiMeta>().create();

export const appRouter = t.router({
  auth,
});

export type AppRouter = typeof appRouter;
