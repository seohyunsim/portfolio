export type PersonalProjectItem = {
  title: string;
  period: string;
  achievement?: string;
  techStack: string[];
  description: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export function isPersonalProjectItem(value: unknown): value is PersonalProjectItem {
  return (
    isRecord(value) &&
    typeof value.title === "string" &&
    typeof value.period === "string" &&
    (value.achievement === undefined || typeof value.achievement === "string") &&
    Array.isArray(value.techStack) &&
    value.techStack.every((technology) => typeof technology === "string") &&
    typeof value.description === "string"
  );
}

const personalProjectsConfig: unknown = [
  {
    title: "캘로아",
    period: "2025.04 - 2025.07",
    achievement: "사용자 900명 돌파 / 주간 메인 API 요청 13k 달성",
    techStack: ["TypeScript", "Next.js 15", "MUI", "Zustand", "React Hook Form", "React Query", "Zod", "Storybook", "Vercel"],
    description: "로스트아크 게임 일정 관리 플랫폼",
  },
  {
    title: "dev-portfolio",
    period: "2022.03 - 2022.09",
    achievement: "🏆 2022 공개SW 개발자대회 은상",
    techStack: ["TypeScript", "React", "styled-components", "npm"],
    description: "쉽고 빠르게 포트폴리오를 만들 수 있는 npm 오픈소스 라이브러리",
  },
  {
    title: "Kitty Collector",
    period: "2022.06 - 2022.07",
    techStack: ["TypeScript", "React", "styled-components", "Vercel"],
    description: "화살표에 맞춰 고양이들을 옮기는 게임",
  },
  {
    title: "동그라미",
    period: "2021.08 - 2021.12",
    techStack: ["JavaScript ES6", "React", "Next.js", "React Redux", "SCSS"],
    description: "교내 동아리 커뮤니티 서비스",
  },
];

if (!Array.isArray(personalProjectsConfig) || !personalProjectsConfig.every(isPersonalProjectItem)) {
  throw new Error("Invalid personal projects configuration");
}

export const personalProjects = personalProjectsConfig;
