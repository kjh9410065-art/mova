import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

// Run the production search module itself, without needing a Next.js dev server.
const source = await readFile(new URL("../app/lib/search.js", import.meta.url), "utf8");
const search = await import("data:text/javascript;base64," + Buffer.from(source).toString("base64"));

const items = [
  { id:"image", name:"그림 생성 AI", category:"AI 이미지", bestFor:"이미지 편집", tags:["사진","디자인"], strengths:["이미지 생성"], uses:["image"], features:{image:true}, free:true, api:false },
  { id:"video", name:"영상 제작 AI", category:"AI 영상", bestFor:"동영상 제작", tags:["영상"], strengths:["영상 생성"], uses:["video"], features:{video:true}, free:false, api:false },
  { id:"voice", name:"음성 생성 AI", category:"AI 음성", bestFor:"목소리 더빙", tags:["음성"], strengths:["TTS"], uses:["voice"], features:{voice:true}, free:true, api:false },
  { id:"dev", name:"개발자 API", category:"AI 개발", bestFor:"개발 도구", tags:["코딩","API"], strengths:["개발"], uses:["api"], features:{text:true}, free:true, api:true }
];

function first(query){ return search.rankSearchResults(items, query)[0]?.id; }
assert.equal(first("이미지"), "image", "한글 기본 검색");
assert.equal(first("이미지".normalize("NFD")), "image", "조합형 한글 유니코드");
assert.equal(first("이미지를"), "image", "한글 목적격 조사");
assert.equal(first("영상으로"), "video", "한글 부사격 조사");
assert.equal(first("챗봇"), undefined, "카탈로그에 없는 목적");
assert.equal(first("음성으로"), "voice", "한글 용도 검색");
assert.equal(first("개발 도구"), "dev", "개발 도구 자연어 검색");
assert.equal(first("개발도구"), "dev", "붙여쓴 개발도구 검색");
assert.equal(first("OpenAI".normalize("NFD")), undefined, "일치하지 않는 서비스");
assert.equal(search.normalizeSearchQuery("이미지".normalize("NFD")).raw, "이미지", "검색어 NFKC 정규화");
assert.equal(search.rankSearchResults(items, "무료로 이미지 만들기")[0]?.id, "image", "무료 + 작업 목적");
assert(search.rankSearchResults(items, "무료로 이미지 만들기").every(x=>x.free),"무료 필터");
assert(search.rankSearchResults(items, "API").every(x=>x.api),"API 필터");
assert.equal(search.rankSearchResults(items, "일치하는항목이전혀없는검색어").length,0,"검색 결과 없음");
console.log("NERDING search regression checks passed (Hangul, decomposed Hangul, particles, intent, filters).");
