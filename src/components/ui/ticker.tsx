"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/i18n/dictionaries";

export function Ticker({
  items,
  className,
}: {
  items: string[];
  locale?: "vi";
  className?: string;
}) {
  const [paused, setPaused] = useState(false);
  const { ticker } = getDictionary();
  const row = (copy = false) => (
    <div aria-hidden={copy || undefined} className={cn("flex shrink-0 items-center", copy && "ticker-copy")}>
      {items.map((item) => (
        <span key={`${copy ? "copy" : "item"}-${item}`} className="flex items-center whitespace-nowrap">
          <span className="mx-4 bg-accent px-2 py-0.5 font-mono text-xs font-medium uppercase tracking-widest text-paper">
            {ticker.label}
          </span>
          <span className="font-sans text-sm">{item}</span>
          <span aria-hidden className="mx-6 text-neutral-500">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-label={ticker.region}
      data-paused={paused}
      className={cn("ticker-group relative overflow-hidden border-y border-ink bg-ink py-2.5 pr-14 text-paper", className)}
    >
      <div className="ticker-track">{row()}{row(true)}</div>
      <button
        type="button"
        aria-pressed={paused}
        aria-label={paused ? ticker.resume : ticker.pause}
        onClick={() => setPaused((value) => !value)}
        className="absolute inset-y-0 right-0 flex w-12 items-center justify-center border-l border-neutral-700 bg-ink text-paper transition-colors duration-200 hover:bg-paper hover:text-ink"
      >
        {paused ? <Play aria-hidden className="h-4 w-4" /> : <Pause aria-hidden className="h-4 w-4" />}
      </button>
    </section>
  );
}
