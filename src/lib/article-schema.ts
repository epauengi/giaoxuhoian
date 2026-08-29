import { z } from "zod";
import {
  ARTICLE_CATEGORIES,
  ARTICLE_KINDS,
  ARTICLE_STATUSES,
} from "@/lib/article-types";

const DATE_RE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const UNSAFE_MARKDOWN_RE = /(^|\n)\s*(import|export)\s+|<\/?[A-Za-z][^>]*>|\{[^}]*\}/;

function validDate(value: string): boolean {
  if (!DATE_RE.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return date.toISOString().slice(0, 10) === value;
}

const tags = z
  .array(z.string().trim().min(1).max(40))
  .max(12)
  .transform((values) => [...new Set(values)]);

export const articleInputSchema = z
  .object({
    locale: z.literal("vi").default("vi"),
    kind: z.enum(ARTICLE_KINDS),
    status: z.enum(ARTICLE_STATUSES),
    title: z.string().trim().min(1).max(200),
    slug: z.string().trim().max(120, "Đường dẫn bài viết tối đa 120 ký tự").regex(SLUG_RE, "Đường dẫn chỉ gồm chữ thường, số và dấu gạch ngang"),
    category: z.enum(ARTICLE_CATEGORIES),
    date: z.string().refine(validDate, "Ngày không hợp lệ"),
    author: z.string().trim().min(1).max(120),
    tags,
    summary: z.string().trim().min(1).max(500),
    content: z
      .string()
      .trim()
      .min(1)
      .max(500_000)
      .refine((value) => !UNSAFE_MARKDOWN_RE.test(value), "Nội dung chỉ hỗ trợ Markdown an toàn"),
  })
  .superRefine((value, context) => {
    const validCategories =
      value.kind === "bai-viet"
        ? ["thong-bao", "sinh-hoat", "giao-hoi", "cao-pho", "rao-hon-phoi"]
        : ["suy-niem", "suy-niem-hang-ngay", "suy-niem-chua-nhat"];
    if (!validCategories.includes(value.category)) {
      context.addIssue({ code: "custom", path: ["category"], message: "Loại bài không khớp nhóm" });
    }
  });

export type ArticleInput = z.infer<typeof articleInputSchema>;

export const articleIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "ID không hợp lệ");
export const updatedAtSchema = z.string().datetime({ offset: true });

export function formDataToArticleInput(formData: FormData): unknown {
  return {
    locale: "vi",
    kind: formData.get("kind"),
    status: formData.get("status"),
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    date: formData.get("date"),
    author: formData.get("author"),
    tags: String(formData.get("tags") ?? "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    summary: formData.get("summary"),
    content: formData.get("content"),
  };
}
