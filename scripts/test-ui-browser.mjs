// Automated Chromium audit for the REAL Next.js static export of NERDING.
// Tests original UI without changing the production layout.
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { createReadStream, existsSync, mkdirSync, statSync } from "node:fs";
import { resolve, extname, join, sep } from "node:path";
import { chromium } from "playwright";

const root = resolve("out");
assert(existsSync(join(root,"index.html")), "Run npm run build before the browser audit");
const mime = {".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",
 ".json":"application/json; charset=utf-8",".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg",
 ".jpeg":"image/jpeg",".ico":"image/x-icon",".woff2":"font/woff2",".webp":"image/webp",".txt":"text/plain; charset=utf-8"};
const server = createServer((req,res)=>{
  let pathname;
  try { pathname=decodeURIComponent(new URL(req.url,"http://localhost").pathname); }
  catch { res.writeHead(400);res.end();return; }
  let file=resolve(root,"."+pathname);
  if(file!==root && !file.startsWith(root+sep)){res.writeHead(403);res.end();return;}
  if(pathname==="/")file=join(root,"index.html");
  else if(!extname(pathname)) {
    if(existsSync(file+".html"))file+=".html";
    else if(existsSync(join(file,"index.html")))file=join(file,"index.html");
  }
  if(!existsSync(file)||!statSync(file).isFile()){res.writeHead(404);res.end("Not Found");return;}
  res.writeHead(200,{"Content-Type":mime[extname(file)]||"application/octet-stream","Cache-Control":"no-store"});
  createReadStream(file).pipe(res);
});
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
const base="http://127.0.0.1:"+server.address().port;
const chrome=[process.env.CHROME_BIN,"/usr/bin/google-chrome","/usr/bin/google-chrome-stable","/usr/bin/chromium"]
  .find(x=>x&&existsSync(x));
let browser;
const issues=[];
const widths=[280,320,390,430,600,690,820,1024,1280];
const screenshotDir="ui-audit-screenshots";
mkdirSync(screenshotDir,{recursive:true});
try {
  browser=await chromium.launch({headless:true,...(chrome?{executablePath:chrome}:{}),args:["--no-sandbox"]});
  async function checkSearch(route,width,theme="light"){
    const context=await browser.newContext({viewport:{width,height:850},deviceScaleFactor:1});
    await context.route("**/*",r=>{
      const u=new URL(r.request().url());
      if(u.hostname==="127.0.0.1"||u.hostname==="localhost")return r.continue();
      return r.abort();
    });
    if(theme==="dark")await context.addInitScript(()=>localStorage.setItem("hub-theme","dark"));
    const page=await context.newPage();
    const errors=[];
    page.on("pageerror",e=>errors.push(e.message));
    const response=await page.goto(base+route,{waitUntil:"domcontentloaded",timeout:20000});
    assert.equal(response.status(),200,route+" page must exist");
    const locator=page.locator('input[aria-label="서비스 검색"]').first();
    await locator.waitFor({state:"visible",timeout:15000});
    // Allow the statically exported React page to hydrate before input events.
    await page.waitForTimeout(200);
    await locator.focus();
    const actual=await page.evaluate(()=>{
      const input=document.querySelector('input[aria-label="서비스 검색"]');
      const outer=input.closest(".searchBox,.catalogSearch");
      const innerCss=getComputedStyle(input),outerCss=getComputedStyle(outer);
      const a=input.getBoundingClientRect(),b=outer.getBoundingClientRect();
      return {
        focused:document.activeElement===input,outline:innerCss.outlineStyle,
        border:parseFloat(innerCss.borderLeftWidth),shadow:innerCss.boxShadow,
        outerShadow:outerCss.boxShadow,outerRadius:parseFloat(outerCss.borderTopLeftRadius),
        flex:outerCss.flexDirection,within:a.x>=b.x-2&&a.right<=b.right+2&&a.height>12,
        pageOverflow:document.documentElement.scrollWidth-innerWidth,
        theme:document.documentElement.dataset.theme
      };
    });
    assert(actual.focused,route+" "+width+" search is not focused");
    assert.equal(actual.outline,"none",route+" "+width+" rectangular input outline");
    assert.equal(actual.border,0,route+" "+width+" inner input border");
    assert.equal(actual.shadow,"none",route+" "+width+" inner input shadow");
    assert.notEqual(actual.outerShadow,"none",route+" "+width+" accessible wrapper focus missing");
    assert(actual.outerRadius>=8,route+" "+width+" rounded wrapper missing");
    assert(actual.within,route+" "+width+" search input overflows its wrapper");
    if(route==="/")assert.equal(actual.flex,"row",width+" mobile search must stay horizontal");
    // The site should not produce document-level sideways scrolling on fold/bar phone.
    assert(actual.pageOverflow<=3,route+" "+width+" horizontal overflow "+actual.pageOverflow+"px");
    if(theme==="dark")assert.equal(actual.theme,"dark","dark mode not applied");
    await locator.fill("이미지");
    await page.waitForTimeout(150);
    assert.equal(await locator.inputValue(),"이미지",route+" "+width+" Korean typing failed");
    const cardSelector=route==="/"?".serviceCard":".catalogCard";
    assert((await page.locator(cardSelector).count())>0,route+" "+width+" image search should return results");
    if(width===390||width===690){
      await page.screenshot({path:join(screenshotDir,route==="/"
        ?"home-"+width+"-"+theme+"-focused.png"
        :"catalog-"+width+"-"+theme+"-focused.png"),fullPage:false});
    }
    if(errors.length)issues.push(...errors.map(e=>route+" "+width+": "+e));
    await context.close();
    return actual;
  }
  for(const width of widths){
    await checkSearch("/",width);
    await checkSearch("/catalog",width);
  }
  await checkSearch("/",390,"dark");
  await checkSearch("/catalog",390,"dark");
  const context=await browser.newContext({viewport:{width:390,height:840}});
  const page=await context.newPage();
  page.on("pageerror",e=>issues.push("navigation: "+e.message));
  for(const route of ["/recommend","/compare","/favorites","/tools/url","/guides/ai-image-generator","/services/openai"]){
    const res=await page.goto(base+route,{waitUntil:"domcontentloaded",timeout:20000});
    assert.equal(res.status(),200,route+" should be navigable");
    assert((await page.locator("body").innerText()).includes("NERDING") ||
      (await page.locator("body").innerText()).includes("너딩"),route+" brand missing");
  }
  await context.close();
  assert.deepEqual(issues,[],"Hydration or JS runtime errors found: "+issues.join("\n"));
  console.log("NERDING browser audit passed: 9 viewports × 2 search screens, light/dark focus, Korean typing, no horizontal scroll, 6 routes, no JS errors.");
} finally {
  if(browser)await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
