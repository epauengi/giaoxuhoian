import { auth } from "../auth";
import { NextResponse } from "next/server";

const LOCALE_PREFIX = /^\/(?:vi|en)(?=\/|$)/;
const PUBLIC_FILE = /\.[^/]+$/;

export const proxy = auth((request) => {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/dang-nhap") return NextResponse.next();
    if (!request.auth) {
      const loginUrl = new URL("/admin/dang-nhap", request.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", "/admin");
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/en")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname.startsWith("/vi")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(LOCALE_PREFIX, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/" || (!PUBLIC_FILE.test(pathname) && !pathname.startsWith("/_next/"))) {
    const url = request.nextUrl.clone();
    url.pathname = `/vi${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
