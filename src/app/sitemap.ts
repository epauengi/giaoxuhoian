import type { MetadataRoute } from "next";
import { getBaiViet, getSuyNiem } from "@/lib/content";
import { BI_TICH } from "@/lib/data/bi-tich";

const BASE = "https://giaoxuhoian.vn";

export default function sitemap(): MetadataRoute.Sitemap {
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
    ...getBaiViet().map((b) => ({ url: `${BASE}/tin-tuc/${b.slug}`, lastModified: new Date(b.date) })),
    ...getSuyNiem().map((b) => ({ url: `${BASE}/loi-chua/${b.slug}`, lastModified: new Date(b.date) })),
  ];
}
