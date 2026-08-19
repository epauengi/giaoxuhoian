"use client";

import { deleteArticle } from "@/app/(vi)/admin/bai-viet/actions";
import { Button } from "@/components/ui/button";

export function DeleteArticleForm({ id, title }: { id: string; title: string }) {
  return (
    <form
      action={deleteArticle}
      onSubmit={(event) => {
        if (!window.confirm(`Xóa bài “${title}”? Không thể hoàn tác.`)) event.preventDefault();
      }}
      className="mt-12 border-t border-ink pt-6"
    >
      <input type="hidden" name="id" value={id} />
      <Button type="submit" variant="secondary">Xóa bài viết</Button>
    </form>
  );
}
