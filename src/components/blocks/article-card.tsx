import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { BaiViet } from "@/lib/article-types";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { formatDate } from "@/lib/article-types";

export function ArticleCard({ bai, href, featured = false }: { bai: BaiViet; href: string; featured?: boolean; locale?: Locale }) {
  const category = getDictionary().category;
  return (
    <article className="hard-shadow-hover group border border-ink bg-paper">
      <Link href={href} className="block p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant={bai.category === "thong-bao" ? "accent" : "outline"}>
            {category[bai.category as keyof typeof category] ?? bai.category}
          </Badge>
          <span className="font-mono text-xs uppercase tracking-wider text-neutral-600">
            {formatDate(bai.date)}
          </span>
        </div>
        <h3 className={`font-serif font-bold text-ink group-hover:underline group-focus-within:underline group-hover:decoration-accent group-focus-within:decoration-accent group-hover:decoration-2 group-focus-within:decoration-2 group-hover:underline-offset-4 group-focus-within:underline-offset-4 ${featured ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl"}`}>
          {bai.title}
        </h3>
        <p className="mt-2.5 font-body text-base leading-relaxed text-neutral-700">
          {bai.summary}
        </p>
        <p className="mt-3 font-mono text-xs uppercase tracking-wider text-neutral-600">
          {bai.author}
        </p>
      </Link>
    </article>
  );
}
