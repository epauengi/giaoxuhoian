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

const PARENT_ROUTES: Partial<Record<string, readonly string[]>> = {
  "/phung-vu": ["/bi-tich"],
  "/tin-tuc": ["/loi-chua"],
};

export function isNavItemActive(pathname: string, href: string): boolean {
  const current = stripLocale(pathname).split("?")[0];
  if (href === "/") return current === "/";
  return [href, ...(PARENT_ROUTES[href] ?? [])].some(
    (route) => current === route || current.startsWith(`${route}/`)
  );
}
