import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { Ornament } from "@/components/ui/ornament";
import { Badge } from "@/components/ui/badge";
import { getPublishedArticles } from "@/lib/articles";
import { formatDate, type BaiViet } from "@/lib/article-types";
import { phungVuHomNay } from "@/lib/data/phung-vu";
import { formatDateLocale } from "@/lib/utils";
import { localePath } from "@/lib/i18n/routing";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPageMetadata } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = "vi" as const;
  return localizedPageMetadata(
    locale,
    "Lời Chúa & Suy niệm",
    "Lời Chúa hằng ngày, suy niệm Chúa nhật và hằng ngày, kinh nguyện Công giáo của Giáo xứ Hội An.",
    "/loi-chua",
  );
}

function ReflectionList({ items, locale }: { items: BaiViet[]; locale: "vi" }) {
  return (
    <div className="space-y-4">
      {items.map((bai) => (
        <Link
          key={bai.slug}
          href={localePath(locale, `/loi-chua/${bai.slug}`)}
          className="hard-shadow-hover block border border-ink bg-paper p-5"
        >
          <div className="mb-2 flex items-center gap-2">
            <Badge>{formatDate(bai.date, locale)}</Badge>
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
}

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

export default async function LoiChuaPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = "vi" as const;
  const p = getDictionary(locale).page.word;
  const homNay = new Date();
  const phungVu = phungVuHomNay(homNay);
  const suyNiem = await getPublishedArticles(locale, "suy-niem");
  const cn = suyNiem.filter((s) => s.category === "suy-niem-chua-nhat");
  const hn = suyNiem.filter((s) => s.category === "suy-niem-hang-ngay");

  return (
    <>
      {/* Liturgy today */}
      <section className="newsprint-texture border-b border-ink bg-ink text-paper">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
            {p.liturgy} · {formatDateLocale(homNay, locale)}
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
              {p.color} {phungVu.mauPhungVu}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              {p.gospel}: {phungVu.tinMung}
            </span>
          </div>
          <p className="mt-6 max-w-2xl font-body text-base italic leading-relaxed text-neutral-400">
            {p.note}
          </p>
        </div>
      </section>

      {/* Reflections */}
      <section className="border-b border-ink">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 px-4 py-12 sm:py-16 lg:grid-cols-12">
          <div className="lg:col-span-6 lg:border-r lg:border-ink lg:pr-8">
            <SectionHeader label={p.daily} title={p.dailyTitle} />
            <ReflectionList items={hn} locale={locale} />
          </div>
          <div className="lg:col-span-6">
            <SectionHeader label={p.sunday} title={p.sundayTitle} />
            <ReflectionList items={cn} locale={locale} />
          </div>
        </div>
      </section>

      {/* Prayers */}
      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <SectionHeader label={p.prayers} title={p.prayersTitle} />
          <p className="mb-6 max-w-2xl font-body text-sm leading-relaxed text-neutral-600">
            {p.prayersDescription}
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
