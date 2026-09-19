import Link from "next/link";
import "../legal.css";

export const metadata = {
  title: "제휴·광고 안내 | NERDING",
  description: "NERDING 제휴 링크와 광고 운영 안내"
};

export default function AffiliatePage() {
  return (
    <main className="legalPage">
      <header className="legalHeader"><Link href="/">NERDING</Link><Link href="/">홈으로</Link></header>
      <article className="legalArticle">
        <p className="legalKicker">PARTNERSHIP & ADS</p>
        <h1>제휴·광고 안내</h1>
        <p className="legalLead">NERDING의 제휴 링크, 광고 및 경제적 이해관계를 안내합니다.</p>
        <section><h2>1. 제휴 링크</h2><p>일부 외부 서비스 링크는 제휴 링크일 수 있으며, 이용자가 해당 링크를 통해 가입하거나 결제하는 경우 NERDING 운영자에게 수수료가 발생할 수 있습니다.</p></section>
        <section><h2>2. 광고</h2><p>서비스 운영 과정에서 광고가 게재될 수 있습니다. 실제 광고가 적용되는 경우 이용자가 광고임을 알 수 있도록 관련 기준에 따라 표시합니다.</p></section>
        <section><h2>3. 정보의 독립성</h2><p>제휴 또는 광고 관계가 있다는 사실만으로 외부 서비스의 품질이나 이용조건을 보장하는 것은 아닙니다. 실제 가격·기능·정책은 각 외부 서비스의 최신 정보를 확인해야 합니다.</p></section>
        <section><h2>4. 변경 안내</h2><p>제휴 구조나 광고 운영 방식이 변경되면 실제 운영 내용에 맞춰 이 페이지를 업데이트합니다.</p></section>
        <p className="legalUpdated">시행일: 2026년 9월 19일</p>
      </article>
    </main>
  );
}
