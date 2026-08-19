export const ARTICLE_KINDS = ["bai-viet", "suy-niem"] as const;
export type ArticleKind = (typeof ARTICLE_KINDS)[number];

export const ARTICLE_STATUSES = ["draft", "published"] as const;
export type ArticleStatus = (typeof ARTICLE_STATUSES)[number];

export const ARTICLE_CATEGORIES = [
  "thong-bao",
  "sinh-hoat",
  "giao-hoi",
  "suy-niem",
  "suy-niem-hang-ngay",
  "suy-niem-chua-nhat",
  "cao-pho",
  "rao-hon-phoi",
] as const;

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

export interface BaiViet {
  id?: string;
  kind: ArticleKind;
  status: ArticleStatus;
  title: string;
  slug: string;
  category: string;
  date: string;
  author: string;
  tags: string[];
  summary: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ArticleInput = Omit<
  BaiViet,
  "id" | "createdAt" | "updatedAt"
>;

export const PUBLIC_ARTICLE_KINDS = {
  "bai-viet": "/tin-tuc",
  "suy-niem": "/loi-chua",
} as const satisfies Record<ArticleKind, string>;

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}
