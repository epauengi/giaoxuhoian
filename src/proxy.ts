import { auth } from "../auth";
import { NextResponse } from "next/server";
import { isLocale, LOCALE_COOKIE } from "@/lib/i18n/config";

const LOCALE_PREFIX = /^\/(vi|en)(?=\/|$)/;

export const proxy = auth((request) => {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (pathname === "/admin/dang-nhap") return NextResponse.next();
    if (!request.auth) {
      const loginUrl = new URL("/admin/dang-nhap", request.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", "/admin");
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  const legacyLocale = pathname.match(LOCALE_PREFIX)?.[1];
  if (legacyLocale && isLocale(legacyLocale)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(LOCALE_PREFIX, "") || "/";
    const response = NextResponse.redirect(url, 307);
    response.headers.set("Cache-Control", "private, no-store");
    response.cookies.set(LOCALE_COOKIE, legacyLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
    });
    return response;
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
