"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/i18n/dictionaries";
export function Nav() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const dict = getDictionary();
  const navItems = [
    { href: "/", label: dict.nav.home },
    { href: "/giao-xu", label: dict.nav.parish },
    { href: "/phung-vu", label: dict.nav.liturgy },
    { href: "/tin-tuc", label: dict.nav.news },
    { href: "/cong-doan", label: dict.nav.community },
    { href: "/thu-vien", label: dict.nav.library },
    { href: "/dong-hanh", label: dict.nav.support },
    { href: "/lien-he", label: dict.nav.contact },
  ];
  const isActive = (href: string) => href === "/" ? pathname === "/" || pathname === "/vi" : pathname.startsWith(href) || pathname.startsWith(`/vi${href}`);
  const hrefFor = (href: string) => href;

  return (
    <nav aria-label={dict.nav.label} className="sticky top-0 z-40 border-b border-ink bg-paper">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="hidden justify-center lg:flex">
          <ul className="flex max-w-fit items-stretch">
            {navItems.map((item) => (
              <li key={item.href} className="border-r border-ink first:border-l">
                <Link href={hrefFor(item.href)} aria-current={isActive(item.href) ? "page" : undefined} className={cn("flex min-h-[44px] items-center px-4 font-sans text-xs font-semibold uppercase tracking-widest transition-colors duration-200 hover:bg-ink hover:text-paper", isActive(item.href) && "bg-ink text-paper")}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between py-1.5 lg:hidden">
          <Link href={hrefFor("/")} aria-label={dict.nav.homeLabel} className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
          </Link>
          <button type="button" aria-expanded={open} aria-label={open ? dict.nav.close : dict.nav.open} onClick={() => setOpen(!open)} className="flex h-11 w-11 items-center justify-center border border-ink hover:bg-ink hover:text-paper">
            {open ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
          </button>
        </div>
      </div>
      {open && <ul className="border-t border-ink bg-paper lg:hidden">{navItems.map((item) => <li key={item.href} className="border-b border-muted last:border-b-0"><Link href={hrefFor(item.href)} onClick={() => setOpen(false)} aria-current={isActive(item.href) ? "page" : undefined} className={cn("flex min-h-[44px] items-center px-4 font-sans text-sm font-semibold uppercase tracking-widest hover:bg-neutral-100", isActive(item.href) && "bg-ink text-paper")}>{item.label}</Link></li>)}</ul>}
    </nav>
  );
}
