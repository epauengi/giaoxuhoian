import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const FOOTER_COLS = [
  {
    title: "Giáo xứ",
    links: [
      { href: "/giao-xu", label: "Tổng quan" },
      { href: "/giao-xu/lich-su", label: "Lịch sử" },
      { href: "/cong-doan", label: "Đoàn thể" },
    ],
  },
  {
    title: "Mục vụ",
    links: [
      { href: "/phung-vu", label: "Giờ lễ" },
      { href: "/bi-tich", label: "Bí tích" },
      { href: "/loi-chua", label: "Lời Chúa" },
    ],
  },
  {
    title: "Thông tin",
    links: [
      { href: "/tin-tuc", label: "Tin tức" },
      { href: "/thu-vien", label: "Thư viện" },
      { href: "/dong-hanh", label: "Đồng hành" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t-4 border-ink bg-ink pb-24 text-paper lg:pb-0">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-12">
        <div className="md:col-span-5 lg:col-span-4">
          <p className="font-serif text-3xl font-black">Giáo xứ Hội An</p>
          <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-neutral-400">
            Cổng thông tin chính thức của Giáo xứ Hội An, Giáo phận Đà Nẵng — giờ lễ, Bí tích,
            tin tức và sinh hoạt cộng đoàn.
          </p>
          <ul className="mt-4 space-y-2 font-mono text-xs text-neutral-400">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              <span>106 Nguyễn Trường Tộ, Hội An, Đà Nẵng, Việt Nam</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              <span>0344 788 513 (Văn phòng)</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              <span>giaoxuhoian0706@gmail.com</span>
            </li>
          </ul>
        </div>

        {FOOTER_COLS.map((col) => (
          <nav key={col.title} aria-label={col.title} className="md:col-span-2 lg:col-span-2">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-neutral-400">
              {col.title}
            </p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-sans text-sm text-paper underline-offset-4 decoration-2 decoration-accent hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="md:col-span-1 lg:col-span-2">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-neutral-400">
            Khẩn cấp
          </p>
          <ul className="space-y-2 font-sans text-sm">
            <li>
              <Link href="/lien-he?khan-cap=xuc-dau" className="decoration-accent hover:underline">
                Xức dầu bệnh nhân
              </Link>
            </li>
            <li>
              <Link href="/lien-he?khan-cap=tang-le" className="decoration-accent hover:underline">
                Báo tang
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-700">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-2 px-4 py-4 font-mono text-[11px] uppercase tracking-widest text-neutral-400 sm:flex-row">
          <span>Edition: Vol 1.0 · Giáo xứ Hội An</span>
          <span>© 2026 · Giáo xứ Hội An</span>
        </div>
      </div>
    </footer>
  );
}
