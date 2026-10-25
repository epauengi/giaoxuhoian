import type { Locale } from "@/lib/i18n/config";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { BI_TICH } from "@/lib/data/bi-tich";
import { localePath } from "@/lib/i18n/routing";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedMetadata } from "@/lib/seo";
import { localize, translate } from "@/lib/i18n/content";

function DetailBlock({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="border border-ink p-6">
      <h2 className="mb-3 border-b-2 border-ink pb-2 font-sans text-xs font-bold uppercase tracking-widest">
        {title}
      </h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 font-body text-sm leading-relaxed">
            <span aria-hidden className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-ink" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function generateStaticParams() {
  return BI_TICH.flatMap((bt) => [
    { locale: "vi", slug: bt.slug },
    { locale: "en", slug: bt.slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await params).locale as Locale;
  const rawBt = BI_TICH.find((b) => b.slug === slug);
  if (!rawBt) return {};
  const bt = localize(locale, rawBt);

  return localizedMetadata(
    locale,
    `${bt.ten} · ${locale === "en" ? "Sacraments" : "Bí tích"}`,
    bt.tomTat,
    `/bi-tich/${slug}`,
  );
}

export default async function BiTichDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const locale = (await params).locale as Locale;
  const path = (href: string) => localePath(locale, href);
  const p = getDictionary(locale).page.sacraments;

  const rawBt = BI_TICH.find((b) => b.slug === slug);
  if (!rawBt) notFound();
  const bt = localize(locale, rawBt);
  const index = BI_TICH.indexOf(rawBt);

  const prevBt = BI_TICH[index - 1];
  const nextBt = BI_TICH[index + 1];

  return (
    <>
      <section className="newsprint-texture border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="mb-4 font-mono text-xs tracking-widest text-neutral-500">
            <Link href={path("/bi-tich")} className="hover:text-accent">
              {locale === "en" ? "Sacraments" : "Bí tích"}
            </Link>
            <span aria-hidden> / </span>
            <span className="text-ink">{bt.ten}</span>
          </nav>
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            {locale === "en" ? "Sacrament" : "Bí tích"} {String(index + 1).padStart(2, "0")} · {bt.tenLatinh}
          </p>
          <h1 className="mt-2 font-serif text-5xl font-black tracking-tight sm:text-6xl">
            {bt.ten}
          </h1>
          <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-neutral-600">
            {bt.tomTat}
          </p>
        </div>
      </section>

      <section className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-8">
              <DetailBlock title={p.requirements} items={bt.dieuKien} />
              <DetailBlock title={p.documents} items={bt.hoSo} />
              <div className="border border-ink p-6">
                <h2 className="mb-3 border-b-2 border-ink pb-2 font-sans text-xs font-bold uppercase tracking-widest">
                  {p.process}
                </h2>
                <ol className="space-y-3">
                  {bt.quyTrinh.map((step, i) => (
                    <li key={step} className="flex gap-3 font-body text-sm leading-relaxed">
                      <span className="font-mono text-lg font-medium text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <aside className="space-y-6 lg:col-span-4">
              {bt.lich && (
                <div className="border-2 border-ink bg-ink p-6 text-paper">
                  <p className="font-sans text-xs font-bold tracking-widest text-neutral-400">
                    {p.celebration}
                  </p>
                  <p className="mt-2 font-serif text-xl font-bold">{bt.lich}</p>
                </div>
              )}
              <div className="border border-ink p-6">
                <p className="font-sans text-xs font-bold tracking-widest">{p.contact}</p>
                <p className="mt-2 font-body text-sm leading-relaxed">{bt.lienHe}</p>
                <ButtonLink href={path("/lien-he")} variant="secondary" className="mt-4 w-full">
                  {p.sendQuestion}
                </ButtonLink>
              </div>
              <p className="font-mono text-xs tracking-widest text-neutral-500">
                * {p.template}
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* Prev/next */}
      <nav aria-label={p.other} className="border-b border-ink">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 sm:grid-cols-2">
          {prevBt ? (
            <Link
              href={path(`/bi-tich/${prevBt.slug}`)}
              className="border-b border-ink p-6 hover:bg-neutral-100 sm:border-b-0 sm:border-r"
            >
              <p className="font-mono text-xs tracking-widest text-neutral-500">{p.previous}</p>
              <p className="mt-1 font-serif text-xl font-bold">{translate(locale, prevBt.ten)}</p>
            </Link>
          ) : (
            <div className="hidden border-b border-ink sm:block sm:border-b-0 sm:border-r" />
          )}
          {nextBt ? (
            <Link
              href={path(`/bi-tich/${nextBt.slug}`)}
              className="p-6 text-right hover:bg-neutral-100"
            >
              <p className="font-mono text-xs tracking-widest text-neutral-500">{p.next}</p>
              <p className="mt-1 font-serif text-xl font-bold">{translate(locale, nextBt.ten)}</p>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>
      </nav>
    </>
  );
}
