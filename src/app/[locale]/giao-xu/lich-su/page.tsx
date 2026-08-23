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
                Hội An — thương cảng quốc tế sầm uất bậc nhất Đàng Trong trong các thế kỷ
                XVI–XVIII — là nơi gặp gỡ của thương nhân Nhật Bản, Trung Hoa, Bồ Đào Nha, Hà
                Lan và cũng là một trong những điểm đến sớm nhất của các thừa sai phương Tây.
                Hạt giống Tin Mừng được gieo trên vùng đất này từ đầu thế kỷ XVII, và cộng đoàn
                tín hữu Hội An đã bền bỉ lớn lên qua bao biến cố của lịch sử.
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-neutral-600">
                Gần Hội An, Dinh trấn Thanh Chiêm được các nhà nghiên cứu xem là cái nôi của
                chữ Quốc ngữ — nơi cha Francisco de Pina và các thừa sai Dòng Tên khởi sự dùng
                mẫu tự Latinh để ghi âm tiếng Việt. Đức tin và văn hóa đã gặp nhau trên vùng
                đất này theo cách rất riêng.
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
                {p.template}
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
              Câu chuyện truyền giáo tại Hội An không tách rời câu chuyện giao lưu văn hóa
              Đông–Tây: từ những trang từ vựng Việt–Bồ–La đầu tiên đến ngôi nhà thờ giữa lòng
              phố cổ hôm nay. Giáo xứ mong muốn gìn giữ và kể lại di sản ấy cho thế hệ trẻ và
              du khách gần xa.
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
