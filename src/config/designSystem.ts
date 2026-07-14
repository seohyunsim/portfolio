export type ProjectTechnology = {
  name: string;
  icon: string;
  color?: string;
};

export type ProjectOverviewItem = {
  label: string;
  content: string;
};

export type ProjectSectionItem = {
  label?: string;
  content: string;
};

export type ProjectSection = {
  title: string;
  items: ProjectSectionItem[];
};

export type DesignSystemProject = {
  title: string;
  role: string;
  techStack: ProjectTechnology[];
  overview: ProjectOverviewItem[];
  sections: ProjectSection[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const hasString = (value: Record<string, unknown>, key: string) =>
  typeof value[key] === "string";

export function isDesignSystemProject(
  value: unknown,
): value is DesignSystemProject {
  if (
    !isRecord(value) ||
    !hasString(value, "title") ||
    !hasString(value, "role")
  ) {
    return false;
  }

  const { techStack, overview, sections } = value;

  return (
    Array.isArray(techStack) &&
    techStack.every(
      (technology) =>
        isRecord(technology) &&
        hasString(technology, "name") &&
        hasString(technology, "icon") &&
        (technology.color === undefined ||
          typeof technology.color === "string"),
    ) &&
    Array.isArray(overview) &&
    overview.every(
      (item) =>
        isRecord(item) &&
        hasString(item, "label") &&
        hasString(item, "content"),
    ) &&
    Array.isArray(sections) &&
    sections.every(
      (section) =>
        isRecord(section) &&
        hasString(section, "title") &&
        Array.isArray(section.items) &&
        section.items.every(
          (item) =>
            isRecord(item) &&
            hasString(item, "content") &&
            (item.label === undefined || typeof item.label === "string"),
        ),
    )
  );
}

const designSystemProjectConfig: unknown = {
  title: "사내 디자인 시스템 구축 및 유지보수",
  role: "Frontend Engineer",
  techStack: [
    { name: "TypeScript", icon: "logos:typescript-icon" },
    { name: "React", icon: "logos:react" },
    { name: "Emotion", icon: "skill-icons:emotion-light" },
    { name: "Storybook", icon: "logos:storybook-icon" },
    { name: "npm", icon: "logos:npm-icon" },
    { name: "GitHub Packages", icon: "simple-icons:github", color: "#181717" },
  ],
  overview: [
    {
      label: "목적",
      content: "백오피스 플랫폼의 디자인 시스템 패키지 최적화 시도",
    },
    {
      label: "핵심 역할",
      content:
        "단독 개발 참여, 개발 환경 개선, 패키지 경량화, 패키지 빌드 및 배포",
    },
  ],
  sections: [
    {
      title: "문제",
      items: [
        { content: "초기 모듈 형식을 CommonJS로 설정해 Tree Shaking 불가능" },
        {
          content:
            "정적 리소스 관리 방식으로 인해 빌드 패키지 크기 과부화로 최적화 필요",
        },
        {
          content:
            "패키지 수정 시 매번 수동 배포 스크립트를 실행해야 하는 비효율적 프로세스 존재",
        },
      ],
    },
    {
      title: "해결",
      items: [
        {
          label: "ESM 전환",
          content: "Tree Shaking 최적화 처리를 위해 모듈 형식을 ESM으로 전환",
        },
        {
          label: "SVG 관리 최적화",
          content:
            "정적 리소스를 최소화하고자 기존 Asset 기반 SVG 관리 방식을 SVG 컴포넌트 관리 형태로 변환하고, 리팩터링 리소스를 줄이기 위해 SVGR CLI로 React Component 형태로 동시 변환",
        },
        {
          label: "GitHub Packages 도입",
          content:
            "저비용과 보안성을 동시에 고려해 GitHub Packages를 선택하고 npm private 패키지 환경 구축",
        },
        {
          label: "CI/CD 자동화",
          content:
            "GitHub Packages 패키지 환경에 맞춰 GitHub Actions 기반 CI/CD 파이프라인 구축",
        },
      ],
    },
    {
      title: "성과",
      items: [
        {
          content:
            "디자인 시스템 패키지를 통한 플랫폼 구축 최적화로 신규 플랫폼당 약 14,000줄 코드량 감소",
        },
        {
          content:
            "모듈 최적화 및 Tree Shaking 적용으로 빌드 패키지 크기 310KB → 133KB (57% 감소)",
        },
        {
          content:
            "Storybook + TSDoc 기반 전사 문서화 체계 구축 → 컴포넌트 관련 문의 0건 수준으로 감소, 신규 인력 온보딩과 유지보수 효율성 향상",
        },
      ],
    },
  ],
};

if (!isDesignSystemProject(designSystemProjectConfig)) {
  throw new Error("Invalid design system project configuration");
}

export const designSystemProject = designSystemProjectConfig;
