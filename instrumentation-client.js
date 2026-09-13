// MOVA 전용 GA4 측정 ID입니다.
const GA_MEASUREMENT_ID = "G-KSXD8BNQWW";

// Next.js가 브라우저에서 초기화할 때 GA4 스크립트를 한 번만 추가합니다.
function loadGoogleAnalytics() {
  if (typeof window === "undefined" || document.getElementById("mova-ga4-script")) return;

  // Google 태그 스크립트를 로드합니다.
  const script = document.createElement("script");
  script.id = "mova-ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // GA4가 사용할 dataLayer와 gtag 함수를 초기화합니다.
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);
}

loadGoogleAnalytics();
