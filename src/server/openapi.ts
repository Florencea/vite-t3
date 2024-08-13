import { generateOpenApiDocument } from "better-trpc-openapi";
import {
  API_ENDPOINT_RESTFUL,
  COOKIE_NAME,
  DOC_DESCRIPTION,
  DOC_TITLE,
  VERSION,
} from "./config.js";
import { appRouter } from "./router.js";

export const openapiDocs = generateOpenApiDocument(appRouter, {
  title: DOC_TITLE,
  version: VERSION,
  description: DOC_DESCRIPTION,
  baseUrl: API_ENDPOINT_RESTFUL,
  securitySchemes: {
    cookieAuth: {
      type: "apiKey",
      in: "cookie",
      name: COOKIE_NAME,
    },
  },
});
