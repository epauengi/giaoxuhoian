import Link from "next/link";
import { formatVi } from "@/lib/utils";
import { Nav } from "./nav";

export function Masthead({ locale = "vi" }: { locale?: "vi" | "en" }) {
  const today = formatVi(new Date());
  return (
    <>
      {/* Masthead hidden on mobile — Nav shows logo + hamburger instead */}
      <header className="hidden sm:block">
        {/* Edition line */}
        <div className="border-b border-ink bg-paper">
          <div className="mx-auto grid max-w-screen-xl grid-cols-2 items-center px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-neutral-600 sm:grid-cols-3">
            <span>Vol. 1 | {today}</span>
            <span className="hidden text-center sm:inline">
              {locale === "vi" ? "Giáo phận Đà Nẵng" : "Diocese of Da Nang"}
            </span>
            <Link href={locale === "vi" ? "/en" : "/"} className="text-right hover:text-accent">
              {locale === "vi" ? "English" : "Tiếng Việt"}
            </Link>
          </div>
        </div>

        {/* Title block */}
        <div className="newsprint-texture border-b-4 border-ink">
          <div className="mx-auto max-w-screen-xl px-4 py-3 text-center sm:py-4">
            <p className="mb-0.5 font-mono text-xs uppercase tracking-[0.35em] text-neutral-500">
              ✦ Cổng thông tin chính thức ✦
            </p>
            <Link href="/" className="block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Logo Giáo xứ Hội An"
                width={80}
                height={80}
                className="mx-auto mb-2 h-24 w-24 object-contain sm:h-28 sm:w-28"
              />
              <h1 className="font-serif text-3xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Giáo xứ Hội An
              </h1>
            </Link>
            <p className="mt-1 font-body text-sm italic text-neutral-600">
              Nơi kết nối cộng đoàn trong đức tin và yêu thương
            </p>
          </div>
        </div>
      </header>

      <Nav />
    </>
  );
}
