"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Edit3, ExternalLink, FileText, Search, SlidersHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input, Select } from "@/components/ui/input";
import { CATEGORY_LABELS, type BaiViet } from "@/lib/article-types";
import { filterAdminArticles, type AdminArticleFilters } from "@/lib/admin-article-filter";
import { cn } from "@/lib/utils";

const kindLabels = { "bai-viet": "Bài viết", "suy-niem": "Suy niệm" } as const;
const statusLabels = { published: "Đã đăng", draft: "Bản nháp" } as const;
const categoryByKind = {
  "bai-viet": ["thong-bao", "sinh-hoat", "giao-hoi", "cao-pho", "rao-hon-phoi"],
  "suy-niem": ["suy-niem", "suy-niem-hang-ngay", "suy-niem-chua-nhat"],
} as const;

function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

export function AdminArticleList({ articles, initialFilters = {} }: { articles: BaiViet[]; initialFilters?: AdminArticleFilters }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<AdminArticleFilters>(initialFilters);
  const filteredArticles = useMemo(() => filterAdminArticles(articles, filters), [articles, filters]);
  const hasFilters = Boolean(filters.q || filters.status || filters.kind || filters.category);

  const navigateWithFilters = (next: AdminArticleFilters) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const key of ["q", "status", "kind", "category"] as const) {
      const value = next[key];
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const setFilter = (key: keyof AdminArticleFilters, value: string) => {
    const next = { ...filters };
    if (value) next[key] = value as never;
    else delete next[key];
    if (key === "kind" && next.category && !categoryByKind[value as keyof typeof categoryByKind]?.includes(next.category as never)) delete next.category;
    setFilters(next);
    navigateWithFilters(next);
  };
  const clearFilters = () => {
    setFilters({});
    navigateWithFilters({});
  };

  return (
    <section aria-label="Danh sách bài viết" className="mt-8">
      <div className="border-2 border-ink bg-paper p-4 sm:p-5">
        <div className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.14em] text-neutral-600">
          <SlidersHorizontal aria-hidden size={15} />
          <span>Lọc nội dung</span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_repeat(3,minmax(0,12rem))]">
          <label className="relative block">
            <span className="sr-only">Tìm bài viết</span>
            <Search aria-hidden size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <Input value={filters.q ?? ""} onChange={(event) => setFilter("q", event.target.value)} placeholder="Tìm theo tiêu đề, tác giả, đường dẫn…" className="border border-ink bg-neutral-100 pl-10" />
          </label>
          <label>
            <span className="sr-only">Trạng thái</span>
            <Select value={filters.status ?? ""} onChange={(event) => setFilter("status", event.target.value)} className="border border-ink bg-neutral-100">
              <option value="">Mọi trạng thái</option>
              <option value="published">Đã đăng</option>
              <option value="draft">Bản nháp</option>
            </Select>
          </label>
          <label>
            <span className="sr-only">Nhóm nội dung</span>
            <Select value={filters.kind ?? ""} onChange={(event) => setFilter("kind", event.target.value)} className="border border-ink bg-neutral-100">
              <option value="">Mọi nhóm</option>
              <option value="bai-viet">Bài viết</option>
              <option value="suy-niem">Suy niệm</option>
            </Select>
          </label>
          <label>
            <span className="sr-only">Chuyên mục</span>
            <Select value={filters.category ?? ""} onChange={(event) => setFilter("category", event.target.value)} className="border border-ink bg-neutral-100">
              <option value="">Mọi chuyên mục</option>
              {Object.entries(CATEGORY_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </Select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-muted pt-3">
          <p aria-live="polite" className="font-mono text-xs text-neutral-600">
            Hiển thị <strong className="text-ink">{filteredArticles.length}</strong>/{articles.length} bài viết
          </p>
          {hasFilters && (
            <button type="button" onClick={clearFilters} className="inline-flex min-h-11 items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
              <X aria-hidden size={14} /> Xóa bộ lọc
            </button>
          )}
        </div>
      </div>

      {filteredArticles.length ? (
        <>
          <div className="mt-5 hidden overflow-x-auto border-2 border-ink lg:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Các bài viết trong hệ thống</caption>
              <thead className="bg-ink text-paper">
                <tr>
                  <th scope="col" className="p-4 font-sans text-[0.68rem] uppercase tracking-widest">Tiêu đề</th>
                  <th scope="col" className="p-4 font-sans text-[0.68rem] uppercase tracking-widest">Nhóm</th>
                  <th scope="col" className="p-4 font-sans text-[0.68rem] uppercase tracking-widest">Trạng thái</th>
                  <th scope="col" className="p-4 font-sans text-[0.68rem] uppercase tracking-widest">Ngày đăng</th>
                  <th scope="col" className="p-4 text-right font-sans text-[0.68rem] uppercase tracking-widest">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map((article) => <DesktopArticleRow key={article.id} article={article} />)}
              </tbody>
            </table>
          </div>
          <div className="mt-5 space-y-3 lg:hidden">
            {filteredArticles.map((article) => <MobileArticleCard key={article.id} article={article} />)}
          </div>
        </>
      ) : (
        <div className="mt-5 border-2 border-dashed border-ink p-8 text-center sm:p-12">
          <FileText aria-hidden className="mx-auto text-neutral-500" size={28} strokeWidth={1.5} />
          <h2 className="mt-4 font-serif text-2xl font-bold">Không tìm thấy bài viết</h2>
          <p className="mx-auto mt-2 max-w-md font-body text-base leading-relaxed text-neutral-600">Thử từ khóa khác hoặc xóa bộ lọc để xem toàn bộ nội dung.</p>
          <button type="button" onClick={clearFilters} className="mt-5 min-h-11 border border-ink px-5 font-sans text-xs font-bold uppercase tracking-widest transition-colors duration-200 hover:bg-ink hover:text-paper">Xóa bộ lọc</button>
        </div>
      )}
    </section>
  );
}

function StatusBadge({ article }: { article: BaiViet }) {
  return <Badge variant={article.status === "published" ? "solid" : "outline"}><span className={cn("mr-1.5 inline-block h-1.5 w-1.5", article.status === "published" ? "bg-accent" : "bg-neutral-400")} aria-hidden />{statusLabels[article.status]}</Badge>;
}

function DesktopArticleRow({ article }: { article: BaiViet }) {
  return (
    <tr className="border-b border-muted align-top last:border-0 hover:bg-neutral-100">
      <td className="max-w-md p-4">
        <Link href={`/admin/bai-viet/${article.id}/sua`} className="font-serif text-lg font-bold leading-tight underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">{article.title}</Link>
        <p className="mt-1 break-all font-mono text-xs text-neutral-500" aria-label={`Đường dẫn: ${article.slug}`}>/{article.slug}</p>
        <p className="mt-2 font-sans text-xs text-neutral-600">{CATEGORY_LABELS[article.category] ?? article.category}</p>
      </td>
      <td className="p-4 font-sans text-sm">{kindLabels[article.kind]}</td>
      <td className="p-4"><StatusBadge article={article} /></td>
      <td className="p-4 font-mono text-sm tabular-nums text-neutral-600">{formatArticleDate(article.date)}</td>
      <td className="p-4"><ArticleActions article={article} align="right" /></td>
    </tr>
  );
}

function MobileArticleCard({ article }: { article: BaiViet }) {
  return (
    <article className="border-2 border-ink p-4 transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-neutral-100 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2"><StatusBadge article={article} /><time dateTime={article.date} className="font-mono text-xs text-neutral-600">{formatArticleDate(article.date)}</time></div>
      <Link href={`/admin/bai-viet/${article.id}/sua`} className="mt-3 block font-serif text-xl font-bold leading-tight underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">{article.title}</Link>
      <p className="mt-1 break-all font-mono text-xs text-neutral-500" aria-label={`Đường dẫn: ${article.slug}`}>/{article.slug}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-muted pt-3"><p className="font-sans text-xs text-neutral-600">{kindLabels[article.kind]} · {CATEGORY_LABELS[article.category] ?? article.category}</p><ArticleActions article={article} /></div>
    </article>
  );
}

function ArticleActions({ article, align = "left" }: { article: BaiViet; align?: "left" | "right" }) {
  const previewPath = article.kind === "bai-viet" ? `/tin-tuc/${article.slug}` : `/loi-chua/${article.slug}`;
  return <div className={cn("flex flex-wrap gap-2", align === "right" && "justify-end")}>
    <Link href={`/admin/bai-viet/${article.id}/sua`} className="inline-flex min-h-11 items-center gap-2 border border-ink px-3 font-sans text-xs font-bold uppercase tracking-wider transition-colors duration-200 hover:bg-ink hover:text-paper"><Edit3 aria-hidden size={14} /> Sửa</Link>
    {article.status === "published" && <Link href={previewPath} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 border border-transparent px-2 font-sans text-xs font-bold uppercase tracking-wider text-neutral-600 underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"><ExternalLink aria-hidden size={14} /> Xem</Link>}
  </div>;
}
