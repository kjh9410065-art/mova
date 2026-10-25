// 각 페이지가 홈 대표주소를 상속하지 않도록 개별 주소를 선언합니다.
export const metadata = { title: "Markdown 표 생성기 | NERDING", description: "쉼표로 구분된 데이터를 Markdown 표로 간단히 생성하세요.", alternates: { canonical: "/tools/table" } };
export default function PageLayout({children}){return children;}
