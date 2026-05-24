import { type resources } from "./i18n.shared";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: (typeof resources)["en-US"];
  }
}
