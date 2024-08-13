import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { createOpenApiExpressMiddleware } from "better-trpc-openapi";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Handler } from "express";
import helmet from "helmet";
import i18nMiddleware from "i18next-http-middleware";
import { cwd } from "node:process";
import { serve, setup } from "swagger-ui-express";
import ViteExpress from "vite-express";
import i18n from "../i18n";
import {
  API_ENDPOINT_RESTFUL,
  API_ENDPOINT_TRPC,
  BASE,
  DOC_ROUTE,
  DOC_STATIC_PATH,
  DOC_STATIC_ROUTE,
  DOC_TYPEGEN_ROUTE,
  ENABLE_CLIENT,
  ENABLE_OPENAPI,
  ENABLE_SERVER,
  IS_PRODCTION,
  OUTDIR,
  PORT,
  SERVER_READY_MESSAGE,
  SWAGGER_UI_OPTIONS,
} from "./config";
import { createContext } from "./context";
import { openapiDocs } from "./openapi";
import { appRouter } from "./router";
import typegenController from "./typegen";

const app = express();

/**
 * Essential middleware
 */
if (ENABLE_SERVER) {
  app.disable("x-powered-by");
  app.use(cors());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(compression());
}

/**
 * Secure middleware in prodction
 */
if (IS_PRODCTION) {
  if (ENABLE_SERVER) {
    app.use(helmet());
  }
  /**
   * Config for viteless production mode
   */
  ViteExpress.config({
    inlineViteConfig: {
      root: cwd(),
      base: BASE,
      build: { outDir: OUTDIR },
    },
  });
}

/**
 * i18n
 */
if (ENABLE_SERVER) {
  void i18n.use(i18nMiddleware.LanguageDetector).init(i18n.options);
  app.use(i18nMiddleware.handle(i18n));
}

const middlewareConfig = {
  router: appRouter,
  createContext,
  responseMeta: undefined,
  onError: undefined,
  maxBodySize: undefined,
};

/**
 * API controllers
 */
if (ENABLE_SERVER) {
  app.use(API_ENDPOINT_TRPC, createExpressMiddleware(middlewareConfig));
}
if (ENABLE_OPENAPI) {
  app.use(
    API_ENDPOINT_RESTFUL,
    createOpenApiExpressMiddleware(middlewareConfig) as Handler,
  );
}

/**
 * OpenAPI and typegen controllers
 */
if (ENABLE_OPENAPI) {
  app.use(DOC_TYPEGEN_ROUTE, typegenController);
  app.use(DOC_STATIC_ROUTE, express.static(DOC_STATIC_PATH));
  app.use(DOC_ROUTE, serve, setup(openapiDocs, SWAGGER_UI_OPTIONS));
}

if (ENABLE_CLIENT) {
  ViteExpress.listen(app, PORT, () => {
    console.info(SERVER_READY_MESSAGE);
  });
} else {
  app.listen(PORT, () => {
    console.info(SERVER_READY_MESSAGE);
  });
}
