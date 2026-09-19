import Link from "next/link";
import "../legal.css";

export const metadata = {
  title: "개인정보처리방침 | NERDING",
  description: "NERDING 개인정보처리방침"
};

export default function PrivacyPage() {
  return (
    <main className="legalPage">
      <header className="legalHeader"><Link href="/">NERDING</Link><Link href="/">홈으로</Link></header>
      <article className="legalArticle">
        <p className="legalKicker">PRIVACY</p>
        <h1>개인정보처리방침</h1>
        <p className="legalLead">NERDING은 서비스 이용에 필요한 범위에서만 정보를 처리하며, 이용자의 개인정보를 불필요하게 수집하지 않습니다.</p>
        <section><h2>1. 개인정보처리자 및 문의</h2><p>NERDING은 현재 개인 운영 형태로 운영됩니다. 개인정보 관련 문의 및 권리행사 요청은 <a href="mailto:kjh9410065@gmail.com">kjh9410065@gmail.com</a>으로 보내주세요.</p></section>
        <section><h2>2. 수집·처리하는 정보</h2><p>NERDING은 별도의 회원가입 없이 대부분의 기능을 이용할 수 있습니다. 즐겨찾기와 비교 목록 등 일부 설정은 이용자의 브라우저 저장공간에 저장될 수 있습니다.</p><p>문의 이메일을 이용하는 경우 이용자가 직접 제공한 이메일 주소와 문의 내용이 답변 및 처리 목적으로 사용될 수 있습니다.</p></section>
        <section><h2>3. 자동 처리 정보</h2><p>웹서비스 운영 과정에서 접속 시각, IP 주소, 브라우저·기기 정보, 오류기록 등 기술적 정보가 호스팅·보안 인프라를 통해 처리될 수 있습니다.</p></section>
        <section><h2>4. 외부 서비스 및 광고</h2><p>NERDING은 서비스 추천과 운영을 위해 외부 AI·개발 서비스로 연결되는 링크를 제공할 수 있습니다. Google AdSense 등의 광고 서비스를 사용하는 경우 광고 제공 과정에서 쿠키 또는 유사 기술이 사용될 수 있습니다.</p></section>
        <section><h2>5. 제휴 링크 및 경제적 이해관계</h2><p>일부 외부 서비스 링크는 제휴 링크일 수 있습니다. 제휴 링크를 통해 가입·결제 등이 이루어지는 경우 NERDING 운영자에게 수수료가 발생할 수 있으며, 해당 사실은 서비스 화면 또는 별도 안내에서 표시합니다.</p></section>
        <section><h2>6. 이용 목적 및 보유·파기</h2><p>처리 정보는 서비스 제공, 문의 대응, 오류 개선, 보안 및 광고·제휴 운영에 필요한 범위에서 사용합니다. 처리 목적이 달성되거나 보유 필요성이 없어지면 관련 법령이 정한 경우를 제외하고 지체 없이 삭제합니다.</p></section>
        <section><h2>7. 제3자 제공 및 처리위탁</h2><p>원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만 호스팅·클라우드·보안·이메일·광고 등 서비스 운영에 필요한 외부 서비스에서 개인정보 처리가 발생할 수 있으며, 실제 적용되는 서비스와 범위에 맞춰 관련 사항을 공개합니다.</p></section>
        <section><h2>8. 정보주체의 권리</h2><p>이용자는 관련 법령이 정하는 범위에서 자신의 개인정보에 대한 열람, 정정·삭제, 처리정지 등을 요청할 수 있습니다. 요청은 위 문의 이메일로 접수합니다.</p></section>
        <section><h2>9. 국외 이전</h2><p>클라우드·호스팅·이메일·광고 등 외부 서비스의 처리 위치에 따라 개인정보의 국외 이전이 발생할 수 있습니다. 실제 이전이 발생하는 서비스가 확인되는 경우 이전 관련 사항을 본 방침에 반영합니다.</p></section>
        <section><h2>10. 방침의 변경</h2><p>법령, 서비스 또는 개인정보 처리 방식이 변경되면 본 페이지를 업데이트하고 시행일을 표시합니다.</p></section>
        <p className="legalUpdated">시행일: 2026년 9월 19일</p>
      </article>
    </main>
  );
}
