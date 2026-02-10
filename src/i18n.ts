import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enUS from "./locales/en-US";
import zhTW from "./locales/zh-TW";

export const resources = {
  "en-US": enUS,
  "zh-TW": zhTW,
} as const;

export const config = {
  resources,
  fallbackLng: "en-US",
  interpolation: {
    escapeValue: false,
  },
  showSupportNotice: false,
};

void i18n.use(LanguageDetector).use(initReactI18next).init(config);

export default i18n;
