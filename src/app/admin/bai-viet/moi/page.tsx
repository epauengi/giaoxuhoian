import Link from "next/link";
import { requireAdmin } from "@/lib/auth-guard";
import { ArticleForm } from "@/components/admin/article-form";
import { createArticle } from "@/app/admin/bai-viet/actions";

export default async function NewArticlePage() {
  await requireAdmin();
  return (
    <main className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <header className="border-b-2 border-ink pb-7">
        <nav aria-label="Breadcrumb" className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
          <Link href="/admin" className="hover:text-accent">Quản trị</Link><span aria-hidden> / </span>
          <Link href="/admin/bai-viet" className="hover:text-accent">Bài viết</Link><span aria-hidden> / </span>
          <span className="text-ink">Tạo mới</span>
        </nav>
        <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-accent">Nội dung mới</p>
        <h1 className="mt-2 font-serif text-4xl font-black tracking-tight sm:text-5xl">Tạo bài viết</h1>
        <p className="mt-3 max-w-xl font-body text-lg leading-relaxed text-neutral-600">Chuẩn bị nội dung, chọn trạng thái, rồi lưu bản nháp hoặc đăng ngay.</p>
      </header>
      <div className="mt-8"><ArticleForm action={createArticle} /></div>
    </main>
  );
}
