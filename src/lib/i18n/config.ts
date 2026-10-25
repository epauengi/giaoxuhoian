export const SUPPORTED_LOCALES = ["vi", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "vi";
export const LOCALE_COOKIE = "site-locale";

export function isLocale(value: string): value is Locale {
  return value === "vi" || value === "en";
}
