import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { LOCALE_COOKIE } from "@/lib/i18n/config";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const isEn = (await cookies()).get(LOCALE_COOKIE)?.value === "en";
  return {
    title: isEn ? "Page not found | Hoi An Parish" : "Không tìm thấy trang | Giáo xứ Hội An",
    description: isEn ? "This page no longer exists or has moved." : "Đường dẫn này không còn tồn tại hoặc đã được chuyển.",
  };
}

export default async function GlobalNotFound() {
  const isEn = (await cookies()).get(LOCALE_COOKIE)?.value === "en";
  return (
    <html lang={isEn ? "en" : "vi"}>
      <body className="bg-paper text-ink">
        <main className="newsprint-texture grid min-h-screen place-items-center px-4 py-16 text-center">
          <div>
            <p className="font-mono text-6xl font-medium text-accent sm:text-8xl">404</p>
            <h1 className="mt-3 font-serif text-4xl font-black tracking-tight sm:text-6xl">
              {isEn ? "Page not found" : "Không tìm thấy trang"}
            </h1>
            <p className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-neutral-600">
              {isEn ? "This page no longer exists or has moved." : "Đường dẫn này không còn tồn tại hoặc đã được chuyển."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="inline-flex min-h-11 items-center border border-ink bg-ink px-6 font-sans text-xs font-semibold uppercase tracking-widest text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                {isEn ? "Home" : "Trang chủ"}
              </Link>
              <Link
                href="/tin-tuc"
                className="inline-flex min-h-11 items-center border border-ink px-6 font-sans text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-ink hover:text-paper"
              >
                {isEn ? "Parish news" : "Tin giáo xứ"}
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
