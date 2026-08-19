import type { Locale } from "./config";

const LOCALE_PREFIX = /^\/vi(?=\/|$)/;

export function stripLocale(pathname: string): string {
  const path = pathname || "/";
  const stripped = path.replace(LOCALE_PREFIX, "");
  return stripped || "/";
}

export function localePath(_locale: Locale, pathname = "/"): string {
  return stripLocale(pathname);
}
