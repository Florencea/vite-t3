import "dotenv/config";

import chalk from "chalk";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd, exit } from "node:process";
import type { SwaggerUiOptions } from "swagger-ui-express";

/**
 * Is Server in production
 */
export const IS_PRODCTION = process.env.NODE_ENV === "production";

if (!process.env.npm_package_version) {
  console.error("No `version` field found in `package.json`, exit");
  exit(1);
}
/**
 * API version
 *
 * from: `package.json.version`
 *
 * value: String, ex: 0.0.0
 */
export const VERSION = process.env.npm_package_version;

if (!process.env.PORT) {
  console.error("No `PORT` field found in `.env`, exit");
  exit(1);
}
/**
 * Server port to listen
 *
 * from: `env.PORT`
 *
 * value: Integer, ex: 4000
 */
export const PORT = parseInt(process.env.PORT);

if (!process.env.VITE_WEB_BASE) {
  console.error("No `VITE_WEB_BASE` field found in `.env`, exit");
  exit(1);
}
/**
 * Server web base
 *
 * from: `env.VITE_WEB_BASE`
 *
 * value: String, ex: "/"
 */
export const BASE = process.env.VITE_WEB_BASE;

if (!process.env.VITE_OUTDIR) {
  console.error("No `VITE_OUTDIR` field found in `.env`, exit");
  exit(1);
}
/**
 * Client output directory for Deployment
 *
 * from: `env.VITE_OUTDIR` + `/client`
 *
 * value: String, ex: "dist"
 */
export const OUTDIR = join(process.env.VITE_OUTDIR, "client");

if (!process.env.VITE_API_ENDPOINT_RESTFUL) {
  console.error("No `VITE_API_ENDPOINT_RESTFUL` field found in `.env`, exit");
  exit(1);
}
/**
 * Server restful API route prefix
 *
 * from: `env.VITE_API_ENDPOINT_RESTFUL`
 *
 * value: ex: `/api/restful`
 */
export const API_ENDPOINT_RESTFUL = process.env.VITE_API_ENDPOINT_RESTFUL;

if (!process.env.VITE_API_ENDPOINT_TRPC) {
  console.error("No `VITE_API_ENDPOINT_TRPC` field found in `.env`, exit");
  exit(1);
}
/**
 * Server tRPC API route prefix
 *
 * from: env.VITE_API_ENDPOINT_TRPC`
 *
 * value: ex: `/api/trpc`
 */
export const API_ENDPOINT_TRPC = process.env.VITE_API_ENDPOINT_TRPC;

if (!process.env.COOKIE_NAME) {
  console.error("No `COOKIE_NAME` field found in `.env`, exit");
  exit(1);
}
/**
 * encrypted cookie name
 */
export const COOKIE_NAME = process.env.COOKIE_NAME;

if (!process.env.COOKIE_SECRET) {
  console.error("No `COOKIE_SECRET` field found in `.env`, exit");
  exit(1);
}
/**
 * encrypted cookie secret
 */
export const COOKIE_SECRET = process.env.COOKIE_SECRET;

if (!process.env.VITE_TITLE) {
  console.error("No `VITE_TITLE` field found in `.env`, exit");
  exit(1);
}
/**
 * OpenAPI doc title
 */
export const DOC_TITLE = `${process.env.VITE_TITLE} OpenAPI`;

if (!process.env.VITE_API_OPENAPI_DOC_ROUTE) {
  console.error("No `VITE_API_OPENAPI_DOC_ROUTE` field found in `.env`, exit");
  exit(1);
}
/**
 * OpenAPI doc route
 */
export const DOC_ROUTE = join(BASE, process.env.VITE_API_OPENAPI_DOC_ROUTE);
/**
 * OpenAPI typegen route
 */
export const DOC_TYPEGEN_ROUTE = join(DOC_ROUTE, "typegen");
/**
 * OpenAPI static file path
 */
export const DOC_STATIC_ROUTE = join(DOC_ROUTE, "assets");
/**
 * OpenAPI static file path
 */
export const DOC_STATIC_PATH = IS_PRODCTION
  ? join(OUTDIR, "openapi")
  : join(cwd(), "public", "openapi");
/**
 * OpenAPI Swagger UI Description
 */
export const DOC_DESCRIPTION = readFileSync(
  IS_PRODCTION
    ? join(OUTDIR, "openapi", "DESCRIPTION.md")
    : join(cwd(), "public", "openapi", "DESCRIPTION.md"),
  {
    encoding: "utf-8",
  },
);
/**
 * OpenAPI config
 */
export const SWAGGER_UI_OPTIONS: SwaggerUiOptions = {
  customCssUrl: [
    join(DOC_STATIC_ROUTE, "theme.css"),
    join(DOC_STATIC_ROUTE, "fonts.css"),
    join(DOC_STATIC_ROUTE, "custom.css"),
    join(DOC_STATIC_ROUTE, "cookie.css"),
  ] as unknown as string,
  customJs: [
    join(DOC_STATIC_ROUTE, "highlight.min.js"),
    join(DOC_STATIC_ROUTE, "custom.js"),
  ] as unknown as string,
  swaggerOptions: {
    docExpansion: "list",
    persistAuthorization: true,
    deepLinking: true,
    displayRequestDuration: true,
    defaultModelRendering: "example",
    defaultModelExpandDepth: 9999,
    tagsSorter: "alpha",
    filter: true,
    withCredentials: true,
    syntaxHighlight: false,
    requestSnippetsEnabled: false,
  },
  customSiteTitle: DOC_TITLE,
  customfavIcon: "favicon.ico",
};

const timestamp = chalk.gray(
  IS_PRODCTION
    ? new Date().toLocaleTimeString("en-US")
    : new Date().toLocaleTimeString("en-US"),
);
const plugin = chalk.bold.cyan("[vite-express]");
const message = chalk.green("Server Ready on");
const serverUrl = chalk.bold(
  IS_PRODCTION
    ? `port: ${PORT}, base: ${BASE}`
    : `http://localhost:${PORT}${BASE}`,
);
/**
 * Server ready message
 */
export const SERVER_READY_MESSAGE = `${timestamp} ${plugin} ${message} ${serverUrl}`;
