import { TRPCError } from "@trpc/server";
import { publicProcedure } from "./_unauthorized.js";

export const authorizedProcedure = publicProcedure.use((opts) => {
  if (!opts.ctx.session.id) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "" });
  }
  return opts.next();
});
