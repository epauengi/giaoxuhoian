import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import { Halftone } from "@/components/blocks/article-card";
import { getPublishedArticleBySlug } from "@/lib/articles";
import { CATEGORY_LABELS, formatDate } from "@/lib/article-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bai = await getPublishedArticleBySlug("bai-viet", slug);
  if (!bai) return {};
  return { title: bai.title, description: bai.summary };
}

export default async function BaiVietPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bai = await getPublishedArticleBySlug("bai-viet", slug);
  if (!bai) notFound();

  return (
    <article>
      <header className="newsprint-texture border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="mb-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
            <Link href="/tin-tuc" className="hover:text-accent">Tin tức</Link>
            <span aria-hidden> / </span>
            <span className="text-ink">{CATEGORY_LABELS[bai.category] ?? bai.category}</span>
          </nav>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <Badge variant={bai.category === "thong-bao" ? "accent" : "outline"}>
              {CATEGORY_LABELS[bai.category] ?? bai.category}
            </Badge>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              {formatDate(bai.date)} · {bai.author}
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
              <Halftone className="mb-2 h-56 sm:h-72" caption="Fig. 1.1 — Ảnh: Ban Truyền thông" />
              <div className="prose-newsprint mt-8 max-w-3xl text-justify">
                <MDXRemote
                  source={bai.content}
                  options={{ blockJS: true, blockDangerousJS: true, mdxOptions: { format: "md" } }}
                />
              </div>
            </div>
            <aside className="lg:col-span-4">
              <div className="border border-ink p-6 lg:sticky lg:top-16">
                <p className="font-sans text-xs font-bold uppercase tracking-widest">Thẻ</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {bai.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                <p className="mt-6 font-sans text-xs font-bold uppercase tracking-widest">
                  Chia sẻ
                </p>
                <p className="mt-2 font-body text-sm text-neutral-600">
                  Sao chép liên kết trang này để chia sẻ.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </article>
  );
}
