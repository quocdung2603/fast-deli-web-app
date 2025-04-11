// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./en.json";
import translationVI from "./vn.json";

const resources = {
  en: { translation: translationEN },
  vi: { translation: translationVI },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "vi",
    detection: {
      order: ["localStorage", "navigator"], // ưu tiên localStorage
      caches: ["localStorage"], // lưu ngôn ngữ vào localStorage
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
