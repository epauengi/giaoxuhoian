import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/i18n/dictionaries";

export function Ticker({ items, locale: _locale, className }: { items: string[]; locale?: "vi"; className?: string }) {
  const label = getDictionary().ticker;
  const row = (hidden: boolean) => <div aria-hidden={hidden} className="flex shrink-0 items-center">{items.map((item, i) => <span key={i} className="flex items-center whitespace-nowrap"><span className="mx-4 bg-accent px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-widest text-paper">{label}</span><span className="font-sans text-sm">{item}</span><span className="mx-6 text-neutral-500">✦</span></span>)}</div>;
  return <div className={cn("overflow-hidden border-y border-ink bg-ink py-2.5 text-paper", className)}><div className="ticker-track">{row(false)}{row(true)}</div></div>;
}
