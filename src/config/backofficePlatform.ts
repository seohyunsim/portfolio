import { isDesignSystemProject } from "./designSystem";

const backofficePlatformProjectConfig: unknown = {
  title: "사내 백오피스 플랫폼 개발",
  role: "Frontend Engineer",
  techStack: [
    { name: "Turborepo", icon: "logos:turborepo-icon" },
    { name: "TypeScript", icon: "logos:typescript-icon" },
    { name: "Next.js", icon: "skill-icons:nextjs-light" },
    {
      name: "React Hook Form",
      icon: "simple-icons:reacthookform",
      color: "#ec5990",
    },
    { name: "React Query", icon: "logos:react-query-icon" },
    { name: "Recoil", icon: "logos:recoil-icon" },
    { name: "Context API", icon: "logos:react" },
    { name: "Emotion", icon: "skill-icons:emotion-light" },
    { name: "Storybook", icon: "logos:storybook-icon" },
  ],
  overview: [
    {
      label: "목적",
      content:
        "사내 플랫폼별 접근 권한 및 멤버십 어드민을 총괄 관리하는 백오피스 플랫폼",
    },
    {
      label: "핵심 역할",
      content: "FE 개발, 디자인 시스템 고도화, 빌드 패키지 및 개발 환경 고도화",
    },
  ],
  sections: [
    {
      title: "문제",
      items: [
        { content: "총 5개의 서비스를 단일 플랫폼으로 통합 필요" },
        {
          content:
            "플랫폼별 UI·스타일·비즈니스 로직이 중복되어 유지보수 비용 과다 발생",
        },
      ],
    },
    {
      title: "해결",
      items: [
        {
          label: "디자인 시스템 패키지화",
          content:
            "디자인 시스템 컴포넌트를 패키지화해 사용하면 어떨지 고민 후 제안하여 GitHub Private Package로 번들링 작업을 시도하고, 1차적으로 중복 코드 최소화에 기여",
        },
        {
          label: "Turborepo 모노레포 전환",
          content:
            "패키지 관리의 배포 → 업데이트 반영 과정에서 생산성 저하를 확인해 Turborepo 기반 모노레포 환경을 구축하고, 공용 컴포넌트·훅·유틸리티를 패키지 단위로 배포하며 빌드·배포 파이프라인 통합",
        },
        {
          label: "상태 관리 최적화",
          content:
            "Context API와 Recoil을 병행해 전역 상태와 페이지별 국소 상태를 구분 관리하고 비즈니스 로직의 일관성 유지",
        },
      ],
    },
    {
      title: "성과",
      items: [
        {
          content:
            "Turborepo로 5개 플랫폼의 개별 재설치 작업을 제거하고 업데이트 반영 프로세스 6단계 → 1단계(83%) 단축",
        },
        {
          content:
            "Thymeleaf SSR 로그인 UI를 전역 레이어·모듈화로 리팩터링해 QA 이슈 91건 → 22건(76%) 감소",
        },
        {
          content:
            "통합 어드민으로 조회·등록·수정·업로드·다운로드 권한을 메뉴 단위로 분리해 반복 운영 업무의 사용자 경험 개선",
        },
      ],
    },
  ],
};

if (!isDesignSystemProject(backofficePlatformProjectConfig)) {
  throw new Error("Invalid backoffice platform project configuration");
}

export const backofficePlatformProject = backofficePlatformProjectConfig;
