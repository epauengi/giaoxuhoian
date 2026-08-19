import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { ArticleCard } from "@/components/blocks/article-card";
import { getPublishedArticles } from "@/lib/articles";
import { cn } from "@/lib/utils";
import { localePath } from "@/lib/i18n/routing";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPageMetadata } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = "vi" as const;
  return localizedPageMetadata(
    locale,
    "Tin tức & Sự kiện",
    "Thông báo mục vụ, tin sinh hoạt, cáo phó và rao hôn phối của Giáo xứ Hội An.",
    "/tin-tuc",
  );
}

const FILTERS = ["thong-bao", "sinh-hoat", "cao-pho", "rao-hon-phoi"];

export default async function TinTucPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ loai?: string }>;
  params: Promise<{ locale: string }>;
}) {
  const locale = "vi" as const;
  const { loai } = await searchParams;
  const active = loai && FILTERS.includes(loai) ? loai : null;
  const filtered = await getPublishedArticles(locale, "bai-viet", active ?? undefined);

  const d = getDictionary(locale);
  const page = d.page.news;
  const path = (href: string) => localePath(locale, href);
  return (
    <>
      <section className="newsprint-texture border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <SectionHeader label={page.label} title={page.title} />
          <p className="max-w-2xl font-body text-base leading-relaxed text-neutral-600">
            {page.description} Suy niệm Lời Chúa tại
            <Link href={path("/loi-chua")} className="underline decoration-accent decoration-2 underline-offset-4">{page.wordLink}</Link>.
          </p>
        </div>
      </section>

      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          {/* Filter bar */}
          <nav aria-label={page.filterLabel} className="mb-8 flex flex-wrap border border-ink">
            <Link
              href={path("/tin-tuc")}
              aria-current={!active ? "true" : undefined}
              className={cn(
                "flex min-h-[44px] items-center border-r border-ink px-4 font-sans text-xs font-semibold uppercase tracking-widest hover:bg-neutral-100",
                !active && "bg-ink text-paper hover:bg-ink"
              )}
            >
              {page.all}
            </Link>
            {FILTERS.map((f) => (
              <Link
                key={f}
                href={path(`/tin-tuc?loai=${f}`)}
                aria-current={active === f ? "true" : undefined}
                className={cn(
                  "flex min-h-[44px] items-center border-r border-ink px-4 font-sans text-xs font-semibold uppercase tracking-widest last:border-r-0 hover:bg-neutral-100",
                  active === f && "bg-ink text-paper hover:bg-ink"
                )}
              >
                {d.category[f as keyof typeof d.category]}
              </Link>
            ))}
          </nav>

          {filtered.length === 0 ? (
            <p className="border border-dashed border-ink p-8 text-center font-body italic text-neutral-600">
              {page.empty}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((bai) => (
                <ArticleCard key={bai.slug} locale={locale} bai={bai} href={path(`/tin-tuc/${bai.slug}`)} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
