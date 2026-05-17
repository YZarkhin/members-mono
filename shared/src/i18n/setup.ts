import i18next, { type i18n } from "i18next";
import { initReactI18next } from "react-i18next";

import { resources } from "./resources";
import { type SupportedLocale, isSupportedLocale, setLocale } from "../stores";

let initialized = false;

export const initializeI18n = async (locale: SupportedLocale = "en"): Promise<i18n> => {
  if (!initialized) {
    await i18next.use(initReactI18next).init({
      compatibilityJSON: "v4",
      fallbackLng: "en",
      lng: locale,
      resources,
      interpolation: {
        escapeValue: false
      }
    });
    initialized = true;
  } else if (i18next.language !== locale) {
    await i18next.changeLanguage(locale);
  }

  setLocale(locale);

  return i18next;
};

export const changeAppLanguage = async (locale: string) => {
  if (!isSupportedLocale(locale)) {
    return;
  }

  await initializeI18n(locale);
};
