import assert from "node:assert/strict";
import { isNavItemActive, localePath, stripLocale } from "../src/lib/i18n/routing";

assert.equal(stripLocale("/vi/bi-tich/hon-phoi"), "/bi-tich/hon-phoi");
assert.equal(stripLocale("/vi"), "/");
assert.equal(localePath("vi", "/vi/tin-tuc"), "/tin-tuc");
assert.equal(isNavItemActive("/bi-tich/hon-phoi", "/phung-vu"), true);
assert.equal(isNavItemActive("/vi/loi-chua/bai-moi", "/tin-tuc"), true);
assert.equal(isNavItemActive("/tin-tuc", "/"), false);
assert.equal(isNavItemActive("/", "/"), true);

console.log("Public navigation checks passed.");
