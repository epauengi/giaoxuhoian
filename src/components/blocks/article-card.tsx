import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { BaiViet } from "@/lib/article-types";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { formatDate } from "@/lib/article-types";

export function Halftone({ className, caption, locale: _locale = "vi" }: { className?: string; caption?: string; locale?: Locale }) {
  const fallback = getDictionary().article.image;
  return <figure><div role="img" aria-label={caption ?? fallback} className={`relative overflow-hidden border border-ink bg-neutral-200 ${className ?? ""}`}><div className="halftone absolute inset-0" /></div>{caption && <figcaption className="mt-1 font-mono text-[11px] uppercase tracking-widest text-neutral-500">{caption}</figcaption>}</figure>;
}

export function ArticleCard({ bai, href, featured = false, locale: _locale = "vi" }: { bai: BaiViet; href: string; featured?: boolean; locale?: Locale }) {
  const category = getDictionary().category;
  return <article className="hard-shadow-hover group border border-ink bg-paper"><Link href={href} className="block p-5"><div className="mb-3 flex items-center gap-2"><Badge variant={bai.category === "thong-bao" ? "accent" : "outline"}>{category[bai.category as keyof typeof category] ?? bai.category}</Badge><span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">{formatDate(bai.date)}</span></div><h3 className={`font-serif font-bold text-ink group-hover:underline group-hover:decoration-accent group-hover:decoration-2 group-hover:underline-offset-4 ${featured ? "text-3xl lg:text-4xl" : "text-2xl"}`}>{bai.title}</h3><p className="mt-2 font-body text-sm leading-relaxed text-neutral-600">{bai.summary}</p><p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-neutral-500">{bai.author}</p></Link></article>;
}
