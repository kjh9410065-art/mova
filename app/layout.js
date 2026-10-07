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
import SiteFooter from "./components/site-footer";

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();

export const metadata = {
  title: "NERDING — AI 서비스·AI 도구·개발 도구 찾기",
  description: "AI 서비스, AI 도구, 이미지 생성, 영상 생성, 개발 도구 등 목적에 맞는 서비스를 한곳에서 찾고 비교할 수 있습니다.",
  keywords: ["NERDING", "너딩", "AI 서비스", "AI 도구", "AI 추천", "AI 비교", "생성형 AI", "이미지 생성 AI", "영상 생성 AI", "개발 도구", "개발 서비스"],
  metadataBase: new URL("https://mova.tcflick.com"),
  alternates: { canonical: "/" },
  icons: {
    // 실제 서비스 아이콘을 favicon으로 사용해 대형 홍보 이미지를 favicon으로 불러오지 않도록 합니다.
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg"
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
        {/* Yandex.RTB 공통 광고 로더를 불러옵니다. */}
        <script dangerouslySetInnerHTML={{ __html: "window.yaContextCb=window.yaContextCb||[]" }} />
        <script src="https://yandex.ru/ads/system/context.js" async />
        {/* 자동광고가 활성화되어 있어도 이 수동 Yandex unit은 계속 노출되도록 예외 처리합니다. */}
        <script dangerouslySetInnerHTML={{ __html: `window.APExceptionBlocks = window.APExceptionBlocks || ["R-A-20181662-1"];` }} />
        <script data-page-id="20181662" src="https://yandex.ru/ads/system/ap-loader.js" async></script>
</head>
      <body>
        {adsenseClient && <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`} crossOrigin="anonymous" strategy="afterInteractive" />}
        {/* 기존 상단 광고 칸에 승인된 Yandex.RTB 광고를 표시합니다. */}
        <div className="movaAdSlot movaAdSlotEnabled" aria-label="광고 영역">
          <div id="yandex_rtb_R-A-20181662-1" />
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.yaContextCb.push(() => {
              Ya.Context.AdvManager.render({
                "blockId": "R-A-20181662-1",
                "renderTo": "yandex_rtb_R-A-20181662-1"
              })
            })`
          }}
        />
        {children}
        <SiteFooter />
        <NerdingTheme />
        <NerdingTutorial />
      </body>
    </html>
  );
}
