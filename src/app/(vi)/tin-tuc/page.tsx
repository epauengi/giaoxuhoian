import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { ArticleCard } from "@/components/blocks/article-card";
import { getBaiViet, CATEGORY_LABELS } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tin tức & Sự kiện",
  description:
    "Thông báo mục vụ, tin sinh hoạt, cáo phó và rao hôn phối của Giáo xứ Hội An.",
};

const FILTERS = ["thong-bao", "sinh-hoat", "cao-pho", "rao-hon-phoi"];

export default async function TinTucPage({
  searchParams,
}: {
  searchParams: Promise<{ loai?: string }>;
}) {
  const { loai } = await searchParams;
  const all = getBaiViet();
  const active = loai && FILTERS.includes(loai) ? loai : null;
  const filtered = active ? all.filter((b) => b.category === active) : all;

  return (
    <>
      <section className="newsprint-texture border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <SectionHeader label="Tin tức & Lời Chúa" title="Tin giáo xứ" />
          <p className="max-w-2xl font-body text-base leading-relaxed text-neutral-600">
            Thông báo mục vụ, tin sinh hoạt đoàn thể, cáo phó và rao hôn phối. Suy niệm Lời Chúa
            tại <Link href="/loi-chua" className="underline decoration-accent decoration-2 underline-offset-4">trang Lời Chúa</Link>.
          </p>
        </div>
      </section>

      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          {/* Filter bar */}
          <nav aria-label="Lọc theo loại tin" className="mb-8 flex flex-wrap border border-ink">
            <Link
              href="/tin-tuc"
              aria-current={!active ? "true" : undefined}
              className={cn(
                "flex min-h-[44px] items-center border-r border-ink px-4 font-sans text-xs font-semibold uppercase tracking-widest hover:bg-neutral-100",
                !active && "bg-ink text-paper hover:bg-ink"
              )}
            >
              Tất cả
            </Link>
            {FILTERS.map((f) => (
              <Link
                key={f}
                href={`/tin-tuc?loai=${f}`}
                aria-current={active === f ? "true" : undefined}
                className={cn(
                  "flex min-h-[44px] items-center border-r border-ink px-4 font-sans text-xs font-semibold uppercase tracking-widest last:border-r-0 hover:bg-neutral-100",
                  active === f && "bg-ink text-paper hover:bg-ink"
                )}
              >
                {CATEGORY_LABELS[f]}
              </Link>
            ))}
          </nav>

          {filtered.length === 0 ? (
            <p className="border border-dashed border-ink p-8 text-center font-body italic text-neutral-600">
              Chưa có tin trong mục này.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((bai) => (
                <ArticleCard key={bai.slug} bai={bai} href={`/tin-tuc/${bai.slug}`} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
