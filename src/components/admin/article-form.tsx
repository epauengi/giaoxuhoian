"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import Link from "next/link";
import { useActionState } from "react";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ArticleKind, ArticleStatus, BaiViet } from "@/lib/article-types";
import { CATEGORY_LABELS } from "@/lib/article-types";
import { slugifyArticleTitle } from "@/lib/article-slug";
import type { ArticleActionState } from "@/app/admin/bai-viet/actions";

const initialState: ArticleActionState = {};
const SLUG_MODES = ["suggested", "current", "custom"] as const;
type SlugMode = (typeof SLUG_MODES)[number];

const categoryByKind: Record<ArticleKind, readonly string[]> = {
  "bai-viet": ["thong-bao", "sinh-hoat", "giao-hoi", "cao-pho", "rao-hon-phoi"],
  "suy-niem": ["suy-niem", "suy-niem-hang-ngay", "suy-niem-chua-nhat"],
};

const fieldLabels: Record<string, string> = {
  kind: "Nhóm",
  status: "Trạng thái",
  title: "Tiêu đề",
  slug: "Đường dẫn bài viết",
  date: "Ngày",
  category: "Chuyên mục",
  author: "Tác giả",
  tags: "Thẻ",
  summary: "Tóm tắt",
  content: "Nội dung Markdown",
};

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
  const [kind, setKind] = useState<ArticleKind>(article?.kind ?? "bai-viet");
  const [status, setStatus] = useState<ArticleStatus>(article?.status ?? "draft");
  const [category, setCategory] = useState(article?.category ?? categoryByKind["bai-viet"][0]);
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugMode, setSlugMode] = useState<SlugMode>(article?.slug ? "current" : "suggested");
  const summaryRef = useRef<HTMLDivElement>(null);
  const slugEditRef = useRef<HTMLInputElement>(null);
  const fieldErrors = state.fieldErrors ?? {};
  const hasErrors = Boolean(state.formError || Object.keys(fieldErrors).length);
  const categories = categoryByKind[kind];
  const suggestedSlug = slugifyArticleTitle(title);
  const submittedSlug = slugMode === "suggested" ? suggestedSlug : slug;
  const isCustomSlug = slugMode === "custom";

  useEffect(() => {
    if (hasErrors) summaryRef.current?.focus();
  }, [hasErrors, state]);

  const errorFor = (field: string) => fieldErrors[field]?.[0];
  const describedBy = (id: string, field: string, hasHint = false) => {
    const ids = [];
    if (hasHint) ids.push(`${id}-hint`);
    if (errorFor(field)) ids.push(`${id}-error`);
    return ids.length ? ids.join(" ") : undefined;
  };

  const updateTitle = (nextTitle: string) => {
    setTitle(nextTitle);
    if (slugMode === "suggested") setSlug(slugifyArticleTitle(nextTitle));
  };

  const changeSlugMode = (nextMode: SlugMode) => {
    setSlugMode(nextMode);
    if (nextMode === "suggested") setSlug(suggestedSlug);
    if (nextMode === "current") setSlug(article?.slug ?? suggestedSlug);
    if (nextMode === "custom") requestAnimationFrame(() => slugEditRef.current?.focus());
  };

  const selectSlugMode = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextMode = event.target.value;
    if (SLUG_MODES.includes(nextMode as SlugMode)) changeSlugMode(nextMode as SlugMode);
  };

  const updateSlug = (nextSlug: string) => {
    setSlug(nextSlug);
    if (slugMode !== "custom") setSlugMode("custom");
  };

  const changeKind = (nextKind: ArticleKind) => {
    setKind(nextKind);
    if (!categoryByKind[nextKind].includes(category)) setCategory(categoryByKind[nextKind][0]);
  };

  return (
    <form action={formAction} aria-busy={pending} className="space-y-6">
      {article?.id && <input type="hidden" name="id" value={article.id} />}
      {article?.updatedAt && <input type="hidden" name="updatedAt" value={article.updatedAt} />}

      {hasErrors && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="border-2 border-accent bg-red-50 p-4 outline-none sm:p-5">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-red-800">Chưa thể lưu bài viết</p>
          <p className="mt-1 font-body text-sm text-red-900">Kiểm tra các mục được đánh dấu rồi thử lại.</p>
          {state.formError && <p className="mt-2 font-sans text-sm font-semibold text-red-900">{state.formError}</p>}
          {Object.keys(fieldErrors).length > 0 && (
            <ul className="mt-3 space-y-1 font-sans text-sm text-red-900">
              {Object.entries(fieldErrors).flatMap(([field, errors]) => errors.map((error, index) => (
                <li key={`${field}-${index}`}><a href={`#article-${field}`} className="underline underline-offset-2 hover:text-accent">{fieldLabels[field] ?? field}: {error}</a></li>
              )))}
            </ul>
          )}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.75fr)] lg:items-start">
        <fieldset className="border-2 border-ink bg-paper p-5 sm:p-7">
          <legend className="bg-paper px-2 font-serif text-2xl font-bold">Nội dung</legend>
          <div className="space-y-6">
            <Field label="Tiêu đề" required>
              <Input id="article-title" name="title" value={title} onChange={(event) => updateTitle(event.target.value)} maxLength={200} required aria-invalid={Boolean(errorFor("title"))} aria-describedby={describedBy("article-title", "title")} />
              <FieldError field="title" error={errorFor("title")} />
            </Field>
            <Field label="Tóm tắt" required>
              <Textarea id="article-summary" name="summary" defaultValue={article?.summary} maxLength={500} required aria-invalid={Boolean(errorFor("summary"))} aria-describedby={describedBy("article-summary", "summary", true)} />
              <p id="article-summary-hint" className="mt-2 font-sans text-xs leading-relaxed text-neutral-500">Một đoạn ngắn giúp người đọc biết bài viết nói về điều gì.</p>
              <FieldError field="summary" error={errorFor("summary")} />
            </Field>
            <Field label="Nội dung Markdown" required>
              <Textarea id="article-content" name="content" defaultValue={article?.content} maxLength={500000} className="min-h-[24rem] resize-y leading-relaxed" required aria-invalid={Boolean(errorFor("content"))} aria-describedby={describedBy("article-content", "content", true)} />
              <p id="article-content-hint" className="mt-2 font-sans text-xs leading-relaxed text-neutral-500">Dùng Markdown cơ bản. Không hỗ trợ HTML, JSX, import hoặc biểu thức JavaScript.</p>
              <FieldError field="content" error={errorFor("content")} />
            </Field>
          </div>
        </fieldset>

        <fieldset className="border-2 border-ink bg-neutral-100 p-5 sm:p-7 lg:sticky lg:top-6">
          <legend className="bg-neutral-100 px-2 font-serif text-2xl font-bold">Thông tin đăng</legend>
          <div className="space-y-5">
            <Field label="Nhóm" required>
              <Select id="article-kind" name="kind" value={kind} onChange={(event) => changeKind(event.target.value as ArticleKind)} required aria-invalid={Boolean(errorFor("kind"))} aria-describedby={describedBy("article-kind", "kind")}>
                <option value="bai-viet">Bài viết</option>
                <option value="suy-niem">Suy niệm</option>
              </Select>
              <FieldError field="kind" error={errorFor("kind")} />
            </Field>
            <Field label="Chuyên mục" required>
              <Select id="article-category" name="category" value={category} onChange={(event) => setCategory(event.target.value)} required aria-invalid={Boolean(errorFor("category"))} aria-describedby={describedBy("article-category", "category")}>
                {categories.map((value) => <option key={value} value={value}>{CATEGORY_LABELS[value] ?? value}</option>)}
              </Select>
              <FieldError field="category" error={errorFor("category")} />
            </Field>
            <Field label="Trạng thái" required>
              <Select id="article-status" name="status" value={status} onChange={(event) => setStatus(event.target.value as ArticleStatus)} required aria-invalid={Boolean(errorFor("status"))} aria-describedby={describedBy("article-status", "status")}>
                <option value="draft">Bản nháp</option>
                <option value="published">Đã đăng</option>
              </Select>
              <FieldError field="status" error={errorFor("status")} />
            </Field>
            <Field label="Ngày" required>
              <Input id="article-date" name="date" type="date" defaultValue={article?.date} required aria-invalid={Boolean(errorFor("date"))} aria-describedby={describedBy("article-date", "date")} />
              <FieldError field="date" error={errorFor("date")} />
            </Field>
            <Field label="Tác giả" required>
              <Input id="article-author" name="author" defaultValue={article?.author} maxLength={120} required aria-invalid={Boolean(errorFor("author"))} aria-describedby={describedBy("article-author", "author")} />
              <FieldError field="author" error={errorFor("author")} />
            </Field>

            <div>
              <label htmlFor="article-slug-mode" className="mb-1 block font-sans text-xs font-semibold uppercase tracking-widest text-neutral-600">
                Đường dẫn bài viết <span className="text-accent">*</span>
              </label>
              <Select id="article-slug" value={slugMode} onChange={selectSlugMode} aria-invalid={Boolean(errorFor("slug"))} aria-describedby={describedBy("article-slug", "slug", true)}>
                {article?.slug && <option value="current">Giữ đường dẫn hiện tại</option>}
                <option value="suggested">Tạo từ tiêu đề</option>
                <option value="custom">Tự nhập đường dẫn</option>
              </Select>
              {!isCustomSlug && <input type="hidden" name="slug" value={submittedSlug} />}
              {isCustomSlug && (
                <Input ref={slugEditRef} id="article-custom-slug" name="slug" value={slug} onChange={(event) => updateSlug(event.target.value)} maxLength={120} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" required aria-invalid={Boolean(errorFor("slug"))} aria-describedby={describedBy("article-custom-slug", "slug", true)} className="mt-3" />
              )}
              <p id="article-slug-hint" className="mt-2 break-words font-sans text-xs leading-relaxed text-neutral-500">{article?.status === "published" ? "Đổi đường dẫn bài đã đăng có thể làm hỏng liên kết cũ." : "Đường dẫn được tạo từ tiêu đề, giúp người đọc nhận ra địa chỉ bài viết."}</p>
              <p aria-live="polite" className="mt-2 break-all font-mono text-xs text-neutral-600">Xem trước: {submittedSlug ? `/${submittedSlug}` : "chưa có đường dẫn"}</p>
              <FieldError field="slug" error={errorFor("slug")} />
            </div>

            <Field label="Thẻ (phân tách bằng dấu phẩy)">
              <Input id="article-tags" name="tags" defaultValue={article?.tags.join(", ")} maxLength={500} aria-invalid={Boolean(errorFor("tags"))} aria-describedby={describedBy("article-tags", "tags", true)} />
              <p id="article-tags-hint" className="mt-2 font-sans text-xs leading-relaxed text-neutral-500">Tối đa 12 thẻ, giúp tìm lại nội dung.</p>
              <FieldError field="tags" error={errorFor("tags")} />
            </Field>
          </div>
        </fieldset>
      </div>

      <div className="sticky bottom-0 z-10 -mx-4 border-t-2 border-ink bg-paper/95 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-3">
          <Link href="/admin/bai-viet" className="inline-flex min-h-11 items-center px-1 font-sans text-xs font-bold uppercase tracking-widest text-neutral-600 underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">Quay lại danh sách</Link>
          <Button type="submit" disabled={pending}>{pending ? "Đang lưu…" : status === "published" ? "Lưu và đăng" : "Lưu bản nháp"}</Button>
        </div>
      </div>
    </form>
  );
}

function FieldError({ field, error }: { field: string; error?: string }) {
  if (!error) return null;
  return <p id={`article-${field}-error`} className="mt-2 font-sans text-sm font-medium text-red-800">{error}</p>;
}
