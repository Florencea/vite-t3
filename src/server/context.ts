import type { Context } from "hono";
import type { SessionData } from "./auth.js";

export interface AppContextVariables {
  session?: SessionData | null;
  language?: string;
}

export type AppContext = Context<{
  Variables: AppContextVariables;
}>;
