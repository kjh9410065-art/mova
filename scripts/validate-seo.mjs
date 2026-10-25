import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const site = "https://nerding.tcflick.com";
const read = (filename) => fs.readFileSync(path.join(process.cwd(), filename), "utf8");
const sitemap = read("public/sitemap.xml");
const robots = read("public/robots.txt");
const llms = read("public/llms.txt");
const layout = read("app/layout.js");
const serviceData = read("app/lib/services.js") + "\n" + read("app/data/service-catalog.js");
const guides = read("app/guides/data.js");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const ids = [...serviceData.matchAll(/\{id:"([^"]+)"/g)].map((match) => match[1]);
const slugs = [...guides.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);

assert(robots.includes("Sitemap: " + site + "/sitemap.xml"), "공식 robots.txt 사이트맵 주소");
assert(llms.includes(site + "/"), "공식 llms.txt 주소");
assert(layout.includes(site), "NERDING 루트 사이트 주소");
assert(!sitemap.includes("mova.tcflick.com") && !llms.includes("mova.tcflick.com"), "폐기 도메인 제거");
assert(urls.length >= 80, "사이트맵 페이지 수");
assert.equal(new Set(urls).size, urls.length, "사이트맵 URL 중복");
assert(urls.every((url) => url.startsWith(site + "/")), "사이트맵은 공식 도메인만 사용");
for (const id of ids) assert(urls.includes(site + "/services/" + id), "사이트맵 서비스 누락: " + id);
for (const slug of slugs) assert(urls.includes(site + "/guides/" + slug), "사이트맵 가이드 누락: " + slug);

const toolDir = path.join(process.cwd(), "app/tools");
let toolPages = 0;
for (const entry of fs.readdirSync(toolDir, { withFileTypes:true })) {
  if (!entry.isDirectory()) continue;
  const filename = path.join(toolDir, entry.name, "layout.js");
  if (!fs.existsSync(filename)) continue;
  const source = fs.readFileSync(filename, "utf8");
  assert(source.includes('canonical: "/tools/' + entry.name + '"'), "도구 canonical 오류: " + entry.name);
  assert(source.includes("title:") && source.includes("NERDING") && source.includes("description:"), "도구 고유 SEO 제목/설명 누락: " + entry.name);
  assert(urls.includes(site + "/tools/" + entry.name), "사이트맵 도구 누락: " + entry.name);
  toolPages++;
}
// Prevent old public hostnames from resurfacing in pages, metadata or assets.
const publicRoots = ["app", "public"];
const legacyHostname = /(?:mova[.]tcflick[.]com|mova[.]carpick[.]workers[.]dev)/i;
const textExtensions = /\.(?:js|jsx|mjs|json|jsonc|css|html|xml|txt|md|svg|webmanifest)$/i;
function scanPublicSources(directory) {
  for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
    const filename = path.join(directory, item.name);
    if (item.isDirectory()) scanPublicSources(filename);
    else if (textExtensions.test(item.name)) {
      assert(!legacyHostname.test(fs.readFileSync(filename, "utf8")), "구 도메인이 남아 있습니다: " + filename);
    }
  }
}
for (const directory of publicRoots) scanPublicSources(path.join(process.cwd(), directory));
assert(layout.includes('alternates: { canonical: "https://nerding.tcflick.com/" }'), "NERDING 홈 canonical 주소");
assert(layout.includes('url: "https://nerding.tcflick.com/"'), "NERDING OpenGraph 공식 도메인");

console.log("NERDING SEO checks passed: " + urls.length + " sitemap URLs, " + ids.length + " services, " + slugs.length + " guides, " + toolPages + " tools.");
