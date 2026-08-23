"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, MapPin, HeartHandshake, Cross } from "lucide-react";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isNavItemActive } from "@/lib/i18n/routing";

export function QuickAccessBar() {
  const pathname = usePathname() || "/";
  const d = getDictionary();
  const items = [
    ["/phung-vu", d.quick.mass, Clock],
    ["/lien-he?khan-cap=xuc-dau", d.quick.emergency, Cross],
    ["/dong-hanh", d.quick.support, HeartHandshake],
    ["/lien-he", d.quick.directions, MapPin],
  ] as const;
  return <nav aria-label={d.quick.label} className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t-2 border-ink bg-paper pb-[env(safe-area-inset-bottom)] lg:hidden">{items.map(([href, label, Icon]) => { const active = isNavItemActive(pathname, href); return <Link key={href} href={href} aria-current={active ? "page" : undefined} className={cn("flex min-h-16 flex-col items-center justify-center gap-1 border-r border-muted px-1 font-sans text-xs font-semibold uppercase tracking-wide transition-colors duration-200 last:border-r-0 hover:bg-neutral-100 active:bg-muted", active && "bg-ink text-paper")}><Icon aria-hidden className="h-5 w-5" strokeWidth={1.5} />{label}</Link>; })}</nav>;
}
