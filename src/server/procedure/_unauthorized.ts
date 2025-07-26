import { initTRPC } from "@trpc/server";
import type { OpenApiMeta } from "trpc-to-openapi";
import type { Context } from "../context.js";

const t = initTRPC.context<Context>().meta<OpenApiMeta>().create();
export const publicProcedure = t.procedure;
