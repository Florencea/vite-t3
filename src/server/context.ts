import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { getIronSession } from "iron-session";
import type { User } from "../../prisma/generated/client.js";
import { COOKIE_NAME, COOKIE_SECRET } from "./config.js";

export async function createContext({ req, res }: CreateExpressContextOptions) {
  const session = await getIronSession<Partial<Pick<User, "id" | "account">>>(
    req,
    res,
    {
      password: COOKIE_SECRET,
      cookieName: COOKIE_NAME,
    },
  );
  const t = req.t;
  return { session, t };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
