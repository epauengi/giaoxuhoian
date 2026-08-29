import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth-guard";
import { getAdminArticleById } from "@/lib/articles";
import { ArticleForm } from "@/components/admin/article-form";
import { updateArticle } from "@/app/admin/bai-viet/actions";
import { DeleteArticleForm } from "@/components/admin/delete-article-form";
import { Badge } from "@/components/ui/badge";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const article = await getAdminArticleById(id);
  if (!article) notFound();
  return (
    <main className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <header className="border-b-2 border-ink pb-7">
        <nav aria-label="Breadcrumb" className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
          <Link href="/admin" className="hover:text-accent">Quản trị</Link><span aria-hidden> / </span>
          <Link href="/admin/bai-viet" className="hover:text-accent">Bài viết</Link><span aria-hidden> / </span>
          <span className="text-ink">Chỉnh sửa</span>
        </nav>
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-accent">Chỉnh sửa bài viết</p>
          <Badge variant={article.status === "published" ? "solid" : "outline"}>{article.status === "published" ? "Đã đăng" : "Bản nháp"}</Badge>
        </div>
        <h1 className="mt-2 max-w-4xl break-words font-serif text-4xl font-black tracking-tight sm:text-5xl">{article.title}</h1>
        <p className="mt-3 break-all font-mono text-xs text-neutral-500">/{article.slug}</p>
      </header>
      <div className="mt-8"><ArticleForm article={article} action={updateArticle} /></div>
      <DeleteArticleForm id={article.id!} title={article.title} />
    </main>
  );
}
