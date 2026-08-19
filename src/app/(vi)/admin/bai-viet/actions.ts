"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { Types } from "mongoose";
import { Article } from "@/models/article";
import { connectMongo } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth-guard";
import {
  articleIdSchema,
  articleInputSchema,
  formDataToArticleInput,
  updatedAtSchema,
} from "@/lib/article-schema";

export type ArticleActionState = {
  formError?: string;
  fieldErrors?: Record<string, string[]>;
};

function validationState(error: { issues: Array<{ path: PropertyKey[]; message: string }> }): ArticleActionState {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? "form");
    (fieldErrors[field] ??= []).push(issue.message);
  }
  return { fieldErrors };
}

function refreshArticles() {
  updateTag("articles");
  updateTag("articles:bai-viet");
  updateTag("articles:suy-niem");
  revalidatePath("/");
  revalidatePath("/tin-tuc");
  revalidatePath("/loi-chua");
  revalidatePath("/sitemap.xml");
}

export async function createArticle(
  _previous: ArticleActionState,
  formData: FormData,
): Promise<ArticleActionState> {
  await requireAdmin({ redirectToLogin: false });
  const parsed = articleInputSchema.safeParse(formDataToArticleInput(formData));
  if (!parsed.success) return validationState(parsed.error);

  try {
    await connectMongo();
    const article = await Article.create(parsed.data);
    refreshArticles();
    redirect(`/admin/bai-viet/${article._id.toString()}/sua`);
  } catch (error) {
    if (isDuplicateKey(error)) return { fieldErrors: { slug: ["Slug đã tồn tại trong nhóm này"] } };
    throw error;
  }
}

export async function updateArticle(
  _previous: ArticleActionState,
  formData: FormData,
): Promise<ArticleActionState> {
  await requireAdmin({ redirectToLogin: false });
  const id = articleIdSchema.safeParse(formData.get("id"));
  if (!id.success) return { formError: "ID bài viết không hợp lệ" };
  const parsed = articleInputSchema.safeParse(formDataToArticleInput(formData));
  if (!parsed.success) return validationState(parsed.error);

  const updatedAt = updatedAtSchema.safeParse(formData.get("updatedAt"));
  if (!updatedAt.success) return { formError: "Phiên chỉnh sửa không hợp lệ" };

  try {
    await connectMongo();
    const result = await Article.updateOne(
      { _id: id.data, updatedAt: new Date(updatedAt.data) },
      { $set: parsed.data },
    ).exec();
    if (result.matchedCount !== 1) return { formError: "Bài viết đã được thay đổi. Tải lại trước khi lưu." };
    refreshArticles();
    redirect(`/admin/bai-viet/${id.data}/sua`);
  } catch (error) {
    if (isDuplicateKey(error)) return { fieldErrors: { slug: ["Slug đã tồn tại trong nhóm này"] } };
    throw error;
  }
}

export async function deleteArticle(formData: FormData): Promise<void> {
  await requireAdmin({ redirectToLogin: false });
  const id = articleIdSchema.parse(formData.get("id"));
  await connectMongo();
  await Article.deleteOne({ _id: new Types.ObjectId(id) }).exec();
  refreshArticles();
  redirect("/admin/bai-viet");
}

function isDuplicateKey(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === 11000;
}
