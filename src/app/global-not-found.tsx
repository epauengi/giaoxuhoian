import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Không tìm thấy trang | Giáo xứ Hội An",
  description: "Đường dẫn này không còn tồn tại hoặc đã được chuyển.",
};

export default function GlobalNotFound() {
  return (
    <html lang="vi">
      <body className="bg-paper text-ink">
        <main className="newsprint-texture grid min-h-screen place-items-center px-4 py-16 text-center">
          <div>
            <p className="font-mono text-6xl font-medium text-accent sm:text-8xl">404</p>
            <h1 className="mt-3 font-serif text-4xl font-black tracking-tight sm:text-6xl">
              Không tìm thấy trang
            </h1>
            <p className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-neutral-600">
              Đường dẫn này không còn tồn tại hoặc đã được chuyển.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="inline-flex min-h-11 items-center border border-ink bg-ink px-6 font-sans text-xs font-semibold uppercase tracking-widest text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                Trang chủ
              </Link>
              <Link
                href="/tin-tuc"
                className="inline-flex min-h-11 items-center border border-ink px-6 font-sans text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-ink hover:text-paper"
              >
                Tin giáo xứ
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
