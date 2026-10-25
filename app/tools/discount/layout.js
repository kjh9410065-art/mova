// 각 페이지가 홈 대표주소를 상속하지 않도록 개별 주소를 선언합니다.
export const metadata = { title: "연속 할인 계산기 | NERDING", description: "여러 할인율을 순서대로 적용한 최종 가격과 실질 할인율을 계산하세요.", alternates: { canonical: "/tools/discount" } };
export default function PageLayout({children}){return children;}
