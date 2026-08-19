import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/articles";
import { BI_TICH } from "@/lib/data/bi-tich";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BASE = "https://giaoxuhoian.vn";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "",
    "/giao-xu",
    "/giao-xu/lich-su",
    "/phung-vu",
    "/bi-tich",
    "/tin-tuc",
    "/loi-chua",
    "/cong-doan",
    "/thu-vien",
    "/dong-hanh",
    "/lien-he",
    "/en",
  ];

  return [
    ...staticPages.map((path) => ({ url: `${BASE}${path}`, lastModified: new Date() })),
    ...BI_TICH.map((bt) => ({ url: `${BASE}/bi-tich/${bt.slug}`, lastModified: new Date() })),
    ...(await getPublishedArticles("bai-viet")).map((b) => ({
      url: `${BASE}/tin-tuc/${b.slug}`,
      lastModified: new Date(b.updatedAt ?? `${b.date}T00:00:00Z`),
    })),
    ...(await getPublishedArticles("suy-niem")).map((b) => ({
      url: `${BASE}/loi-chua/${b.slug}`,
      lastModified: new Date(b.updatedAt ?? `${b.date}T00:00:00Z`),
    })),
  ];
}
