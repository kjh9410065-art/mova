import Link from "next/link";
import "../legal.css";

export const metadata = {
  title: "이용약관 | NERDING",
  description: "NERDING 이용약관"
};

export default function TermsPage() {
  return (
    <main className="legalPage">
      <header className="legalHeader"><Link href="/">NERDING</Link><Link href="/">홈으로</Link></header>
      <article className="legalArticle">
        <p className="legalKicker">TERMS</p>
        <h1>이용약관</h1>
        <p className="legalLead">NERDING은 사용자가 목적에 맞는 AI·개발 서비스를 탐색하고 비교할 수 있도록 정보를 제공하는 서비스입니다.</p>
        <section><h2>1. 서비스의 성격</h2><p>NERDING이 제공하는 추천, 설명, 가격 및 기능 정보는 서비스 탐색을 돕기 위한 참고 정보입니다. 실제 요금, 제공 기능, 이용 가능 지역 및 약관은 연결되는 각 서비스의 최신 정보를 기준으로 합니다.</p></section>
        <section><h2>2. 외부 서비스</h2><p>NERDING에서 외부 서비스로 이동하면 해당 서비스의 이용약관과 개인정보처리방침이 적용됩니다. NERDING은 외부 서비스의 운영이나 정책 변경을 직접 통제하지 않습니다.</p></section>
        <section><h2>3. 제휴 및 광고</h2><p>NERDING은 일부 서비스에 대한 제휴 링크와 광고를 통해 운영 수익을 얻을 수 있습니다. 제휴 링크가 사용되는 경우 해당 사실을 이용자가 알 수 있도록 표시합니다.</p></section>
        <section><h2>4. 이용자의 의무</h2><p>이용자는 관계 법령과 본 약관을 준수해야 하며, 서비스의 정상적인 운영을 방해하는 과도한 자동화 요청이나 비정상적인 접근을 해서는 안 됩니다.</p></section>
        <section><h2>5. 정보의 정확성 및 변경</h2><p>외부 서비스의 가격·기능·정책은 변경될 수 있습니다. NERDING은 확인 가능한 정보를 바탕으로 관리하지만 외부 서비스의 모든 변경을 즉시 반영할 것을 보장하지 않습니다.</p></section>
        <section><h2>6. 서비스 변경 및 중단</h2><p>서비스 개선, 외부 데이터·서비스 변경, 시스템 점검 또는 장애 등의 사유로 일부 기능을 변경하거나 중단할 수 있습니다.</p></section>
        <section><h2>7. 저작권</h2><p>NERDING의 자체 디자인, 코드, 로고, 문구 및 자체 제작 콘텐츠는 관련 법령의 보호를 받습니다. 법령이나 별도 이용조건에서 허용하는 경우를 제외하고 무단 복제·배포할 수 없습니다.</p></section>
        <section><h2>8. 문의</h2><p>약관 관련 문의는 <a href="mailto:kjh9410065@gmail.com">kjh9410065@gmail.com</a>으로 보내주세요.</p></section>
        <p className="legalUpdated">시행일: 2026년 9월 19일</p>
      </article>
    </main>
  );
}
