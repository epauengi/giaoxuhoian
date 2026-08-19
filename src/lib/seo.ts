import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/routing";

const BASE = "https://giaoxuhoian.vn";
export const siteSeo = {
  name: "Giáo xứ Hội An",
  description: "Cổng thông tin chính thức của Giáo xứ Hội An: giờ lễ, Bí tích, tin tức, Lời Chúa và sinh hoạt cộng đoàn.",
} as const;

export function localizedMetadata(_locale: Locale, title: string, description: string = siteSeo.description, path = "/"): Metadata {
  const url = `${BASE}${localePath("vi", path)}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, locale: "vi_VN" },
  };
}

export function localizedPageMetadata(
  locale: Locale,
  title: string,
  description: string,
  path = "/",
): Metadata {
  return localizedMetadata(locale, title, description, path);
}
