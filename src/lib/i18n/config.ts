export const SUPPORTED_LOCALES = ["vi"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export function isLocale(value: string): value is Locale {
  return value === "vi";
}
