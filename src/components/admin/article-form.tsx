"use client";

import { useActionState } from "react";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { BaiViet } from "@/lib/article-types";
import type { ArticleActionState } from "@/app/(vi)/admin/bai-viet/actions";

const initialState: ArticleActionState = {};

export function ArticleForm({
  article,
  action,
}: {
  article?: BaiViet;
  action: (
    previous: ArticleActionState,
    formData: FormData,
  ) => Promise<ArticleActionState>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  return (
    <form action={formAction} className="space-y-5">
      {article?.id && <input type="hidden" name="id" value={article.id} />}
      {article?.updatedAt && <input type="hidden" name="updatedAt" value={article.updatedAt} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nhóm" required>
          <Select name="kind" defaultValue={article?.kind ?? "bai-viet"} required>
            <option value="bai-viet">Bài viết</option>
            <option value="suy-niem">Suy niệm</option>
          </Select>
        </Field>
        <Field label="Trạng thái" required>
          <Select name="status" defaultValue={article?.status ?? "draft"} required>
            <option value="draft">Bản nháp</option>
            <option value="published">Đã đăng</option>
          </Select>
        </Field>
      </div>
      <Field label="Tiêu đề" required>
        <Input name="title" defaultValue={article?.title} maxLength={200} required />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Slug" required>
          <Input name="slug" defaultValue={article?.slug} maxLength={120} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" required />
        </Field>
        <Field label="Ngày" required>
          <Input name="date" type="date" defaultValue={article?.date} required />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Chuyên mục" required>
          <Input name="category" defaultValue={article?.category} maxLength={80} required />
        </Field>
        <Field label="Tác giả" required>
          <Input name="author" defaultValue={article?.author} maxLength={120} required />
        </Field>
      </div>
      <Field label="Thẻ (phân tách bằng dấu phẩy)">
        <Input name="tags" defaultValue={article?.tags.join(", ")} maxLength={500} />
      </Field>
      <Field label="Tóm tắt" required>
        <Textarea name="summary" defaultValue={article?.summary} maxLength={500} required />
      </Field>
      <Field label="Nội dung Markdown" required>
        <Textarea name="content" defaultValue={article?.content} maxLength={500000} className="min-h-96" required />
      </Field>
      {state.formError && <p role="alert" className="text-sm text-red-700">{state.formError}</p>}
      {state.fieldErrors && (
        <ul role="alert" className="space-y-1 text-sm text-red-700">
          {Object.entries(state.fieldErrors).flatMap(([field, errors]) =>
            errors.map((error) => <li key={`${field}-${error}`}>{field}: {error}</li>),
          )}
        </ul>
      )}
      <Button type="submit" disabled={pending}>{pending ? "Đang lưu…" : "Lưu bài viết"}</Button>
    </form>
  );
}
