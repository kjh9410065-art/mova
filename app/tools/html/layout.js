// 각 페이지가 홈 대표주소를 상속하지 않도록 개별 주소를 선언합니다.
export const metadata = { title: "HTML 정리기 | NERDING", description: "HTML 코드를 보기 좋게 정리하거나 압축하는 웹 도구입니다.", alternates: { canonical: "/tools/html" } };
export default function PageLayout({children}){return children;}
