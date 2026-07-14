export const personalBodyProject = {
  title: "PERSONAL BODY(퍼스널바디)",
  role: "기획 · 디자인 · 개발 전반 책임, UI/UX/FE Engineer",
  techStack: [
    { name: "Turborepo", icon: "logos:turborepo-icon" },
    { name: "TypeScript", icon: "logos:typescript-icon" },
    { name: "Next.js", icon: "skill-icons:nextjs-light" },
    { name: "React", icon: "logos:react" },
    { name: "NextAuth.js", icon: "logos:auth0-icon" },
    { name: "React Query", icon: "logos:react-query-icon" },
    { name: "Recoil", icon: "logos:recoil-icon" },
    {
      name: "React Hook Form",
      icon: "simple-icons:reacthookform",
      color: "#ec5990",
    },
    { name: "Emotion", icon: "skill-icons:emotion-light" },
    { name: "Axios", icon: "logos:axios" },
    { name: "Storybook", icon: "logos:storybook-icon" },
  ],
  overview: [
    {
      label: "목적",
      content: "영상·이미지·에셋 검색을 지원하는 Mongddang 관리자 플랫폼",
    },
    {
      label: "핵심 역할",
      content:
        "1인 기획·디자인·FE 개발, UX 설계, 인증/권한 처리, 공통 UI·API 모듈 설계 및 유지보수",
    },
  ],
  sections: [
    {
      title: "문제",
      items: [
        {
          content:
            "영상/이미지/에셋 3개 미디어 타입이 동일한 검색-목록-상세 흐름을 가지지만, 개별 구현 시 화면별 중복 로직과 UX 편차 발생 가능",
        },
        {
          content:
            "검색 조건, 필터, 이미지 업로드 검색, 무한 스크롤, 상세 모달이 분리되면 사용자가 탐색 흐름을 잃는 문제 존재",
        },
        {
          content:
            "관리자 앱 전반에서 재사용 가능한 디자인 시스템, 인증/API 공통 계층, 일관된 오류/로딩 처리가 필요",
        },
      ],
    },
    {
      title: "해결",
      items: [
        {
          label: "UX 흐름 도식화 및 구현",
          content:
            "검색/필터/이미지 업로드 → URL Query 동기화 → RHF Form 상태 관리 → React Query 캐싱 → 무한 스크롤 → 상세 모달 흐름으로 통합해, 3개 미디어 화면 모두 동일한 검색 진입점·로딩·빈 결과·상세 확인 패턴을 제공",
        },
        {
          label: "컴포넌트 공통화",
          content:
            "SearchList, DetailModal, FilterableLayout, ImageUpload, useSearchMons, useInfiniteScroll, useImageUpload 등 7개 공통 컴포넌트/훅으로 검색 화면 구조를 모듈화",
        },
        {
          label: "플랫폼 공통화",
          content:
            "@repo/ui의 Header, Footer, Button, Spinner, ErrorFallback, GlobalStyle과 @repo/common의 인증/API/query 모듈을 활용해 디자인 시스템과 플랫폼 기반 로직을 분리 설계",
        },
      ],
    },
    {
      title: "성과",
      items: [
        {
          content:
            "영상/이미지/에셋 3개 화면에 SearchList + useSearchMons + useInfiniteScroll 공통 패턴 적용 → 검색 UX 일관성 100% 확보",
        },
        {
          content:
            "검색/상세/무한스크롤 핵심 공통 로직 329 LOC를 1회 구현해 3개 화면에 재사용 → 화면별 개별 구현 대비 약 658 LOC, 66.7% 반복 코드 절감",
        },
        {
          content:
            "공통 디자인 시스템의 6개 핵심 UI 모듈을 서비스 전반에 적용 → 주요 UI 상태의 디자인 시스템 적용률 100% 확보, 개발 생산성 약 30% 향상",
        },
        {
          content:
            "모든 기술 개발과 디자인/기획을 단독 수행하며 FE 구조, 디자인 시스템, 인증 흐름, 검색 UX까지 end-to-end 구축",
        },
      ],
    },
  ],
  showcases: [
    {
      id: "b2b",
      src: "/image/personal_body/b2b_captcha.png",
      alt: "퍼스널바디 B2B 서비스 화면 모음",
    },
    {
      id: "b2c",
      src: "/image/personal_body/b2c_captcha.png",
      alt: "퍼스널바디 B2C 서비스 화면 모음",
    },
  ],
} as const;
