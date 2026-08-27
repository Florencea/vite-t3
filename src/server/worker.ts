import { OpenAPIHono } from "@hono/zod-openapi";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { i18nMiddleware } from "./i18n.js";
import { openapiConfig } from "./openapi.js";
import { apiRouter } from "./router.js";
import { renderSwaggerUiHtml } from "./swagger.js";
import { typegenRouter } from "./typegen.js";
import {
  API_ENDPOINT_RPC,
  DOC_ROUTE,
  DOC_TYPEGEN_ROUTE,
  ENABLE_COMPRESSION,
  ENABLE_OPENAPI,
  ENABLE_SERVER,
  ENABLE_TYPEGEN,
  SWAGGER_UI_OPTIONS,
} from "./config.js";

const app = new OpenAPIHono();

if (ENABLE_SERVER) {
  if (ENABLE_COMPRESSION) {
    app.use("*", compress());
  }

  app.use("*", secureHeaders());
  app.use("*", cors({ origin: "*", credentials: true }));
  app.use("*", i18nMiddleware);

  app.route(API_ENDPOINT_RPC, apiRouter);
}

if (ENABLE_OPENAPI) {
  const docJsonPath = `${DOC_ROUTE}/doc.json`;

  app.doc(docJsonPath, openapiConfig);

  const renderSwagger = () =>
    renderSwaggerUiHtml({
      docUrl: docJsonPath,
      options: SWAGGER_UI_OPTIONS,
    });

  app.get(DOC_ROUTE, (c) => {
    const url = new URL(c.req.url);
    if (!url.pathname.endsWith("/")) {
      return c.redirect(`${DOC_ROUTE}/`, 301);
    }
    return c.html(renderSwagger());
  });

  app.get(`${DOC_ROUTE}/`, (c) => {
    return c.html(renderSwagger());
  });
}

if (ENABLE_TYPEGEN) {
  app.route(DOC_TYPEGEN_ROUTE, typegenRouter);
  app.route("/typegen", typegenRouter);
}

export type AppType = typeof apiRouter;
export default app;
