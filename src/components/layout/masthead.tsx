import Image from "next/image";
import Link from "next/link";
import { Nav } from "./nav";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { formatDateLocale } from "@/lib/utils";

export function Masthead() {
  const dict = getDictionary();
  const today = formatDateLocale(new Date());

  return (
    <>
      <header>
        {/* Top date and diocese ticker bar - always visible on all viewports */}
        <div className="border-b border-ink bg-paper">
          <div className="relative mx-auto flex max-w-screen-xl items-center justify-between px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-neutral-600 sm:text-xs">
            <span>{today}</span>
            <span className="font-semibold text-ink sm:absolute sm:inset-x-0 sm:text-center sm:font-normal sm:text-neutral-600">
              {dict.masthead.diocese}
            </span>
            <span className="hidden sm:inline text-[10px] text-neutral-400">
              {dict.masthead.official}
            </span>
          </div>
        </div>

        {/* Mobile-only compact newspaper title plate (< 640px) */}
        <div className="newsprint-texture border-b-2 border-ink px-4 py-2 sm:hidden">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt={dict.masthead.logoAlt}
              width={48}
              height={48}
              priority
              className="h-12 w-12 shrink-0 object-contain"
            />
            <div className="min-w-0">
              <p className="font-serif text-2xl font-black tracking-tight text-ink leading-tight">
                {dict.masthead.parish}
              </p>
              <p className="truncate font-body text-[11px] italic text-neutral-600">
                {dict.masthead.tagline}
              </p>
            </div>
          </Link>
        </div>

        {/* Desktop newspaper masthead (>= 640px) */}
        <div className="newsprint-texture hidden border-b-4 border-ink sm:block">
          <div className="mx-auto max-w-screen-xl px-4 py-3 text-center sm:py-4">
            <p className="mb-0.5 font-mono text-xs uppercase tracking-[0.35em] text-neutral-500">
              {dict.masthead.official}
            </p>
            <Link href="/" className="block">
              <Image
                src="/logo.png"
                alt={dict.masthead.logoAlt}
                width={112}
                height={112}
                priority
                className="mx-auto mb-2 h-24 w-24 object-contain sm:h-28 sm:w-28"
              />
              <p className="font-serif text-3xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                {dict.masthead.parish}
              </p>
            </Link>
            <p className="mt-1 font-body text-sm italic text-neutral-600">
              {dict.masthead.tagline}
            </p>
          </div>
        </div>
      </header>
      <Nav />
    </>
  );
}
