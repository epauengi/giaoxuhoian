import { requireAdmin } from "@/lib/auth-guard";
import { ArticleForm } from "@/components/admin/article-form";
import { createArticle } from "@/app/admin/bai-viet/actions";

export default async function NewArticlePage() {
  await requireAdmin();
  return (
    <>
      <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">Nội dung mới</p>
      <h1 className="mt-1 font-serif text-4xl font-black">Tạo bài viết</h1>
      <div className="mt-8 max-w-3xl"><ArticleForm action={createArticle} /></div>
    </>
  );
}
