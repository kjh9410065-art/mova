// 각 페이지가 홈 대표주소를 상속하지 않도록 개별 주소를 선언합니다.
export const metadata = { title: "Markdown 정리기 | NERDING", description: "Markdown 문서의 공백과 빈 줄을 정리해 가독성을 높이세요.", alternates: { canonical: "/tools/markdown" } };
export default function PageLayout({children}){return children;}
