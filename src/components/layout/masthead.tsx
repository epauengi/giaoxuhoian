import Image from "next/image";
import Link from "next/link";
import { Nav } from "./nav";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { formatDateLocale } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import type { Locale } from "@/lib/i18n/config";

export function Masthead({ locale: currentLocale = "vi" }: { locale?: Locale }) {
  const dict = getDictionary(currentLocale);
  const today = formatDateLocale(new Date(), currentLocale);

  return (
    <>
      <header>
        {/* Top date and diocese ticker bar - always visible on all viewports */}
        <div className="border-b border-ink bg-paper">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-1 font-mono text-[11px] uppercase tracking-widest text-neutral-600 sm:text-xs">
            <span>{today}</span>
            <span className="font-semibold text-ink sm:font-normal sm:text-neutral-600">
              {dict.masthead.diocese}
            </span>
            <LanguageSwitcher currentLocale={currentLocale} />
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
      <Nav locale={currentLocale} />
    </>
  );
}
