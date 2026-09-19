import "./globals.css";
import "./responsive.css";
import "./home-typography.css";
import "./home-visibility.css";
import "./readable-ui.css";
import "./components/adsense.css";
import "./components/ad-slot.css";
import "./dark-mode-hardening.css";
import "./light-mode-cleanup.css";
import "./components/compare-bar-unified.css";
import "./ui-visibility-polish.css";
import "./button-clarity.css";
import "./catalog-icon-scale.css";
import "./category-scale.css";
import "./mobile-card-readability.css";
import "./nerding-redesign.css";
import "./recommend/desktop-topmatch-fix.css";
import Script from "next/script";
import NerdingTutorial from "./components/nerding-tutorial";
import NerdingTheme from "./components/nerding-theme";
import AdSlot from "./components/ad-slot";
import SiteFooter from "./components/site-footer";

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();

export const metadata = {
  title: "NERDING — AI 서비스·AI 도구·개발 도구 찾기",
  description: "AI 서비스, AI 도구, 이미지 생성, 영상 생성, 개발 도구 등 목적에 맞는 서비스를 한곳에서 찾고 비교할 수 있습니다.",
  keywords: ["NERDING", "너딩", "AI 서비스", "AI 도구", "AI 추천", "AI 비교", "생성형 AI", "이미지 생성 AI", "영상 생성 AI", "개발 도구", "개발 서비스"],
  metadataBase: new URL("https://mova.tcflick.com"),
  alternates: { canonical: "/" },
  icons: {
    // PNG 파일을 직접 지정해 브라우저와 검색엔진의 favicon 인식을 안정화합니다.
    icon: [{ url: "/ChatGPT%20Image%202026%EB%85%84%209%EC%9B%94%2015%EC%9D%BC%20%EC%98%A4%ED%9B%84%2011_34_22.png", type: "image/png" }],
    shortcut: "/ChatGPT%20Image%202026%EB%85%84%209%EC%9B%94%2015%EC%9D%BC%20%EC%98%A4%ED%9B%84%2011_34_22.png",
    apple: "/ChatGPT%20Image%202026%EB%85%84%209%EC%9B%94%2015%EC%9D%BC%20%EC%98%A4%ED%9B%84%2011_34_22.png"
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "NERDING — AI 서비스·AI 도구·개발 도구 찾기",
    description: "AI 서비스, AI 도구, 이미지 생성, 영상 생성, 개발 도구 등 목적에 맞는 서비스를 한곳에서 찾고 비교해보세요.",
    url: "https://mova.tcflick.com",
    siteName: "NERDING",
    locale: "ko_KR",
    type: "website",
    images: [{
      url: "/ChatGPT%20Image%202026%EB%85%84%209%EC%9B%94%2015%EC%9D%BC%20%EC%98%A4%ED%9B%84%2011_34_22.png",
      alt: "NERDING AI 서비스 찾기"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "NERDING — AI 서비스·AI 도구·개발 도구 찾기",
    description: "AI 서비스와 개발 도구를 목적에 맞게 찾고 비교하는 NERDING.",
    // 실제 public 파일명과 정확히 일치하도록 수정합니다.
    images: ["/ChatGPT%20Image%202026%EB%85%84%209%EC%9B%94%2015%EC%9D%BC%20%EC%98%A4%ED%9B%84%2011_34_22.png"]
  },
  verification: { google: "hAHkcvWFhoATFOdphua3yECySUCnJXT2IC9gfm0cYew" }
};

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="/illustrations.css" />
        <meta name="naver-site-verification" content="470f41c9c7c695bedafdedaa15bf205009b0b1e1" />
        <script dangerouslySetInnerHTML={{ __html: `(() => { const start = () => { const replaceBrand = () => { if (!document.body) return; const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode); nodes.forEach((node) => { if (node.nodeValue.includes("MOVA")) node.nodeValue = node.nodeValue.replaceAll("MOVA", "NERDING"); if (node.nodeValue.includes("HUB")) node.nodeValue = node.nodeValue.replaceAll("HUB", "NERDING"); }); document.querySelectorAll("[aria-label], [title]").forEach((el) => { ["aria-label", "title"].forEach((attr) => { const value = el.getAttribute(attr); if (value) el.setAttribute(attr, value.replaceAll("MOVA", "NERDING").replaceAll("HUB", "NERDING")); }); }); }; replaceBrand(); new MutationObserver(replaceBrand).observe(document.body, { childList: true, subtree: true, characterData: true }); }; if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true }); else start(); })();` }} />
      </head>
      <body>
        {adsenseClient && <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`} crossOrigin="anonymous" strategy="afterInteractive" />}
        <AdSlot label="광고" />
        {children}
        <AdSlot label="광고" />
        <SiteFooter />
        <NerdingTheme />
        <NerdingTutorial />
      </body>
    </html>
  );
}
