// 각 페이지가 홈 대표주소를 상속하지 않도록 개별 주소를 선언합니다.
export const metadata = { alternates: { canonical: "/favorites" } };
export default function PageLayout({children}){return children;}
