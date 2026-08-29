import { CATEGORY_LABELS, type ArticleKind, type ArticleStatus, type BaiViet } from "@/lib/article-types";

export type AdminArticleFilters = {
  q?: string;
  status?: ArticleStatus;
  kind?: ArticleKind;
  category?: string;
};

export type AdminArticleSearchParams = Record<string, string | string[] | undefined>;

const ARTICLE_KINDS: ArticleKind[] = ["bai-viet", "suy-niem"];
const ARTICLE_STATUSES: ArticleStatus[] = ["draft", "published"];

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("vi-VN")
    .trim();
}

export function parseAdminArticleFilters(params: AdminArticleSearchParams): AdminArticleFilters {
  const q = first(params.q)?.trim();
  const status = first(params.status);
  const kind = first(params.kind);
  const category = first(params.category);

  return {
    ...(q ? { q } : {}),
    ...(status && ARTICLE_STATUSES.includes(status as ArticleStatus) ? { status: status as ArticleStatus } : {}),
    ...(kind && ARTICLE_KINDS.includes(kind as ArticleKind) ? { kind: kind as ArticleKind } : {}),
    ...(category && CATEGORY_LABELS[category] ? { category } : {}),
  };
}

export function filterAdminArticles(articles: BaiViet[], filters: AdminArticleFilters): BaiViet[] {
  const query = filters.q ? normalize(filters.q) : "";

  return articles.filter((article) => {
    if (filters.status && article.status !== filters.status) return false;
    if (filters.kind && article.kind !== filters.kind) return false;
    if (filters.category && article.category !== filters.category) return false;
    if (!query) return true;

    const searchable = normalize([
      article.title,
      article.slug,
      article.author,
      article.category,
      CATEGORY_LABELS[article.category] ?? "",
      ...article.tags,
    ].join(" "));

    return searchable.includes(query);
  });
}
