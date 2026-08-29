import assert from "node:assert/strict";
import { filterAdminArticles, parseAdminArticleFilters } from "../src/lib/admin-article-filter";
import type { BaiViet } from "../src/lib/article-types";

const article = (overrides: Partial<BaiViet> = {}): BaiViet => ({
  locale: "vi",
  kind: "bai-viet",
  status: "published",
  title: "Lịch giờ lễ Chúa nhật",
  slug: "lich-gio-le-chua-nhat",
  category: "thong-bao",
  date: "2026-08-29",
  author: "Ban Truyền thông",
  tags: ["phụng vụ", "giờ lễ"],
  summary: "Thông tin giờ lễ.",
  content: "",
  ...overrides,
});

const articles = [
  article(),
  article({ id: "2", kind: "suy-niem", status: "draft", title: "Suy niệm Chúa nhật", slug: "suy-niem-chua-nhat", category: "suy-niem-chua-nhat", tags: ["mùa vọng"] }),
];

assert.equal(filterAdminArticles(articles, { q: "GIO LE" }).length, 1);
assert.equal(filterAdminArticles(articles, { status: "draft" }).length, 1);
assert.equal(filterAdminArticles(articles, { kind: "suy-niem", category: "suy-niem-chua-nhat" }).length, 1);
assert.deepEqual(parseAdminArticleFilters({ status: "invalid", q: "  tin  " }), { q: "tin" });
console.log("Admin article filter checks passed");
