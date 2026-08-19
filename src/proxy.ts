import { auth } from "@/../auth";
import { NextResponse } from "next/server";

export const proxy = auth((request) => {
  if (request.nextUrl.pathname === "/admin/dang-nhap") return NextResponse.next();
  if (!request.auth) {
    const loginUrl = new URL("/admin/dang-nhap", request.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", "/admin");
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
