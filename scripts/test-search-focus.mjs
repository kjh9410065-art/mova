import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const read = (name) => fs.readFileSync(path.join(process.cwd(), name), "utf8");
const css = read("app/search-focus-fix.css");
const layout = read("app/layout.js");
const homepage = read("app/page.js");
const catalog = read("app/catalog/page.js");
const localStorage = read("app/lib/personal-storage.js");
const packageJson = JSON.parse(read("package.json"));

assert(layout.includes('import "./search-focus-fix.css";'), "focused fix must be included in production layout");
const lastCss = [...layout.matchAll(/import "([^"]+\.css)";/g)].map((item) => item[1]).at(-1);
assert(lastCss === "./search-focus-fix.css", "focused fix should be the final global CSS override");
assert(/\.homePage \.searchBox\.compactSearch:focus-within/.test(css), "rounded wrapper must display one focus state");
assert(/\.homePage \.searchBox\.compactSearch input:focus-visible/.test(css), "home input focus rule missing");
assert(/\.catalogPage \.catalogSearch input:focus-visible/.test(css), "catalog input focus rule missing");
assert(/\.catalogPage \.catalogSearch:focus-within/.test(css), "catalog wrapper keyboard focus missing");
assert(css.includes("flex-direction: row !important"), "mobile generic column rule must not split search input");
assert(css.includes("box-shadow: none !important"), "input's rectangular focus shadow must be removed");
assert(css.includes("outline: none !important"), "input's rectangular focus outline must be removed");
assert(css.includes('html[data-theme="dark"]'), "focus fix must support dark mode");
assert(homepage.includes('className="searchBox compactSearch"'), "original home search markup should be retained");
assert(catalog.includes('className="catalogSearch"'), "original catalog search markup should be retained");
assert(homepage.includes('aria-label="서비스 검색"'), "home search accessibility label missing");
assert(catalog.includes('aria-label="서비스 검색"'), "catalog search accessibility label missing");
assert(localStorage.includes('export const FAVORITES_KEY = "hub-favorites-v2"'), "favorites storage key must not change");
assert(localStorage.includes('export const COMPARE_KEY = "hub-compare"'), "compare storage key must not change");
assert(packageJson.scripts["test:search"], "search regression suite missing");
const nextLock = JSON.parse(read("package-lock.json")).packages["node_modules/next"].version;
assert.equal(packageJson.dependencies.next, "16.4.3", "patched Next.js must be declared in package.json");
assert.equal(nextLock, packageJson.dependencies.next, "Next.js lockfile must be on patched release");

console.log("NERDING search focus/keyboard/dark-mode/mobile regression checks passed; original design and storage keys retained.");
