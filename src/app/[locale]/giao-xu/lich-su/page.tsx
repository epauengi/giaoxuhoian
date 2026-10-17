import { SectionHeader } from "@/components/ui/section-header";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Ornament } from "@/components/ui/ornament";
import { EditorialPlate } from "@/components/ui/editorial-plate";
import { DONG_THOI_GIAN } from "@/lib/data/giao-xu";
import { localizedPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = "vi" as const;
  return localizedPageMetadata(
    locale,
    "Lịch sử giáo xứ",
    "Dòng lịch sử Giáo xứ Hội An — từ những thừa sai đầu tiên thế kỷ XVII đến cộng đoàn đức tin giữa phố cổ hôm nay.",
    "/giao-xu/lich-su",
  );
}

export default async function LichSuPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = "vi" as const;
  const p = getDictionary(locale).page.history;
  return (
    <>
      <section className="newsprint-texture border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <SectionHeader label={p.label} title={p.title} as="h1" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="drop-cap font-body text-base leading-relaxed text-neutral-600">
                Theo lược sử do Giáo phận Đà Nẵng công bố, ngày 18 tháng 1 năm 1615, phái đoàn Dòng Tên do cha Francesco Buzomi dẫn đầu đến Cửa Hàn rồi đến Hội An. Cộng đoàn đức tin tại đây phát triển qua nhiều thế kỷ, giữa những giai đoạn thăng trầm và bách hại.
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-neutral-600">
                Cha Francisco de Pina đến Đàng Trong năm 1617; năm 1672, Đức cha Lambert de la Motte tổ chức Công nghị tại Hội An. Những chi tiết về chữ Quốc ngữ và vai trò của từng địa điểm cần được trình bày theo nguồn sử liệu chuyên môn, không gộp thành một khẳng định đơn giản.
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
                Nguồn: Lược sử Giáo xứ Hội An, Giáo phận Đà Nẵng (2023). Một số mốc lịch sử cần đối chiếu thêm tư liệu lưu trữ.
              </p>
            </div>
            <div className="lg:col-span-5">
              <EditorialPlate title="Hạt giống Tin Mừng" label="Hội An · Đàng Trong" marker="1615" logo caption={p.caption1} className="h-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline — inverted */}
      <section className="newsprint-texture border-b border-ink bg-ink text-paper">
        <div className="mx-auto max-w-screen-xl px-4 py-16">
          <SectionHeader label={p.timeline} title={p.milestones} invert />
          <ol className="relative ml-2 border-l-2 border-paper">
            {DONG_THOI_GIAN.map((m) => (
              <li key={m.nam} className="relative pb-10 pl-8 last:pb-0">
                <span
                  aria-hidden
                  className="absolute -left-[9px] top-1 block h-4 w-4 border-2 border-paper bg-accent"
                />
                <p className="font-mono text-2xl font-medium text-accent">{m.nam}</p>
                <p className="mt-1 max-w-2xl font-body text-base leading-relaxed text-neutral-400">
                  {m.suKien}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Heritage */}
      <section className="border-b border-ink">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 px-4 py-12 sm:py-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader label={p.heritage} title={p.heritageTitle} />
            <p className="font-body text-base leading-relaxed text-neutral-600">
              Năm 2015, Giáo xứ Hội An mừng 400 năm Tin Mừng đến Hội An. Lược sử Giáo phận Đà Nẵng ghi nhận nhà thờ bằng gạch đá được xây dựng năm 1935; nhà thờ hiện nay được xây lại năm 1965 trên nền cũ.
            </p>
          </div>
          <div className="lg:col-span-7">
            <EditorialPlate title={p.heritageTitle} label={p.heritage} marker="1999" caption={p.caption2} className="h-72" />
          </div>
        </div>
      </section>

      <Ornament />
    </>
  );
}
