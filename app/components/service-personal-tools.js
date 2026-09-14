"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const FAVORITES_KEY = "hub-favorites-v2";
const RECENT_KEY = "mova-recent-services";

function readList(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function ServicePersonalTools({ serviceId }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const favorites = readList(FAVORITES_KEY);
    setFavorite(favorites.includes(serviceId));

    // 상세 페이지를 열 때 최근 본 서비스를 최신순으로 저장합니다.
    const recent = readList(RECENT_KEY).filter((id) => id !== serviceId);
    localStorage.setItem(RECENT_KEY, JSON.stringify([serviceId, ...recent].slice(0, 10)));
  }, [serviceId]);

  const toggleFavorite = () => {
    const favorites = readList(FAVORITES_KEY);
    const next = favorites.includes(serviceId)
      ? favorites.filter((id) => id !== serviceId)
      : [...favorites, serviceId];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    setFavorite(next.includes(serviceId));
  };

  return (
    <div className="servicePersonalTools">
      <button type="button" className={favorite ? "active" : ""} onClick={toggleFavorite} aria-pressed={favorite}>
        {favorite ? "♥ 즐겨찾기됨" : "♡ 즐겨찾기"}
      </button>
      <Link href="/favorites">즐겨찾기 · 최근 본 서비스</Link>
    </div>
  );
}

export const personalStorageKeys = { FAVORITES_KEY, RECENT_KEY };
