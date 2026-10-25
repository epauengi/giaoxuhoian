"use client";

import { LOCALE_COOKIE, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ currentLocale = "vi", className }: { currentLocale?: Locale; className?: string }) {
  function selectLocale(locale: Locale) {
    if (locale === currentLocale) return;
    // eslint-disable-next-line react-hooks/immutability -- Intentional browser cookie update in a click handler.
    document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    location.reload();
  }

  return (
    <div role="group" aria-label={currentLocale === "en" ? "Language" : "Ngôn ngữ"} className={cn("inline-flex shrink-0 divide-x divide-ink border border-ink bg-paper", className)}>
      {([ ["vi", "Tiếng Việt"], ["en", "English"] ] as const).map(([locale, label]) => (
        <button
          key={locale}
          type="button"
          lang={locale}
          aria-label={label}
          aria-pressed={currentLocale === locale}
          onClick={() => selectLocale(locale)}
          className={cn("min-h-11 min-w-11 px-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors hover:bg-ink hover:text-paper focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink", currentLocale === locale ? "bg-ink text-paper" : "text-ink")}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
