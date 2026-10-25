import type { Locale } from "@/lib/i18n/config";
import { SectionHeader } from "@/components/ui/section-header";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Ornament } from "@/components/ui/ornament";
import { EditorialPlate } from "@/components/ui/editorial-plate";
import { DONG_THOI_GIAN } from "@/lib/data/giao-xu";
import { localizedPageMetadata } from "@/lib/seo";
import { localize } from "@/lib/i18n/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const isEn = locale === "en";
  return localizedPageMetadata(
    locale,
    isEn ? "Parish History" : "Lịch sử giáo xứ",
    isEn
      ? "Timeline of Hoi An Parish — from the first 17th-century missionaries to the faith community in the ancient town today."
      : "Dòng lịch sử Giáo xứ Hội An — từ những thừa sai đầu tiên thế kỷ XVII đến cộng đoàn đức tin giữa phố cổ hôm nay.",
    "/giao-xu/lich-su",
  );
}

export default async function LichSuPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const isEn = locale === "en";
  const p = getDictionary(locale).page.history;
  const timeline = localize(locale, DONG_THOI_GIAN);

  return (
    <>
      <section className="newsprint-texture border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <SectionHeader label={p.label} title={p.title} as="h1" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="drop-cap font-body text-base leading-relaxed text-neutral-600">
                {isEn
                  ? "According to the historical summary published by the Diocese of Da Nang, on January 18, 1615, the Jesuit mission led by Father Francesco Buzomi arrived in Cua Han and then Hoi An. The faith community here grew through many centuries amidst periods of ups and downs and persecutions."
                  : "Theo lược sử do Giáo phận Đà Nẵng công bố, ngày 18 tháng 1 năm 1615, phái đoàn Dòng Tên do cha Francesco Buzomi dẫn đầu đến Cửa Hàn rồi đến Hội An. Cộng đoàn đức tin tại đây phát triển qua nhiều thế kỷ, giữa những giai đoạn thăng trầm và bách hại."}
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-neutral-600">
                {isEn
                  ? "Father Francisco de Pina arrived in Dang Trong (Cochinchina) in 1617; in 1672, Bishop Lambert de la Motte convened a Synod in Hoi An. Details regarding the romanized script (Quoc Ngu) and the role of each location need to be presented according to specialized historical sources rather than combined into a simplified assertion."
                  : "Cha Francisco de Pina đến Đàng Trong năm 1617; năm 1672, Đức cha Lambert de la Motte tổ chức Công nghị tại Hội An. Những chi tiết về chữ Quốc ngữ và vai trò của từng địa điểm cần được trình bày theo nguồn sử liệu chuyên môn, không gộp thành một khẳng định đơn giản."}
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
                {isEn
                  ? "Source: Hoi An Parish Summary, Diocese of Da Nang (2023). Some historical milestones require further cross-referencing with archival records."
                  : "Nguồn: Lược sử Giáo xứ Hội An, Giáo phận Đà Nẵng (2023). Một số mốc lịch sử cần đối chiếu thêm tư liệu lưu trữ."}
              </p>
            </div>
            <div className="lg:col-span-5">
              <EditorialPlate
                title={isEn ? "Seeds of the Gospel" : "Hạt giống Tin Mừng"}
                label={isEn ? "Hoi An · Cochinchina" : "Hội An · Đàng Trong"}
                marker="1615"
                logo
                caption={p.caption1}
                className="h-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline — inverted */}
      <section className="newsprint-texture border-b border-ink bg-ink text-paper">
        <div className="mx-auto max-w-screen-xl px-4 py-16">
          <SectionHeader label={p.timeline} title={p.milestones} invert />
          <ol className="relative ml-2 border-l-2 border-paper">
            {timeline.map((m) => (
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
              {isEn
                ? "In 2015, Hoi An Parish celebrated 400 years of the Gospel in Hoi An. The historical summary of the Diocese of Da Nang notes that a masonry church was built in 1935; the present church was rebuilt in 1965 on the existing foundation."
                : "Năm 2015, Giáo xứ Hội An mừng 400 năm Tin Mừng đến Hội An. Lược sử Giáo phận Đà Nẵng ghi nhận nhà thờ bằng gạch đá được xây dựng năm 1935; nhà thờ hiện nay được xây lại năm 1965 trên nền cũ."}
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
