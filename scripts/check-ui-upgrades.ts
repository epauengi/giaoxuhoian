import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getNextMass } from "../src/lib/data/gio-le";

// 1. Next mass calculation and slot contracts
const mass = getNextMass(new Date("2026-09-08T08:00:00Z"));
assert(mass.time.length > 0, "Mass time should not be empty");
assert(mass.dayLabel.length > 0, "Mass day label should not be empty");
assert(typeof mass.diffMinutes === "number", "diffMinutes should be numeric");

// 2. Next mass badge source check: no perpetual ping, paper countdown
const badgeSrc = readFileSync(resolve(__dirname, "../src/components/blocks/next-mass-badge.tsx"), "utf8");
assert(!badgeSrc.includes("animate-ping"), "animate-ping should be removed from badge");
assert(badgeSrc.includes("text-paper"), "Countdown should use paper text color for WCAG contrast");
assert(badgeSrc.includes("text-xs font-bold"), "Label should be at least text-xs (12px)");

// 3. Globals CSS checks: reduced motion, mobile menu, rule timing
const cssSrc = readFileSync(resolve(__dirname, "../src/app/globals.css"), "utf8");
assert(cssSrc.includes("prefers-reduced-motion: reduce"), "Reduced motion media query must be present");
assert(cssSrc.includes("rule-open 400ms"), "Hero rule duration should be 400ms");
assert(cssSrc.includes("mobile-menu-enter"), "Mobile menu animation must be present");
assert(cssSrc.includes(".ticker-track"), "Ticker track rules must be present");

// 4. Navigation contrast checks
const navSrc = readFileSync(resolve(__dirname, "../src/components/layout/nav.tsx"), "utf8");
assert(!navSrc.includes("hover:bg-neutral-100 bg-ink text-paper"), "Active link should not combine hover:bg-neutral-100 with text-paper");

// 5. Quick access bar contrast checks
const quickSrc = readFileSync(resolve(__dirname, "../src/components/layout/quick-access-bar.tsx"), "utf8");
assert(!quickSrc.includes("hover:bg-neutral-100 active:bg-muted bg-ink text-paper"), "Quick bar active state should not mix hover/active pale bg with text-paper");

console.log("UI upgrade assertions passed successfully.");
