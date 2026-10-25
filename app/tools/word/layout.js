// 각 페이지가 홈 대표주소를 상속하지 않도록 개별 주소를 선언합니다.
export const metadata = { title: "텍스트 분석기 | NERDING", description: "글자 수·단어 수·줄 수와 한글 글자 수를 확인하세요.", alternates: { canonical: "/tools/word" } };
export default function PageLayout({children}){return children;}
