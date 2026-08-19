import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/articles";
import { BI_TICH } from "@/lib/data/bi-tich";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const BASE = "https://giaoxuhoian.vn";
const STATIC_PATHS = ["/", "/giao-xu", "/giao-xu/lich-su", "/phung-vu", "/bi-tich", "/tin-tuc", "/loi-chua", "/cong-doan", "/thu-vien", "/dong-hanh", "/lien-he"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = STATIC_PATHS.map((path) => ({ url: `${BASE}${path}`, lastModified: new Date() }));
  const sacramentEntries = BI_TICH.map((bt) => ({ url: `${BASE}/bi-tich/${bt.slug}`, lastModified: new Date() }));
  const [news, reflections] = await Promise.all([
    getPublishedArticles("vi", "bai-viet"),
    getPublishedArticles("vi", "suy-niem"),
  ]);
  const articleEntries = [
    ...news.map((b) => ({ url: `${BASE}/tin-tuc/${b.slug}`, lastModified: new Date(b.updatedAt ?? `${b.date}T00:00:00Z`) })),
    ...reflections.map((b) => ({ url: `${BASE}/loi-chua/${b.slug}`, lastModified: new Date(b.updatedAt ?? `${b.date}T00:00:00Z`) })),
  ];
  return [...staticEntries, ...sacramentEntries, ...articleEntries];
}
