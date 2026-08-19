import Link from "next/link";
import { Nav } from "./nav";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { formatDateLocale } from "@/lib/utils";

export function Masthead() {
  const dict = getDictionary();
  const today = formatDateLocale(new Date());
  return (
    <>
      <header className="hidden sm:block">
        <div className="border-b border-ink bg-paper">
          <div className="mx-auto grid max-w-screen-xl grid-cols-1 items-center px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-neutral-600 sm:grid-cols-2">
            <span>{today}</span>
            <span className="hidden text-center sm:inline">{dict.masthead.diocese}</span>
          </div>
        </div>
        <div className="newsprint-texture border-b-4 border-ink">
          <div className="mx-auto max-w-screen-xl px-4 py-3 text-center sm:py-4">
            <p className="mb-0.5 font-mono text-xs uppercase tracking-[0.35em] text-neutral-500">{dict.masthead.official}</p>
            <Link href="/" className="block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt={dict.masthead.logoAlt} width={80} height={80} className="mx-auto mb-2 h-24 w-24 object-contain sm:h-28 sm:w-28" />
              <h1 className="font-serif text-3xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">{dict.masthead.parish}</h1>
            </Link>
            <p className="mt-1 font-body text-sm italic text-neutral-600">{dict.masthead.tagline}</p>
          </div>
        </div>
      </header>
      <Nav />
    </>
  );
}
