// 각 페이지가 홈 대표주소를 상속하지 않도록 개별 주소를 선언합니다.
export const metadata = { title: "UUID 생성기 | NERDING", description: "개발에 사용할 UUID를 여러 개 생성하고 복사하세요.", alternates: { canonical: "/tools/uuid" } };
export default function PageLayout({children}){return children;}
