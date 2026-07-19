import { assetPath } from "../utils/assetPath";

export const personalBodyProject = {
  title: "PERSONAL BODY(퍼스널바디)",
  role: "기획 · 디자인 · UI/UX/FE 개발 전반 책임",
  techStack: [
    { name: "TypeScript", icon: "logos:typescript-icon" },
    { name: "React", icon: "logos:react" },
    { name: "Next.js", icon: "skill-icons:nextjs-light" },
    { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
    { name: "React Query", icon: "logos:react-query-icon" },
    { name: "Storybook", icon: "logos:storybook-icon" },
  ],
  overview: [
    {
      label: "목적",
      content:
        "골격·체형분석 기반 패션 스타일링 컨설팅을 제공하는 B2B/B2C 플랫폼",
    },
    {
      label: "핵심 역할",
      content:
        "1인 기획·디자인·FE 개발, 초기 기획부터 프로덕션 배포까지 전 과정 리드, 디자인 시스템·인증·성능·접근성 설계",
    },
  ],
  sections: [
    {
      title: "문제",
      items: [
        {
          content:
            "B2B(파트너 운영 효율·신뢰 기반 결과 전달)와 B2C(개인화된 컨설팅 경험·이탈 없는 사용 흐름)의 서로 다른 요구를 하나의 코드베이스에서 수용해야 하는 상황",
        },
        {
          content:
            "초기 v1 컬러 토큰이 B2B의 신뢰 중심 맥락과 B2C 1020 타겟의 공감·자기표현 정서를 동시에 충족하지 못하는 문제 존재",
        },
        {
          content:
            "장시간 분석 중 새로고침·네트워크 오류가 결제 신뢰를 훼손하거나 모바일 이미지 유실로 이어질 위험 존재",
        },
      ],
    },
    {
      title: "해결",
      items: [
        {
          label: "코드베이스 경계 분리",
          content:
            "_b2b/_b2c/_shared 라우트 단위 폴더 구조를 설계해 회사별 커스터마이징과 공용 로직 재사용을 동시에 확보하고, 기존 화면 깨짐을 최소화하기 위해 라우트 단위로 점진 마이그레이션 진행",
        },
        {
          label: "시맨틱 디자인 토큰 재설계",
          content:
            "색상값 중심 v1 토큰을 text/bg/status 역할 기반 시맨틱 토큰 v2 체계로 재설계하고, 타이포그래피·간격·상태 표현을 컴포넌트 규칙으로 표준화한 뒤 Storybook으로 문서화",
        },
        {
          label: "성능·접근성 최적화",
          content:
            "Three.js 3D 뷰어 dynamic import, IntersectionObserver·requestAnimationFrame 기반 스크롤 애니메이션, transform 전환과 TanStack Query 캐싱으로 렌더링 비용을 낮추고, ARIA·aria-live·prefers-reduced-motion으로 접근성 확보",
        },
        {
          label: "결제 신뢰성 보강",
          content:
            "idempotency key, active job 복구, 상태 기반 polling과 HEIC 변환·IndexedDB 임시 저장을 결합해 장시간 분석 중 새로고침·네트워크 오류에도 결제 신뢰와 모바일 이미지를 보호",
        },
      ],
    },
    {
      title: "성과",
      items: [
        {
          content:
            "오프라인 뷰티 컨설팅 업체 3곳과 B2B 제휴를 체결해 매장 기반 채널로 서비스 확장",
        },
        {
          content:
            "실제 판매 영업 대비 회원 전환율 30% 달성으로 오프라인 제휴 채널의 실효성 검증",
        },
        {
          content:
            "500px 이하 compact 규격부터 데스크톱까지 콘텐츠 밀도·터치 영역·타이포그래피가 자연스럽게 변하는 반응형 체계 구축",
        },
        {
          content:
            "초기 기획·디자인·개발부터 프로덕션 배포까지 전 과정을 단독으로 리드하며 실사용자 반응을 반영해 기능 고도화 진행 중",
        },
      ],
    },
  ],
  showcases: [
    {
      id: "b2b",
      src: assetPath("image/personal_body/b2b_captcha.png"),
      alt: "퍼스널바디 B2B 서비스 화면 모음",
    },
    {
      id: "b2c",
      src: assetPath("image/personal_body/b2c_captcha.png"),
      alt: "퍼스널바디 B2C 서비스 화면 모음",
    },
  ],
} as const;
