import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth-guard";
import { getAdminArticleById } from "@/lib/articles";
import { ArticleForm } from "@/components/admin/article-form";
import { updateArticle } from "@/app/admin/bai-viet/actions";
import { DeleteArticleForm } from "@/components/admin/delete-article-form";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const article = await getAdminArticleById(id);
  if (!article) notFound();
  return (
    <>
      <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">Chỉnh sửa</p>
      <h1 className="mt-1 font-serif text-4xl font-black">{article.title}</h1>
      <div className="mt-8 max-w-3xl"><ArticleForm article={article} action={updateArticle} /></div>
      <DeleteArticleForm id={article.id!} title={article.title} />
    </>
  );
}
