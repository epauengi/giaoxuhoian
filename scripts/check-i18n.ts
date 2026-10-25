import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getDictionary } from "../src/lib/i18n/dictionaries";
import { localePath, stripLocale } from "../src/lib/i18n/routing";
import { localize, translate } from "../src/lib/i18n/content";
import { articlesEn, localizeArticle } from "../src/lib/i18n/articles.en";
import type { BaiViet } from "../src/lib/article-types";

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, shape(item)]));
  return typeof value;
}

assert.deepEqual(shape(getDictionary("en")), shape(getDictionary("vi")));
for (const locale of ["vi", "en"] as const) {
  assert.equal(stripLocale(`/${locale}`), "/");
  assert.equal(localePath(locale, `/${locale}/tin-tuc?loai=thong-bao#news`), "/tin-tuc?loai=thong-bao#news");
}
assert.equal(stripLocale("/enough"), "/enough");
assert.equal(stripLocale("/vietnam"), "/vietnam");
assert.equal(stripLocale("/vietnam"), "/vietnam");
const data = { slug: "rua-toi", title: "Thứ Hai", nested: ["Lễ sáng", "05:00"] };
assert.equal(localize("vi", data), data);
assert.deepEqual(localize("en", data), { slug: "rua-toi", title: "Monday", nested: ["Morning Mass", "05:00"] });
assert.equal(data.title, "Thứ Hai");
assert.equal(translate("en", "not a known translation"), "not a known translation");
for (const value of ["constructor", "__proto__", "toString"]) assert.equal(translate("en", value), value);

let count = 0;
for (const kind of ["bai-viet", "suy-niem"] as const) {
  const directory = path.resolve("content", kind);
  for (const file of fs.readdirSync(directory).filter((file) => file.endsWith(".mdx"))) {
    const { data: fields, content } = matter(fs.readFileSync(path.join(directory, file), "utf8"));
    const source = { ...fields, locale: "vi", kind, status: "published", content } as BaiViet;
    const translated = localizeArticle("en", source);
    assert.equal(translated.locale, "en", `${file}: missing or stale translation`);
    assert.equal(translated.slug, source.slug);
    assert.notEqual(translated.title, source.title);
    assert.equal(localizeArticle("vi", source), source);
    const unknown = { ...source, slug: "constructor" };
    assert.equal(localizeArticle("en", unknown), unknown);
    for (const field of ["title", "summary", "content"] as const) {
      const changed = { ...source, [field]: `${source[field]} edited` };
      assert.equal(localizeArticle("en", changed), changed, `${file}: stale ${field} used`);
    }
    assert.equal(localizeArticle("en", { ...source, content: content.replace(/\r?\n/g, "\r\n") }).locale, "en");
    count++;
  }
}
assert.equal(count, 10);
assert.equal(Object.keys(articlesEn).length, count);
console.log(`PASS: dictionaries, routing helpers, immutable localization, ${count} article translations and freshness guards`);

async function checkHttp(base: string) {
  const routes = ["/", "/giao-xu", "/giao-xu/lich-su", "/phung-vu", "/bi-tich", "/bi-tich/rua-toi", "/cong-doan", "/dong-hanh", "/lien-he", "/thu-vien", "/loi-chua", "/tin-tuc?loai=thong-bao"];
  for (const locale of ["vi", "en"]) {
    for (const route of routes) {
      const response = await fetch(new URL(route, base), { headers: { cookie: `site-locale=${locale}` }, redirect: "manual" });
      const html = await response.text();
      assert.equal(response.status, 200, `${locale} ${route}`);
      assert.match(html, new RegExp(`<html[^>]*lang="${locale}"`), `${locale} ${route}`);
      assert.doesNotMatch(html, /rel="canonical"[^>]*href="https:\/\/giaoxuhoian\.vn\/(vi|en)(?:\/|")/);
      assert.equal(response.headers.get("location"), null);
    }
    const legacy = await fetch(new URL(`/${locale}/tin-tuc?loai=thong-bao`, base), { redirect: "manual" });
    assert.equal(legacy.status, 307);
    const location = new URL(legacy.headers.get("location")!, base);
    assert.equal(location.pathname + location.search, "/tin-tuc?loai=thong-bao");
    assert.match(legacy.headers.get("set-cookie") ?? "", new RegExp(`site-locale=${locale};`));
    assert.equal(legacy.headers.get("cache-control"), "private, no-store");
  }
  for (const cookie of ["", "site-locale=invalid"]) {
    const response = await fetch(new URL("/", base), { headers: { cookie }, redirect: "manual" });
    assert.equal(response.status, 200);
    assert.match(await response.text(), /<html[^>]*lang="vi"/);
  }
  const admin = await fetch(new URL("/admin", base), { headers: { cookie: "site-locale=en" }, redirect: "manual" });
  assert.equal(admin.status, 307);
  assert.equal(new URL(admin.headers.get("location")!, base).pathname, "/admin/dang-nhap");
  assert.equal((await fetch(new URL("/admin/dang-nhap", base))).status, 200);
  const oldAdmin = await fetch(new URL("/en/admin", base), { redirect: "manual" });
  assert.equal(new URL(oldAdmin.headers.get("location")!, base).pathname, "/admin");
  console.log("PASS: public HTTP routes in VI/EN, default/invalid cookies, legacy redirects/query, anonymous admin protection");
}

if (process.argv[2]) checkHttp(process.argv[2]).catch((error: unknown) => { console.error(error); process.exitCode = 1; });
