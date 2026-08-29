import assert from "node:assert/strict";
import { slugifyArticleTitle } from "../src/lib/article-slug";

assert.equal(slugifyArticleTitle("Giờ lễ Chúa nhật"), "gio-le-chua-nhat");
assert.equal(slugifyArticleTitle("Đức tin — cộng đoàn"), "duc-tin-cong-doan");
assert.equal(slugifyArticleTitle("---"), "");
assert.ok(slugifyArticleTitle("a".repeat(140)).length <= 120);
console.log("Admin article slug checks passed");
