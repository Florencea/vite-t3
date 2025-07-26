import { initTRPC, TRPCError } from "@trpc/server";
import { verify } from "argon2";
import type { OpenApiMeta } from "trpc-to-openapi";
import { z } from "zod";
import type { Context } from "../context.js";
import { prisma } from "../database/index.js";
import { authorizedProcedure } from "./_authorized.js";
import { publicProcedure } from "./_unauthorized.js";

const login = publicProcedure
  .meta({
    openapi: {
      summary: "使用者登入",
      method: "POST",
      path: "/login",
      description: "使用者登入",
      tags: ["1授權"],
      protect: false,
    },
  })
  .input(
    z
      .object({
        account: z.string(),
        password: z.string(),
      })
      .required(),
  )
  .output(z.object({}))
  .mutation(async (opts) => {
    const { account, password } = opts.input;
    const user = await prisma.user.findUnique({ where: { account } });
    if (!user)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: opts.ctx.t("auth.user not found", { ns: "server" }),
      });
    const match = await verify(user.password, password);
    if (!match)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: opts.ctx.t("auth.wrong password", { ns: "server" }),
      });
    opts.ctx.session.id = user.id;
    opts.ctx.session.account = user.account;
    await opts.ctx.session.save();
    return {};
  });

const logout = authorizedProcedure
  .meta({
    openapi: {
      summary: "使用者登出",
      method: "POST",
      path: "/logout",
      description: "使用者登出",
      tags: ["1授權"],
      protect: true,
    },
  })
  .input(z.object({}))
  .output(z.object({}))
  .mutation((opts) => {
    opts.ctx.session.destroy();
    return {};
  });

const getUserInfo = publicProcedure
  .meta({
    openapi: {
      summary: "取得使用者資訊與權限",
      method: "GET",
      path: "/getUserInfo",
      description: "取得使用者資訊與權限",
      tags: ["1授權"],
      protect: false,
    },
  })
  .input(z.void())
  .output(
    z
      .object({
        success: z.boolean(),
        account: z.string().nullable(),
      })
      .required(),
  )
  .query((opts) => {
    return {
      success: !!opts.ctx.session.id,
      account: opts.ctx.session.account ?? null,
    };
  });

export const auth = initTRPC
  .context<Context>()
  .meta<OpenApiMeta>()
  .create()
  .router({
    login,
    logout,
    getUserInfo,
  });
