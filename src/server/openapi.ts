import { COOKIE_NAME, DOC_DESCRIPTION, DOC_TITLE, VERSION } from "./config.js";

export const openapiConfig = {
  openapi: "3.0.0",
  info: {
    title: DOC_TITLE,
    version: VERSION,
    description: DOC_DESCRIPTION,
  },
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey" as const,
        in: "cookie" as const,
        name: COOKIE_NAME,
      },
    },
  },
};
