import Link from "next/link";
import { Clock, MapPin, HeartHandshake, Cross } from "lucide-react";

/** §10.6 — mobile-only quick access for urgent pastoral needs */
const ITEMS = [
  { href: "/phung-vu", label: "Giờ lễ", icon: Clock },
  { href: "/lien-he?khan-cap=xuc-dau", label: "Khẩn cấp", icon: Cross },
  { href: "/dong-hanh", label: "Đóng góp", icon: HeartHandshake },
  { href: "/lien-he", label: "Chỉ đường", icon: MapPin },
];

export function QuickAccessBar() {
  return (
    <nav
      aria-label="Truy cập nhanh"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t-2 border-ink bg-paper lg:hidden"
    >
      {ITEMS.map(({ href, label, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 border-r border-muted font-sans text-[10px] font-semibold uppercase tracking-wider last:border-r-0 hover:bg-neutral-100"
        >
          <Icon className="h-5 w-5" strokeWidth={1.5} />
          {label}
        </Link>
      ))}
    </nav>
  );
}
