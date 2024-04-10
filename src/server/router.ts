import { initTRPC } from "@trpc/server";
import type { Context } from "./context";
import { auth } from "./procedure/auth";

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  auth,
});

export type AppRouter = typeof appRouter;
