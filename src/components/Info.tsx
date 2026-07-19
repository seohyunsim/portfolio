import { Icon } from "@iconify/react";
import { useEffect, useState, type RefObject } from "react";
import SectionDock from "./SectionDock";
import Tooltip from "./Tooltip";
import { assetPath } from "../utils/assetPath";

const representativeTechStack = [
  { name: "TypeScript", icon: "logos:typescript-icon" },
  { name: "React", icon: "logos:react" },
  { name: "Next.js", icon: "skill-icons:nextjs-light" },
  { name: "Turborepo", icon: "logos:turborepo-icon" },
  { name: "React Query", icon: "logos:react-query-icon" },
  {
    name: "React Hook Form",
    icon: "simple-icons:reacthookform",
    color: "#ec5990",
  },
  { name: "Emotion", icon: "skill-icons:emotion-light" },
  { name: "Storybook", icon: "logos:storybook-icon" },
] as const;

const timeline = [
  {
    period: "2026.04",
    company: "PERSONAL BODY",
    role: "창업, 기획 · 디자인 · 개발 전반 책임, UI/UX/FE Engineer",
  },
  {
    period: "2023.01 - 2026.04",
    company: "자이언트스텝",
    role: "사내 어드민 플랫폼 프론트엔드 개발, 디자인 시스템 구축",
  },
  {
    period: "2019.02 - 2022.02",
    company: "인덕대학교",
    role: "컴퓨터전자공학과",
  },
];

type InfoProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

function Info({ sectionRef }: InfoProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "-15% 0px -20% 0px",
        threshold: 0.2,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section
      ref={sectionRef}
      className={`timeline-section ${
        isVisible ? "timeline-section--visible" : ""
      }`}
      aria-label="프로필 및 경력"
    >
      <div className="browser-composition">
        <article className="browser-window browser-window--who">
          <img
            className="browser-window__frame"
            src={assetPath("image/browser_3x2_v2.png")}
            alt=""
            width="1284"
            height="780"
            draggable="false"
          />
          <div className="browser-window__content browser-window__content--who">
            <h2 className="browser-window__title">
              WHO I <span className="browser-window__selection">AM ?</span>
            </h2>
          </div>
        </article>

        <article className="browser-window browser-window--profile">
          <img
            className="browser-window__frame"
            src={assetPath("image/browser_2x3.png")}
            alt=""
            width="912"
            height="1170"
            draggable="false"
          />
          <div className="browser-window__content browser-window__content--profile">
            <img
              className="browser-window__profile"
              src={assetPath("image/profile_v2.png")}
              alt="심서현 프로필 일러스트"
              width="678"
              height="1344"
              draggable="false"
            />
          </div>
        </article>

        <article className="browser-window browser-window--timeline">
          <img
            className="browser-window__frame"
            src={assetPath("image/browser_1x1.png")}
            alt=""
            width="948"
            height="931"
            draggable="false"
          />
          <div className="browser-window__content browser-window__content--timeline">
            <p className="timeline__headline">
              심서현 | 4년차 프론트엔드 개발자
            </p>
            <ul className="timeline" aria-label="경력 타임라인">
              {timeline.map((item) => (
                <li key={`${item.company}-${item.period}`}>
                  <time>{item.period}</time>
                  <span className="timeline__content">
                    <span className="timeline__title">{item.company}</span>
                    <span className="timeline__description">{item.role}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="timeline-award">
              <span className="timeline-award__icon" aria-hidden="true">
                🏆
              </span>
              <span className="timeline-award__body">
                <strong>2022.12 공개SW 개발자대회 은상</strong>
                <span className="timeline-award__description">
                  developer portfolio 관련 디자인 시스템 구축
                </span>
              </span>
            </div>
          </div>
        </article>

        <article className="browser-window browser-window--tech-stack">
          <img
            className="browser-window__frame"
            src={assetPath("image/browser_3x2_v2.png")}
            alt=""
            width="1284"
            height="780"
            draggable="false"
          />
          <div className="browser-window__content browser-window__content--tech-stack">
            <h2 className="browser-window__title">CORE STACK</h2>
            <ul
              className="found-tech-stack info-tech-stack"
              aria-label="대표 기술 스택"
            >
              {representativeTechStack.map((technology) => (
                <li className="found-tech-stack__item" key={technology.name}>
                  <Tooltip label={technology.name}>
                    <Icon
                      className="found-tech-stack__icon"
                      icon={technology.icon}
                      style={
                        "color" in technology
                          ? { color: technology.color }
                          : undefined
                      }
                      aria-hidden="true"
                    />
                  </Tooltip>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Info;
