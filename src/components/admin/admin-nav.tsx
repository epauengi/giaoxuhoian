"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Home, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin/bai-viet", label: "Bài viết", icon: FileText },
  { href: "/admin/bai-viet/moi", label: "Tạo bài viết", icon: Plus },
  { href: "/", label: "Xem trang chính", icon: Home },
] as const;

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Điều hướng quản trị" className="mt-4 border-t border-paper/20 pt-2">
      <ul className="flex flex-wrap gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = href === "/admin/bai-viet"
            ? pathname === href || pathname.startsWith(`${href}/`)
            : pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 border border-transparent px-3 font-sans text-xs font-semibold uppercase tracking-[0.12em] transition-[background-color,color,border-color,transform] duration-200 active:translate-y-px",
                  active
                    ? "border-paper bg-paper text-ink"
                    : "text-neutral-300 hover:border-paper/60 hover:text-paper",
                )}
              >
                <Icon aria-hidden size={15} strokeWidth={1.75} />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
