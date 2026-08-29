"use client";

import { useFormStatus } from "react-dom";
import { deleteArticle } from "@/app/admin/bai-viet/actions";
import { Button } from "@/components/ui/button";

export function DeleteArticleForm({ id, title }: { id: string; title: string }) {
  return (
    <section aria-labelledby="danger-zone" className="mt-10 border-t-2 border-ink pt-7">
      <h2 id="danger-zone" className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-accent">Khu vực nguy hiểm</h2>
      <p className="mt-2 max-w-lg font-body text-base leading-relaxed text-neutral-600">Xóa bài viết vĩnh viễn khỏi hệ thống. Thao tác này không thể hoàn tác.</p>
      <form
        action={deleteArticle}
        onSubmit={(event) => {
          if (!window.confirm(`Xóa bài “${title}”? Không thể hoàn tác.`)) event.preventDefault();
        }}
        className="mt-4"
      >
        <input type="hidden" name="id" value={id} />
        <DeleteButton />
      </form>
    </section>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" variant="secondary" disabled={pending} className="border-red-800 text-red-800 hover:bg-red-800 hover:text-paper">{pending ? "Đang xóa…" : "Xóa bài viết"}</Button>;
}
