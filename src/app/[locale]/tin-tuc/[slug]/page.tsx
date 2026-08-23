import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import { getPublishedArticleBySlug } from "@/lib/articles";
import { formatDate } from "@/lib/article-types";
import { localePath } from "@/lib/i18n/routing";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedMetadata } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = "vi" as const;
  const bai = await getPublishedArticleBySlug(locale, "bai-viet", slug);
  if (!bai) return {};
  return localizedMetadata(locale, bai.title, bai.summary, `/tin-tuc/${slug}`);
}

export default async function BaiVietPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const locale = "vi" as const;
  const bai = await getPublishedArticleBySlug(locale, "bai-viet", slug);
  if (!bai) notFound();
  const d = getDictionary(locale);
  const category = d.category;

  return (
    <article>
      <header className="newsprint-texture border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="mb-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
            <Link href={localePath(locale, "/tin-tuc")} className="hover:text-accent">{d.article.news}</Link>
            <span aria-hidden> / </span>
            <span className="text-ink">{category[bai.category as keyof typeof category] ?? bai.category}</span>
          </nav>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <Badge variant={bai.category === "thong-bao" ? "accent" : "outline"}>
              {category[bai.category as keyof typeof category] ?? bai.category}
            </Badge>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              {formatDate(bai.date, locale)} · {bai.author}
            </span>
          </div>
          <h1 className="max-w-4xl font-serif text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {bai.title}
          </h1>
          <p className="mt-4 max-w-2xl font-body text-lg italic leading-relaxed text-neutral-600">
            {bai.summary}
          </p>
        </div>
      </header>

      <div className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="prose-newsprint max-w-3xl">
                <MDXRemote
                  source={bai.content}
                  options={{ blockJS: true, blockDangerousJS: true, mdxOptions: { format: "md" } }}
                />
              </div>
            </div>
            <aside className="lg:col-span-4">
              <div className="border border-ink p-6 lg:sticky lg:top-16">
                <p className="font-sans text-xs font-bold uppercase tracking-widest">{d.article.tags}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {bai.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                <p className="mt-6 font-sans text-xs font-bold uppercase tracking-widest">
                  {d.article.share}
                </p>
                <p className="mt-2 font-body text-sm text-neutral-600">
                  {d.article.copyLink}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </article>
  );
}
