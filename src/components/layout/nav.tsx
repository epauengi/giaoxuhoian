"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Trang chủ" },
  { href: "/giao-xu", label: "Giáo xứ" },
  { href: "/phung-vu", label: "Phụng vụ & Bí tích" },
  { href: "/tin-tuc", label: "Tin tức & Lời Chúa" },
  { href: "/cong-doan", label: "Cộng đoàn & Giáo lý" },
  { href: "/thu-vien", label: "Thư viện" },
  { href: "/dong-hanh", label: "Đồng hành" },
  { href: "/lien-he", label: "Liên hệ" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav aria-label="Điều hướng chính" className="sticky top-0 z-40 border-b border-ink bg-paper">
      <div className="mx-auto max-w-screen-xl px-4">
        {/* Desktop — menu constrained to fit content, centered; bg-paper fills the rest */}
        <div className="hidden justify-center lg:flex">
          <ul className="flex max-w-fit items-stretch">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="border-r border-ink first:border-l">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex min-h-[44px] items-center px-4 font-sans text-xs font-semibold uppercase tracking-widest transition-colors duration-200 hover:bg-ink hover:text-paper",
                    isActive(item.href) && "bg-ink text-paper"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center justify-between py-1.5 lg:hidden">
          <Link href="/" aria-label="Trang chủ Giáo xứ Hội An" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Đóng menu" : "Mở menu"}
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center border border-ink hover:bg-ink hover:text-paper"
          >
            {open ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <ul className="border-t border-ink bg-paper lg:hidden">
          {NAV_ITEMS.map((item) => (
            <li key={item.href} className="border-b border-muted last:border-b-0">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "flex min-h-[44px] items-center px-4 font-sans text-sm font-semibold uppercase tracking-widest hover:bg-neutral-100",
                  isActive(item.href) && "bg-ink text-paper"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
