"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isNavItemActive } from "@/lib/i18n/routing";

export function Nav() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
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

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <nav aria-label={dict.nav.label} className="sticky top-0 z-40 border-b border-ink bg-paper">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="hidden justify-center lg:flex">
          <ul className="flex max-w-fit items-stretch">
            {navItems.map((item) => {
              const active = isNavItemActive(pathname, item.href);
              return (
                <li key={item.href} className="border-r border-ink first:border-l">
                  <Link href={item.href} aria-current={active ? "page" : undefined} className={cn("flex min-h-11 items-center px-4 font-sans text-xs font-semibold uppercase tracking-widest transition-colors duration-200 hover:bg-ink hover:text-paper", active && "bg-ink text-paper")}>{item.label}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center justify-between py-1.5 lg:hidden">
          <Link href="/" aria-label={dict.nav.homeLabel} onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-2 font-serif text-lg font-black">
            <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-9 object-contain" />
            <span>{dict.masthead.parish}</span>
          </Link>
          <button ref={menuButtonRef} type="button" aria-controls="mobile-navigation" aria-expanded={open} aria-label={open ? dict.nav.close : dict.nav.open} onClick={() => setOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center border border-ink transition-colors duration-200 hover:bg-ink hover:text-paper">
            {open ? <X aria-hidden className="h-6 w-6" strokeWidth={1.5} /> : <Menu aria-hidden className="h-6 w-6" strokeWidth={1.5} />}
          </button>
        </div>
      </div>
      {open ? (
        <ul id="mobile-navigation" className="border-t border-ink bg-paper lg:hidden">
          {navItems.map((item, index) => {
            const active = isNavItemActive(pathname, item.href);
            return <li key={item.href} className="border-b border-muted last:border-b-0"><Link ref={index === 0 ? firstLinkRef : undefined} href={item.href} onClick={() => setOpen(false)} aria-current={active ? "page" : undefined} className={cn("flex min-h-11 items-center px-4 font-sans text-sm font-semibold uppercase tracking-widest transition-colors duration-200 hover:bg-neutral-100", active && "bg-ink text-paper")}>{item.label}</Link></li>;
          })}
        </ul>
      ) : null}
    </nav>
  );
}
