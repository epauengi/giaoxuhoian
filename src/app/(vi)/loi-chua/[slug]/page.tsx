import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import { getPublishedArticleBySlug } from "@/lib/articles";
import { formatDate } from "@/lib/article-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bai = await getPublishedArticleBySlug("suy-niem", slug);
  if (!bai) return {};
  return { title: bai.title, description: bai.summary };
}

export default async function SuyNiemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bai = await getPublishedArticleBySlug("suy-niem", slug);
  if (!bai) notFound();

  return (
    <article>
      <header className="newsprint-texture border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="mb-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
            <Link href="/loi-chua" className="hover:text-accent">Lời Chúa</Link>
            <span aria-hidden> / </span>
            <span className="text-ink">
              {bai.category === "suy-niem-chua-nhat" ? "Suy niệm Chúa nhật" : "Suy niệm hằng ngày"}
            </span>
          </nav>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <Badge>{formatDate(bai.date)}</Badge>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              {bai.author}
            </span>
          </div>
          <h1 className="max-w-4xl font-serif text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            {bai.title}
          </h1>
        </div>
      </header>

      <div className="border-b border-ink">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          <div className="prose-newsprint max-w-3xl text-justify">
            <MDXRemote
                source={bai.content}
                options={{ blockJS: true, blockDangerousJS: true, mdxOptions: { format: "md" } }}
              />
          </div>
        </div>
      </div>
    </article>
  );
}
