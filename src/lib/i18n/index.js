import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import ar from "../../content/ar.json"
import en from "../../content/en.json"

const resources = {
  ar: {
    translation: ar,
  },
  en: {
    translation: en,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ar",
    supportedLngs: ["en", "ar"],
    debug: true,

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    detection: {
      order: ["path", "cookie"],
      caches: ["cookie"], // Cache the language selection
    },
  })

export default i18n
