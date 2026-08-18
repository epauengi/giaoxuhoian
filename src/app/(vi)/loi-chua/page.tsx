import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { Ornament } from "@/components/ui/ornament";
import { Badge } from "@/components/ui/badge";
import { getSuyNiem, formatDate } from "@/lib/content";
import { phungVuHomNay } from "@/lib/data/phung-vu";
import { formatVi } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Lời Chúa & Suy niệm",
  description:
    "Lời Chúa hằng ngày, suy niệm Chúa nhật và hằng ngày, kinh nguyện Công giáo của Giáo xứ Hội An.",
};

const KINH_NGUYEN = [
  { ten: "Kinh Lạy Cha", loai: "Kinh thông dụng" },
  { ten: "Kinh Kính Mừng", loai: "Kinh thông dụng" },
  { ten: "Kinh Sáng Danh", loai: "Kinh thông dụng" },
  { ten: "Kinh Tin Kính", loai: "Kinh thông dụng" },
  { ten: "Kinh Ăn Năn Tội", loai: "Chuẩn bị xưng tội" },
  { ten: "Kinh Vực Sâu", loai: "Cầu cho các linh hồn" },
  { ten: "Kinh Mân Côi — Năm sự Vui", loai: "Theo mùa" },
  { ten: "Kinh Mân Côi — Năm sự Sáng", loai: "Theo mùa" },
  { ten: "Kinh Mân Côi — Năm sự Thương", loai: "Theo mùa" },
  { ten: "Kinh Mân Côi — Năm sự Mừng", loai: "Theo mùa" },
  { ten: "Kinh Tối Gia Đình", loai: "Cầu nguyện gia đình" },
  { ten: "Kinh Sáng Gia Đình", loai: "Cầu nguyện gia đình" },
];

export default function LoiChuaPage() {
  const homNay = new Date();
  const phungVu = phungVuHomNay(homNay);
  const suyNiem = getSuyNiem();
  const cn = suyNiem.filter((s) => s.category === "suy-niem-chua-nhat");
  const hn = suyNiem.filter((s) => s.category === "suy-niem-hang-ngay");

  const List = ({ items }: { items: typeof suyNiem }) => (
    <div className="space-y-4">
      {items.map((bai) => (
        <Link
          key={bai.slug}
          href={`/loi-chua/${bai.slug}`}
          className="hard-shadow-hover block border border-ink bg-paper p-5"
        >
          <div className="mb-2 flex items-center gap-2">
            <Badge>{formatDate(bai.date)}</Badge>
            <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
              {bai.author}
            </span>
          </div>
          <h3 className="font-serif text-2xl font-bold">{bai.title}</h3>
          <p className="mt-1 font-body text-sm leading-relaxed text-neutral-600">{bai.summary}</p>
        </Link>
      ))}
    </div>
  );

  return (
    <>
      {/* Liturgy today */}
      <section className="newsprint-texture border-b border-ink bg-ink text-paper">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
            Phụng vụ · {formatVi(homNay)}
          </p>
          <h1 className="font-serif text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            {phungVu.tenLe}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
              <span
                aria-hidden
                className="block h-4 w-4 border border-paper"
                style={{ backgroundColor: phungVu.mauHex }}
              />
              Màu {phungVu.mauPhungVu}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              Tin Mừng: {phungVu.tinMung}
            </span>
          </div>
          <p className="mt-6 max-w-2xl font-body text-base italic leading-relaxed text-neutral-400">
            Bài đọc đầy đủ và bản văn phụng vụ: xem trên các nguồn phụng vụ chính thức của Giáo
            phận. Trang này đăng suy niệm do quý cha giáo xứ biên soạn.
          </p>
        </div>
      </section>

      {/* Reflections */}
      <section className="border-b border-ink">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 px-4 py-12 sm:py-16 lg:grid-cols-12">
          <div className="lg:col-span-6 lg:border-r lg:border-ink lg:pr-8">
            <SectionHeader label="Hằng ngày" title="Suy niệm hằng ngày" />
            <List items={hn} />
          </div>
          <div className="lg:col-span-6">
            <SectionHeader label="Chúa nhật" title="Suy niệm Chúa nhật" />
            <List items={cn} />
          </div>
        </div>
      </section>

      {/* Prayers */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <SectionHeader label="Kinh nguyện" title="Kinh nguyện Công giáo" />
          <p className="mb-6 max-w-2xl font-body text-sm leading-relaxed text-neutral-600">
            Danh mục kinh thông dụng để cầu nguyện cá nhân và gia đình. Bản văn đầy đủ sẽ được
            bổ sung dần.
          </p>
          <div className="grid grid-cols-1 border-l border-t border-ink sm:grid-cols-2 lg:grid-cols-3">
            {KINH_NGUYEN.map((k) => (
              <div key={k.ten} className="border-b border-r border-ink p-4">
                <p className="font-serif text-lg font-bold">{k.ten}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                  {k.loai}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Ornament />
    </>
  );
}
