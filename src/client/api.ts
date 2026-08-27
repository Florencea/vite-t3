import { hc } from "hono/client";
import type { AppType } from "../server/router";
import i18n from "../i18n";

const endpoint: string =
  typeof import.meta.env.VITE_API_ENDPOINT_RPC === "string"
    ? import.meta.env.VITE_API_ENDPOINT_RPC
    : "/api";

export const api = hc<AppType>(endpoint, {
  fetch: (input: RequestInfo | URL, init?: RequestInit) => {
    const headers = new Headers(init?.headers);
    headers.set("Accept-Language", i18n.language || "en-US");
    return fetch(input, {
      ...init,
      headers,
    });
  },
});

export type { AppType };
