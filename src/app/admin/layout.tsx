import type { Metadata } from "next";
import Link from "next/link";
import "../globals.css";

export const metadata: Metadata = { title: "Quản trị", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-paper">
        <header className="border-b border-ink bg-ink text-paper">
          <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-4">
            <Link href="/admin" className="font-serif text-xl font-bold">Quản trị giáo xứ</Link>
            <Link href="/admin/dang-xuat" className="font-mono text-xs uppercase tracking-widest">Đăng xuất</Link>
          </div>
        </header>
        <main className="mx-auto max-w-screen-xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
