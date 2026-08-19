import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import matter from "gray-matter";
import mongoose from "mongoose";
import { connectMongo } from "../src/lib/mongodb";
import { articleInputSchema } from "../src/lib/article-schema";
import { Article } from "../src/models/article";
import type { ArticleKind } from "../src/lib/article-types";

const sources: Array<{ kind: ArticleKind; directory: string }> = [
  { kind: "bai-viet", directory: "bai-viet" },
  { kind: "suy-niem", directory: "suy-niem" },
];

async function readArticles() {
  const contentRoot = path.join(process.cwd(), "content");
  const parsed: Array<Record<string, unknown>> = [];

  for (const source of sources) {
    const directory = path.join(contentRoot, source.directory);
    const files = (await fs.readdir(directory)).filter((file) => file.endsWith(".mdx"));
    for (const file of files) {
      const raw = await fs.readFile(path.join(directory, file), "utf8");
      const { data, content } = matter(raw);
      const result = articleInputSchema.safeParse({
        ...data,
        kind: source.kind,
        status: "published",
        content,
      });
      if (!result.success) {
        throw new Error(`${source.directory}/${file}: ${result.error.message}`);
      }
      parsed.push(result.data);
    }
  }

  const keys = parsed.map((article) => `${article.kind}:${article.slug}`);
  if (new Set(keys).size !== keys.length) throw new Error("Duplicate article kind/slug in source");
  return parsed;
}

async function main() {
  const articles = await readArticles();
  await connectMongo();
  const operations = articles.map((article) => ({
    updateOne: {
      filter: { kind: article.kind, slug: article.slug },
      update: { $set: article, $setOnInsert: { createdAt: new Date() } },
      upsert: true,
    },
  }));
  const result = operations.length ? await Article.bulkWrite(operations) : null;
  const counts = await Article.countDocuments({ status: "published" });
  console.log(
    JSON.stringify({
      source: articles.length,
      matched: result?.matchedCount ?? 0,
      modified: result?.modifiedCount ?? 0,
      upserted: result?.upsertedCount ?? 0,
      publishedInDatabase: counts,
    }),
  );
}

main()
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : "Import failed");
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
