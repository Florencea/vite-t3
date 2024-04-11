import "dotenv/config";

import chalk from "chalk";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd, exit } from "node:process";
import type { SwaggerUiOptions } from "swagger-ui-express";

const getEnv = ({
  env,
  from = ".env",
  field = env,
}: {
  env: string;
  from?: string;
  field?: string;
}) => {
  const ENV = process.env[env];
  if (!ENV) {
    const errorMsg = chalk.red(
      `No \`${field}\` field found in \`${from}\`, exit`,
    );
    console.error(errorMsg);
    exit(1);
  } else {
    return ENV;
  }
};

const getEnvFlag = ({
  env,
  from = ".env",
  field = env,
}: {
  env: string;
  from?: string;
  field?: string;
}) => {
  const ENV = getEnv({ env, from, field });
  if (ENV === "1") {
    return true;
  } else if (ENV === "0") {
    return false;
  } else {
    const errorMsg = chalk.red(
      `Flag \`${field}\` must be \`1\` or \`0\`in \`${from}\`, exit`,
    );
    console.error(errorMsg);
    exit(1);
  }
};

/**
 * Enable client
 *
 * from: `env.ENABLE_CLIENT`
 *
 * value: Boolean, ex: `true`
 */
export const ENABLE_CLIENT = getEnvFlag({ env: "ENABLE_CLIENT" });

/**
 * Enable server
 *
 * from: `env.ENABLE_SERVER`
 *
 * value: Boolean, ex: `true`
 */
export const ENABLE_SERVER = getEnvFlag({ env: "ENABLE_SERVER" });

/**
 * Enable openapi
 *
 * from: `env.ENABLE_OPENAPI`
 *
 * value: Boolean, ex: `true`
 */
export const ENABLE_OPENAPI = getEnvFlag({ env: "ENABLE_OPENAPI" });

/**
 * Is Server in production
 */
export const IS_PRODCTION = process.env.NODE_ENV === "production";

/**
 * API version
 *
 * from: `package.json.version`
 *
 * value: String, ex: `0.0.0`
 */
export const VERSION = getEnv({
  env: "npm_package_version",
  from: "package.json",
  field: "version",
});

/**
 * Server port to listen
 *
 * from: `env.PORT`
 *
 * value: Integer, ex: 4000
 */
export const PORT = parseInt(getEnv({ env: "PORT" }));

/**
 * Server web base
 *
 * from: `env.VITE_WEB_BASE`
 *
 * value: String, ex: `/`
 */
export const BASE = getEnv({ env: "VITE_WEB_BASE" });

/**
 * Client output directory for Deployment
 *
 * from: `env.VITE_OUTDIR` + `/client`
 *
 * value: String, ex: `dist/client`
 */
export const OUTDIR = join(getEnv({ env: "VITE_OUTDIR" }), "client");

/**
 * Server restful API route prefix
 *
 * from: `env.VITE_API_ENDPOINT_RESTFUL`
 *
 * value: String, ex: `/api/restful`
 */
export const API_ENDPOINT_RESTFUL = getEnv({
  env: "VITE_API_ENDPOINT_RESTFUL",
});

/**
 * Server tRPC API route prefix
 *
 * from: `env.VITE_API_ENDPOINT_TRPC`
 *
 * value: String, ex: `/api/trpc`
 */
export const API_ENDPOINT_TRPC = getEnv({ env: "VITE_API_ENDPOINT_TRPC" });

/**
 * encrypted cookie name
 *
 * from: `env.COOKIE_NAME`
 *
 * value: String, ex: `TestViteT3`
 */
export const COOKIE_NAME = getEnv({ env: "COOKIE_NAME" });

/**
 * encrypted cookie secret
 *
 * from: `env.COOKIE_SECRET`
 *
 * value: String, ex: `a long secret at least 32 characters long`
 */
export const COOKIE_SECRET = getEnv({ env: "COOKIE_SECRET" });

/**
 * OpenAPI doc title
 *
 * from: `env.VITE_TITLE` + `OpenAPI`
 *
 * value: String, ex: `Test Vite T3 OpenAPI`
 */
export const DOC_TITLE = [getEnv({ env: "VITE_TITLE" }), "OpenAPI"].join(" ");

/**
 * OpenAPI doc route
 *
 * from: `env.VITE_WEB_BASE` + `env.VITE_API_OPENAPI_DOC_ROUTE`
 *
 * value: String, ex: `/openapi`
 */
export const DOC_ROUTE = join(
  BASE,
  getEnv({ env: "VITE_API_OPENAPI_DOC_ROUTE" }),
);

/**
 * OpenAPI typegen route
 *
 * from: `env.VITE_WEB_BASE` + `env.VITE_API_OPENAPI_DOC_ROUTE` + `/typegen`
 *
 * value: String, ex: `/openapi/typegen`
 */
export const DOC_TYPEGEN_ROUTE = join(DOC_ROUTE, "typegen");

/**
 * OpenAPI static file path
 *
 * from: `env.VITE_WEB_BASE` + `env.VITE_API_OPENAPI_DOC_ROUTE` + `/assets`
 *
 * value: String, ex: `/openapi/assets`
 */
export const DOC_STATIC_ROUTE = join(DOC_ROUTE, "assets");

/**
 * OpenAPI static file path
 *
 * In production from: `env.VITE_OUTDIR` + `/client/openapi`
 *
 * In development from `cwd()` + `/public/openapi`
 *
 * value: String, ex: `dist/client/openapi`
 */
export const DOC_STATIC_PATH = IS_PRODCTION
  ? join(OUTDIR, "openapi")
  : join(cwd(), "public", "openapi");

/**
 * OpenAPI Swagger UI Description
 *
 * In production read from: `env.VITE_OUTDIR` + `/client/openapi/DESCRIPTION.md`
 *
 * In development read from `cwd()` + `/public/openapi/DESCRIPTION.md`
 *
 * value: String, ex: content from `dist/client/openapi/"DESCRIPTION.md`
 */
export const DOC_DESCRIPTION = ENABLE_OPENAPI
  ? readFileSync(
      IS_PRODCTION
        ? join(OUTDIR, "openapi", "DESCRIPTION.md")
        : join(cwd(), "public", "openapi", "DESCRIPTION.md"),
      {
        encoding: "utf-8",
      },
    )
  : undefined;

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
