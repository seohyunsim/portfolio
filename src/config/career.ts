export const careerSummary = {
  company: "GIANTSTEP",
  period: "2023.01 - 2026.03 · 약 3년 2개월",
  role: "웹 플랫폼 프론트엔드 개발",
} as const;

export const careerCards = [
  {
    title: "사내 디자인 시스템 구축 및 유지보수",
    points: [
      "아토믹 디자인 기반 컴포넌트 시스템을 설계하고 RHF, Storybook, TSDoc과 결합해 재사용성과 문서화를 강화했습니다.",
      "ESM 전환, SVG 컴포넌트화, GitHub Packages, GitHub Actions 기반 배포 자동화로 패키지 경량화와 유지보수성을 개선했습니다.",
      "패키지 크기 310KB → 133KB, 신규 플랫폼당 약 14,000줄 감소, 컴포넌트 문의 0건 수준으로 개선했습니다.",
    ],
  },
  {
    title: "사내 자체 백오피스 플랫폼 개발",
    points: [
      "5개 서비스를 단일 플랫폼으로 통합하기 위한 백오피스 프론트엔드와 공통 UI/API 구조를 고도화했습니다.",
      "Turborepo 모노레포 환경을 구축하고 공용 컴포넌트·훅·유틸리티를 패키지 단위로 관리했습니다.",
      "개발 비용 약 80% 절감, 중복 코드 제거율 3.5배 증가, 빌드 속도 8분 → 47초 단축을 달성했습니다.",
    ],
  },
  {
    title: "사내외 프로젝트 참여",
    points: [
      "PRETCOORD 멤버십 어드민, Amazon Alexa Kinetic Typography prototype, Kampers Teaser, AI 모션 캡처 데이터 뷰어에 참여했습니다.",
      "인증, 다국어, 인터랙티브 UI, 성능 최적화, 협업 프로세스 개선까지 프로젝트별 문제 해결에 집중했습니다.",
      "QA 이슈 91건 → 22건, FPS 8 → 60 안정화, 커스텀 작업 시간 약 85% 단축에 기여했습니다.",
    ],
  },
] as const;
