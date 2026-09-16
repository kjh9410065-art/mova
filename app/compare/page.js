/* NERDING 비교 화면: 선택한 서비스의 차이를 빠르게 판단할 수 있도록 구성합니다. */
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { catalog, catalogMap } from "../lib/catalog";
import { rankServices } from "../lib/recommendation";
import "./compare.css";
import "./compare-readability.css";
import "./compare-final.css";

const goals = [["shorts", "쇼츠 제작"], ["image", "이미지 제작"], ["video", "영상 제작"], ["voice", "음성 제작"], ["chat", "AI 챗봇"], ["api", "개발용 API"]];
// 비교표는 실제 구매·선택에 필요한 핵심 항목만 남겨 서비스 간 차이가 바로 보이도록 합니다.
const rows = [["description", "서비스 설명"], ["category", "분류"], ["price", "가격"], ["free", "무료 여부"], ["bestFor", "추천 대상"], ["strengths", "장점"], ["caveat", "단점·주의할 점"], ["api", "API"], ["image", "이미지"], ["video", "영상"], ["voice", "음성"], ["search", "검색"]];
const featureLabels = { image: "이미지", video: "영상", voice: "음성", search: "검색", api: "API" };

function featureValue(service, key) {
  if (["image", "video", "voice", "search"].includes(key)) return service.features?.[key] || service.uses?.includes(key) ? "지원" : "미지원";
  if (key === "description") return service.description || service.bestFor || "정보 없음";
  if (key === "free") return service.free ? "무료 시작 가능" : "무료 시작 정보 없음";
  if (key === "api") return service.api ? "제공" : "미제공";