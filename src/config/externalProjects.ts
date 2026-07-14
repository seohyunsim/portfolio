import type { ProjectTechnology } from "./designSystem";

export type ExternalProjectCard = {
  title: string;
  period: string;
  role: string;
  techStack: ProjectTechnology[];
  points: string[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export function isExternalProjectCard(
  value: unknown,
): value is ExternalProjectCard {
  return (
    isRecord(value) &&
    typeof value.title === "string" &&
    typeof value.period === "string" &&
    typeof value.role === "string" &&
    Array.isArray(value.techStack) &&
    value.techStack.every(
      (technology) =>
        isRecord(technology) &&
        typeof technology.name === "string" &&
        typeof technology.icon === "string" &&
        (technology.color === undefined || typeof technology.color === "string"),
    ) &&
    Array.isArray(value.points) &&
    value.points.every((point) => typeof point === "string")
  );
}

const externalProjectsConfig: unknown = [
  {
    title: "Amazon Alexa Kinetic Typography",
    period: "2024.10 - 2024.12",
    role: "UI/UX · Frontend 단독 개발",
    techStack: [
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "React", icon: "logos:react" },
      { name: "styled-components", icon: "skill-icons:styledcomponents" },
      { name: "Context API", icon: "logos:react" },
      { name: "Storybook", icon: "logos:storybook-icon" },
    ],
    points: [
      "응답 Text·Emotion을 Hash Table로 매핑해 감정에 반응하는 Kinetic Typography UI를 설계했습니다.",
      "20여 개 속성의 직관적인 커스터마이징과 CSV 테마 저장·불러오기로 전 연령대의 접근성을 개선했습니다.",
      "반복 작업을 30–40초에서 5초 이내로 줄여 약 85% 단축하고 기획부터 구현까지 전 과정을 수행했습니다.",
    ],
  },
  {
    title: "Kampers Teaser",
    period: "2024.06 - 2024.10",
    role: "Frontend · Interactive UI",
    techStack: [
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "Next.js", icon: "skill-icons:nextjs-light" },
      { name: "vanilla-extract", icon: "simple-icons:vanillaextract", color: "#f786ad" },
      { name: "i18n", icon: "simple-icons:i18next", color: "#26a69a" },
    ],
    points: [
      "글로벌 게임의 브랜드 경험을 전달하는 몰입형 티저 페이지와 풀 페이지 인터랙션을 개발했습니다.",
      "빌드 타임 CSS인 vanilla-extract를 적용해 런타임 스타일 비용을 줄이고 초기 로딩 성능을 확보했습니다.",
      "i18n 언어별 라우팅과 GA 행동 분석을 구축해 글로벌 접근성과 마케팅 데이터 활용 기반을 마련했습니다.",
    ],
  },
  {
    title: "AI 모션 캡처 데이터 뷰어",
    period: "2023.10 - 2024.05",
    role: "UI/UX · Frontend · 성능 최적화",
    techStack: [
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "Next.js", icon: "skill-icons:nextjs-light" },
      { name: "Zustand", icon: "devicon:zustand" },
      { name: "Emotion", icon: "skill-icons:emotion-light" },
    ],
    points: [
      "대규모 Facial 모션 수치를 비교·탐색할 수 있는 실시간 차트 중심의 정보 구조와 UI를 설계했습니다.",
      "memo와 IntersectionObserver로 불필요한 렌더링을 줄여 FPS를 8에서 60으로 안정화했습니다.",
      "PR 템플릿과 Discussion 피드백 흐름을 제안해 기획·디자인 공백을 보완하고 협업 생산성을 높였습니다.",
    ],
  },
];

if (
  !Array.isArray(externalProjectsConfig) ||
  !externalProjectsConfig.every(isExternalProjectCard)
) {
  throw new Error("Invalid external projects configuration");
}

export const externalProjects = externalProjectsConfig;
