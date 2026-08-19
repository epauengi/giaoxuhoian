import Link from "next/link";
import { Clock, MapPin, HeartHandshake, Cross } from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionaries";

export function QuickAccessBar() {
  const d = getDictionary();
  const items = [
    ["/phung-vu", d.quick.mass, Clock],
    ["/lien-he?khan-cap=xuc-dau", d.quick.emergency, Cross],
    ["/dong-hanh", d.quick.support, HeartHandshake],
    ["/lien-he", d.quick.directions, MapPin],
  ] as const;
  return <nav aria-label={d.quick.label} className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t-2 border-ink bg-paper lg:hidden">{items.map(([href, label, Icon]) => <Link key={href} href={href} className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 border-r border-muted font-sans text-[10px] font-semibold uppercase tracking-wider last:border-r-0 hover:bg-neutral-100"><Icon className="h-5 w-5" strokeWidth={1.5} />{label}</Link>)}</nav>;
}
