// MOVA 전체 화면이 동일한 서비스 카탈로그와 분류 체계를 사용하도록 한 곳에서 관리합니다.
import { services as coreServices } from "./services";
import { additionalServices } from "../data/service-catalog";

export const catalog = [...coreServices, ...additionalServices];
export const catalogMap = Object.fromEntries(catalog.map((service) => [service.id, service]));

const has = (s, words) => new RegExp(words, "i").test(`${s.category} ${(s.tags || []).join(" ")} ${(s.uses || []).join(" ")}`);

export const categoryGroups = [
  { id: "all", label: "전체", test: () => true },
  { id: "llm", label: "LLM", test: (s) => /AI 모델|추론|LLM/i.test(s.category) || (s.tags || []).some((tag) => /LLM|Gemini|Claude|RAG/.test(tag)) },
  { id: "image", label: "이미지", test: (s) => Boolean(s.features?.image) || /이미지|디자인/i.test(s.category) },
  { id: "video", label: "영상", test: (s) => Boolean(s.features?.video) || /영상/i.test(s.category) },
  { id: "music", label: "음악", test: (s) => has(s, "음악|music|노래|sound") },
  { id: "voice", label: "음성", test: (s) => Boolean(s.features?.voice) || /음성/i.test(s.category) },
  { id: "text", label: "글·문서", test: (s) => Boolean(s.features?.text) || has(s, "텍스트|문서|글|writing|문서") },
  { id: "coding", label: "코딩", test: (s) => has(s, "코딩|개발|code|programming|API") },
  { id: "productivity", label: "생산성", test: (s) => has(s, "생산성|업무|자동화|workflow|productivity") },
  { id: "search", label: "검색", test: (s) => Boolean(s.features?.search) || /검색|웹 데이터/i.test(s.category) },
  { id: "developer", label: "개발", test: (s) => Boolean(s.api) || /개발|API|인프라|플랫폼/i.test(s.category) },
  { id: "infra", label: "인프라", test: (s) => /인프라|GPU|클라우드/i.test(`${s.category} ${(s.tags || []).join(" ")}`) },
  { id: "other", label: "기타", test: (s) => !categoryGroupsExceptOther.some((group) => group.test(s)) }
];

// 기타 분류는 구체적인 유형에 속하지 않는 서비스만 담습니다.
const categoryGroupsExceptOther = categoryGroups.filter((group) => !["all", "other"].includes(group.id));

export function matchesCategory(service, categoryId) {
  return categoryGroups.find((group) => group.id === categoryId)?.test(service) ?? true;
}

export function findServices(query = "") {
  const keyword = query.trim().toLowerCase();
  if (!keyword) return catalog;
  return catalog.filter((service) => [service.name, service.category, service.bestFor, service.caveat, ...(service.tags || []), ...(service.uses || []), ...(service.strengths || [])].filter(Boolean).join(" ").toLowerCase().includes(keyword));
}
