import Link from "next/link";
import { requireAdmin } from "@/lib/auth-guard";
import { getAdminArticles } from "@/lib/articles";
import { parseAdminArticleFilters, type AdminArticleSearchParams } from "@/lib/admin-article-filter";
import { ButtonLink } from "@/components/ui/button";
import { AdminArticleList } from "@/components/admin/admin-article-list";

export default async function AdminArticlesPage({ searchParams }: { searchParams: Promise<AdminArticleSearchParams> }) {
  await requireAdmin();
  const [articles, params] = await Promise.all([getAdminArticles(), searchParams]);
  const filters = parseAdminArticleFilters(params);
  const publishedCount = articles.filter((article) => article.status === "published").length;
  const draftCount = articles.length - publishedCount;

  return (
    <main className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <header className="flex flex-col gap-6 border-b-2 border-ink pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <nav aria-label="Breadcrumb" className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
            <Link href="/admin" className="hover:text-accent">Quản trị</Link><span aria-hidden> / </span><span className="text-ink">Bài viết</span>
          </nav>
          <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-accent">Trạm biên tập</p>
          <h1 className="mt-2 font-serif text-4xl font-black tracking-tight sm:text-5xl">Bài viết</h1>
          <p className="mt-3 max-w-xl font-body text-lg leading-relaxed text-neutral-600">Soạn, rà soát và xuất bản nội dung trên website giáo xứ.</p>
        </div>
        <ButtonLink href="/admin/bai-viet/moi" className="shrink-0">Tạo bài viết</ButtonLink>
      </header>

      <dl className="grid grid-cols-3 divide-x divide-ink border-b-2 border-ink bg-neutral-100">
        <div className="p-4 sm:p-5"><dt className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.14em] text-neutral-600">Tổng bài</dt><dd className="mt-1 font-mono text-2xl font-medium tabular-nums sm:text-3xl">{articles.length}</dd></div>
        <div className="p-4 sm:p-5"><dt className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.14em] text-neutral-600">Đã đăng</dt><dd className="mt-1 flex items-center gap-2 font-mono text-2xl font-medium tabular-nums sm:text-3xl"><span aria-hidden className="h-2 w-2 bg-accent" />{publishedCount}</dd></div>
        <div className="p-4 sm:p-5"><dt className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.14em] text-neutral-600">Bản nháp</dt><dd className="mt-1 font-mono text-2xl font-medium tabular-nums sm:text-3xl">{draftCount}</dd></div>
      </dl>

      <AdminArticleList articles={articles} initialFilters={filters} />
    </main>
  );
}
