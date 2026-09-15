import "./globals.css";
import "./responsive.css";
import "./home-typography.css";
import "./readable-ui.css";
import "./components/adsense.css";
import "./components/ad-slot.css";
import "./components/hub-floating-controls.css";
import "./dark-mode-hardening.css";
import "./light-mode-cleanup.css";
import "./components/compare-bar-unified.css";
import "./ui-visibility-polish.css";
import "./button-clarity.css";
import "./catalog-icon-scale.css";
import "./mobile-card-readability.css";
import "./nerding-redesign.css";
import Script from "next/script";
import HubTutorial from "./components/hub-tutorial";
import HubTheme from "./components/hub-theme";
import AdSlot from "./components/ad-slot";
import SiteFooter from "./components/site-footer";

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();

export const metadata = {
  title: "NERDING — 목적에 맞는 AI·개발 서비스 찾기",
  description: "만들고 싶은 목적에 맞는 AI·개발 서비스를 빠르게 찾고 비교할 수 있습니다.",
  metadataBase: new URL("https://mova.tcflick.com"),
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg?v=2", shortcut: "/icon.svg?v=2", apple: "/icon.svg?v=2" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "NERDING — 목적에 맞는 AI·개발 서비스 찾기",
    description: "만들고 싶은 목적에 맞는 AI·개발 서비스를 빠르게 찾고 비교할 수 있습니다.",
    url: "https://mova.tcflick.com",
    siteName: "NERDING",
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/MOVA-og-image.jpg", width: 1199, height: 675, alt: "NERDING AI 서비스 찾기" }]
  },
  verification: { google: "hAHkcvWFhoATFOdphua3yECySUCnJXT2IC9gfm0cYew" }
};

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="/illustrations.css" />
        {/* 네이버 소유확인용 메타 태그를 head에 직접 넣습니다. */}
        <meta name="naver-site-verification" content="470f41c9c7c695bedafdedaa15bf205009b0b1e1" />
        {/* 기존 데이터와 기능에는 영향을 주지 않고 화면에 남은 이전 브랜드명을 새 이름으로 표시합니다. */}
        <script dangerouslySetInnerHTML={{ __html: `(() => { const start = () => { const replaceBrand = () => { if (!document.body) return; const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode); nodes.forEach((node) => { if (node.nodeValue.includes("MOVA")) node.nodeValue = node.nodeValue.replaceAll("MOVA", "NERDING"); if (node.nodeValue.includes("HUB")) node.nodeValue = node.nodeValue.replaceAll("HUB", "NERDING"); }); document.querySelectorAll("[aria-label], [title]").forEach((el) => { ["aria-label", "title"].forEach((attr) => { const value = el.getAttribute(attr); if (value) el.setAttribute(attr, value.replaceAll("MOVA", "NERDING").replaceAll("HUB", "NERDING")); }); }); }; replaceBrand(); new MutationObserver(replaceBrand).observe(document.body, { childList: true, subtree: true, characterData: true }); }; if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true }); else start(); })();` }} />
      </head>
      <body>
        {adsenseClient && <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`} crossOrigin="anonymous" strategy="afterInteractive" />}
        <AdSlot label="광고" />
        {children}
        <AdSlot label="광고" />
        <SiteFooter />
        <HubTheme />
        <HubTutorial />
      </body>
    </html>
  );
}
