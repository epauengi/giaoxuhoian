import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BaiViet {
  title: string;
  slug: string;
  category: string;
  date: string; // ISO
  author: string;
  tags: string[];
  summary: string;
  content: string;
}

export const CATEGORY_LABELS: Record<string, string> = {
  "thong-bao": "Thông báo",
  "sinh-hoat": "Sinh hoạt",
  "giao-hoi": "Giáo hội",
  "suy-niem": "Suy niệm",
  "suy-niem-hang-ngay": "Suy niệm hằng ngày",
  "suy-niem-chua-nhat": "Suy niệm Chúa nhật",
  "cao-pho": "Cáo phó",
  "rao-hon-phoi": "Rao hôn phối",
};

const CONTENT_DIR = path.join(process.cwd(), "content");

function readDir(dir: string): BaiViet[] {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(full, f), "utf8"));
      return { ...(data as Omit<BaiViet, "content">), content };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getBaiViet(): BaiViet[] {
  return readDir("bai-viet");
}

export function getBaiVietBySlug(slug: string): BaiViet | undefined {
  return getBaiViet().find((b) => b.slug === slug);
}

export function getSuyNiem(): BaiViet[] {
  return readDir("suy-niem");
}

export function getSuyNiemBySlug(slug: string): BaiViet | undefined {
  return getSuyNiem().find((b) => b.slug === slug);
}

/** "18.08.2026" from ISO date */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}
