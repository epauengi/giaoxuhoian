import Link from "next/link";
import { requireAdmin } from "@/lib/auth-guard";
import { getAdminArticles } from "@/lib/articles";
import { CATEGORY_LABELS } from "@/lib/article-types";
import { ButtonLink } from "@/components/ui/button";

export default async function AdminArticlesPage() {
  await requireAdmin();
  const articles = await getAdminArticles();
  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">Nội dung</p>
          <h1 className="mt-1 font-serif text-4xl font-black">Bài viết</h1>
        </div>
        <ButtonLink href="/admin/bai-viet/moi">Tạo bài viết</ButtonLink>
      </div>
      <div className="mt-8 overflow-x-auto border border-ink">
        <table className="w-full border-collapse text-left">
          <thead className="bg-ink text-paper">
            <tr>
              <th className="p-3 font-sans text-xs uppercase tracking-widest">Tiêu đề</th>
              <th className="p-3 font-sans text-xs uppercase tracking-widest">Nhóm</th>
              <th className="p-3 font-sans text-xs uppercase tracking-widest">Trạng thái</th>
              <th className="p-3 font-sans text-xs uppercase tracking-widest">Ngày</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b border-muted last:border-0">
                <td className="p-3">
                  <Link href={`/admin/bai-viet/${article.id}/sua`} className="font-serif font-bold underline-offset-4 hover:underline">
                    {article.title}
                  </Link>
                  <p className="font-mono text-xs text-neutral-500">/{article.slug}</p>
                </td>
                <td className="p-3 text-sm">{CATEGORY_LABELS[article.category] ?? article.category}</td>
                <td className="p-3 text-sm">{article.status === "published" ? "Đã đăng" : "Bản nháp"}</td>
                <td className="p-3 font-mono text-sm">{article.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
