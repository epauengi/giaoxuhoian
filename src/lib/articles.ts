import "server-only";

import { unstable_cache } from "next/cache";
import { Types } from "mongoose";
import { Article, type ArticleDocument } from "@/models/article";
import { connectMongo } from "@/lib/mongodb";
import type { ArticleKind, BaiViet } from "@/lib/article-types";

const publicFields = "kind status title slug category date author tags summary createdAt updatedAt";
const detailFields = `${publicFields} content`;

type StoredArticle = ArticleDocument & {
  _id: Types.ObjectId;
};

function toDto(article: StoredArticle & { content?: string }): BaiViet {
  return {
    id: article._id.toString(),
    kind: article.kind,
    status: article.status,
    title: article.title,
    slug: article.slug,
    category: article.category,
    date: article.date,
    author: article.author,
    tags: article.tags,
    summary: article.summary,
    content: article.content ?? "",
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
  };
}

async function queryPublishedArticles(kind: ArticleKind, category?: string): Promise<BaiViet[]> {
  await connectMongo();
  const filter = category
    ? { kind, status: "published" as const, category }
    : { kind, status: "published" as const };
  const articles = await Article.find(filter)
    .select(publicFields)
    .sort({ date: -1, _id: -1 })
    .lean()
    .exec();
  return (articles as unknown as StoredArticle[]).map(toDto);
}

export function getPublishedArticles(kind: ArticleKind, category?: string): Promise<BaiViet[]> {
  return unstable_cache(
    () => queryPublishedArticles(kind, category),
    ["articles", "published", kind, category ?? "all"],
    { tags: ["articles", `articles:${kind}`] },
  )();
}

async function queryPublishedArticleBySlug(kind: ArticleKind, slug: string): Promise<BaiViet | null> {
  await connectMongo();
  const article = await Article.findOne({ kind, status: "published", slug })
    .select(detailFields)
    .lean()
    .exec();
  return article ? toDto(article as unknown as StoredArticle) : null;
}

export function getPublishedArticleBySlug(
  kind: ArticleKind,
  slug: string,
): Promise<BaiViet | null> {
  return unstable_cache(
    () => queryPublishedArticleBySlug(kind, slug),
    ["article", "published", kind, slug],
    { tags: ["articles", `articles:${kind}`, `article:${kind}:${slug}`] },
  )();
}

export async function getPublishedSlugs(kind: ArticleKind): Promise<string[]> {
  const articles = await getPublishedArticles(kind);
  return articles.map((article) => article.slug);
}

export async function getAdminArticles(): Promise<BaiViet[]> {
  await connectMongo();
  const articles = await Article.find()
    .select(`${publicFields} content`)
    .sort({ date: -1, _id: -1 })
    .lean()
    .exec();
  return (articles as unknown as StoredArticle[]).map(toDto);
}

export async function getAdminArticleById(id: string): Promise<BaiViet | null> {
  if (!Types.ObjectId.isValid(id)) return null;
  await connectMongo();
  const article = await Article.findById(id).select(detailFields).lean().exec();
  return article ? toDto(article as unknown as StoredArticle) : null;
}

export type { ArticleKind, ArticleStatus, BaiViet } from "@/lib/article-types";
