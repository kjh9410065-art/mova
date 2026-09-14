/* MOVA 개인화 화면: 로그인 없이 즐겨찾기와 최근 본 서비스를 관리합니다. */
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { catalog, catalogMap } from "../lib/catalog";
import "./favorites.css";

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

function ServiceCard({ service, onRemove }) {
  return (
    <article className="personalServiceCard">
      <Link href={`/services/${service.id}`} className="personalServiceMain">
        <img src={service.icon} alt="" />
        <div><strong>{service.name}</strong><span>{service.category}</span><p>{service.bestFor}</p></div>
      </Link>
      <div className="personalServiceActions">
        <Link href={`/services/${service.id}`}>상세 보기</Link>
        {onRemove && <button type="button" onClick={() => onRemove(service.id)}>삭제</button>}
      </div>
    </article>
  );
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [recent, setRecent] = useState([]);

  const sync = () => {
    setFavorites(readList(FAVORITES_KEY));
    setRecent(readList(RECENT_KEY).slice(0, 10));
  };

  useEffect(() => {
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const favoriteServices = useMemo(() => favorites.map((id) => catalogMap[id]).filter(Boolean), [favorites]);
  const recentServices = useMemo(() => recent.map((id) => catalogMap[id]).filter(Boolean), [recent]);

  const removeFavorite = (id) => {
    const next = favorites.filter((item) => item !== id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    setFavorites(next);
  };

  const clearRecent = () => {
    localStorage.removeItem(RECENT_KEY);
    setRecent([]);
  };

  return (
    <main className="favoritesPage">
      <header className="header favoritesHeader">
        <Link className="logo" href="/">MOVA</Link>
        <nav><Link href="/catalog">서비스 찾기</Link><Link href="/recommend">추천받기</Link><Link href="/compare">비교하기</Link></nav>
      </header>

      <section className="favoritesHero">
        <div className="eyebrow">MY MOVA</div>
        <h1>관심 있는 서비스를<br /><span>다시 찾아보세요.</span></h1>
        <p>로그인 없이 이 기기의 브라우저에 즐겨찾기와 최근 본 서비스를 저장합니다.</p>
      </section>

      <section className="personalSection">
        <div className="personalSectionHeading"><div><span>FAVORITES</span><h2>즐겨찾기 <small>{favoriteServices.length}</small></h2></div>{favoriteServices.length > 0 && <button type="button" onClick={() => { localStorage.removeItem(FAVORITES_KEY); setFavorites([]); }}>전체 삭제</button>}</div>
        {favoriteServices.length > 0 ? <div className="personalGrid">{favoriteServices.map((service) => <ServiceCard key={service.id} service={service} onRemove={removeFavorite} />)}</div> : <div className="personalEmpty"><strong>아직 즐겨찾기한 서비스가 없습니다.</strong><p>서비스 카드의 ♡ 버튼을 눌러 저장해보세요.</p><Link href="/catalog">서비스 찾아보기</Link></div>}
      </section>

      <section className="personalSection">
        <div className="personalSectionHeading"><div><span>RECENTLY VIEWED</span><h2>최근 본 서비스 <small>{recentServices.length}</small></h2></div>{recentServices.length > 0 && <button type="button" onClick={clearRecent}>기록 지우기</button>}</div>
        {recentServices.length > 0 ? <div className="personalGrid">{recentServices.map((service) => <ServiceCard key={service.id} service={service} />)}</div> : <div className="personalEmpty"><strong>최근 본 서비스가 없습니다.</strong><p>서비스 상세 페이지를 열면 최대 10개까지 자동으로 기록됩니다.</p></div>}
      </section>

      <section className="personalFooter"><Link href="/catalog">서비스 전체 보기</Link><Link href="/compare">서비스 비교하기</Link><Link href="/">MOVA 홈</Link></section>
    </main>
  );
}
