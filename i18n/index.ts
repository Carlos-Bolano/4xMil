import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

import en from "./locales/en.json";
import es from "./locales/es.json";

export const supportedLanguages = ["en", "es"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export const defaultLanguage: SupportedLanguage = "es";

export function detectDeviceLanguage(): SupportedLanguage {
  const languageCode = getLocales()[0]?.languageCode;
  if (languageCode === "en" || languageCode === "es") return languageCode;
  return defaultLanguage;
}

const i18n = new I18n({
  en,
  es,
});

i18n.enableFallback = true;
i18n.defaultLocale = defaultLanguage;
i18n.locale = defaultLanguage;

export default i18n;
