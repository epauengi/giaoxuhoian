import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import { auth } from "@/../auth";
import { logoutAction } from "./actions";
import { AdminNav } from "@/components/admin/admin-nav";
import "../globals.css";

const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin", "vietnamese"], weight: ["400", "600", "700", "900"], style: ["normal", "italic"] });
const sourceSerif = Source_Serif_4({ variable: "--font-source-serif", subsets: ["latin", "vietnamese"], weight: ["400", "600"], style: ["normal", "italic"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin", "vietnamese"], weight: ["400", "500", "600", "700"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin", "vietnamese"], weight: ["400", "500"] });

export const metadata: Metadata = { title: "Quản trị", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const isAdmin = session?.user?.id === "admin" && session.user.role === "admin";

  return (
    <html lang="vi" className={`${playfair.variable} ${sourceSerif.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}>
      <body className="min-h-full bg-paper text-ink">
        <a href="#main-content" className="fixed left-3 top-3 z-20 -translate-y-24 border-2 border-paper bg-ink px-4 py-3 font-sans text-sm font-bold uppercase tracking-widest text-paper transition-transform focus:translate-y-0">
          Bỏ qua đến nội dung
        </a>
        {isAdmin && (
          <header className="border-b-2 border-ink bg-ink text-paper">
            <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                <Link href="/admin" className="group inline-flex min-h-11 items-center gap-3 font-serif text-xl font-bold tracking-tight transition-colors duration-200 hover:text-neutral-200">
                  <span aria-hidden className="h-3 w-3 bg-accent transition-transform duration-200 group-hover:scale-125" />
                  <span>Quản trị giáo xứ</span>
                </Link>
                <div className="flex items-center gap-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-neutral-400">
                  <span className="hidden items-center gap-2 sm:inline-flex"><span aria-hidden className="h-2 w-2 bg-accent" /> Đang quản trị</span>
                  <form action={logoutAction}>
                    <button type="submit" className="min-h-11 px-1 text-paper underline decoration-accent decoration-2 underline-offset-4 transition-colors duration-200 hover:text-neutral-300">
                      Đăng xuất
                    </button>
                  </form>
                </div>
              </div>
              <AdminNav />
            </div>
          </header>
        )}
        <div id="main-content" tabIndex={-1} className="min-h-[calc(100dvh-1px)] outline-none">
          {children}
        </div>
      </body>
    </html>
  );
}
