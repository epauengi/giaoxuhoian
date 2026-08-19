import "server-only";

import { model, models, Schema } from "mongoose";
import {
  ARTICLE_CATEGORIES,
  ARTICLE_KINDS,
  ARTICLE_STATUSES,
  type ArticleKind,
  type ArticleStatus,
} from "@/lib/article-types";

export interface ArticleDocument {
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
  createdAt: Date;
  updatedAt: Date;
}

const articleSchema = new Schema<ArticleDocument>(
  {
    kind: { type: String, enum: ARTICLE_KINDS, required: true },
    status: { type: String, enum: ARTICLE_STATUSES, required: true, default: "draft" },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 120,
      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    },
    category: { type: String, enum: ARTICLE_CATEGORIES, required: true },
    date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
    author: { type: String, required: true, trim: true, maxlength: 120 },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: (tags: string[]) => tags.length <= 12 && tags.every((tag) => tag.length <= 40),
        message: "Tags không hợp lệ",
      },
    },
    summary: { type: String, required: true, trim: true, maxlength: 500 },
    content: { type: String, required: true, maxlength: 500_000 },
  },
  { timestamps: true, versionKey: false },
);

articleSchema.index({ kind: 1, slug: 1 }, { unique: true });
articleSchema.index({ kind: 1, status: 1, date: -1 });

export const Article =
  models.Article ?? model<ArticleDocument>("Article", articleSchema);
