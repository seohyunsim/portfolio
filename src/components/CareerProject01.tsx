import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { careerCards, careerSummary } from "../config/career";
import { designSystemProject } from "../config/designSystem";
import Tooltip from "./Tooltip";

function CareerProject01() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-12% 0px -18% 0px", threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`career-project-section ${isVisible ? "career-project-section--visible" : ""}`}
      aria-label="사내 디자인 시스템 구축 및 유지보수 프로젝트"
    >
      <article className="career-project-title">
        <img src="/image/browser_3x2_v2.png" alt="" draggable="false" />
        <div className="career-project-title__content career-project-title__content--before">
          <span className="career-browser__eyebrow">경력</span>
          <h2>{careerSummary.company}</h2>
          <p>{careerSummary.period}</p>
          <strong>{careerSummary.role}</strong>
        </div>
        <div className="career-project-title__content career-project-title__content--after">
          <span className="career-project-title__label">01</span>
          <h2>{designSystemProject.title}</h2>
          <p>{designSystemProject.role}</p>
          <ul className="found-tech-stack" aria-label="기술 스택">
            {designSystemProject.techStack.map((technology) => (
              <li className="found-tech-stack__item" key={technology.name}>
                <Tooltip label={technology.name}>
                  <Icon
                    className="found-tech-stack__icon"
                    icon={technology.icon}
                    style={technology.color ? { color: technology.color } : undefined}
                    aria-hidden="true"
                  />
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
        <img
          className="career-project-title__gif"
          src="/gif/coding_guy.gif"
          alt="코딩하는 캐릭터 애니메이션"
          width="269"
          height="350"
          draggable="false"
        />
      </article>

      <div className="career-project-ghosts" aria-hidden="true">
        {careerCards.map((card, index) => (
          <article className={`career-project-ghost career-project-ghost--${index + 1}`} key={card.title}>
            <img src="/image/browser_2x3.png" alt="" draggable="false" />
            <div className="career-card__content">
              <span className="career-card__number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{card.title}</h3>
            </div>
          </article>
        ))}
      </div>

      <article className="career-project-detail">
        <img src="/image/browser_1x1.png" alt="" draggable="false" />
        <div className="career-project-detail__content">
          <dl className="found-detail__overview">
            {designSystemProject.overview.map((item) => (
              <div key={item.label}><dt>{item.label}</dt><dd>{item.content}</dd></div>
            ))}
          </dl>
          {designSystemProject.sections.map((section) => (
            <section className="found-detail__section" key={section.title}>
              <h3>[{section.title}]</h3>
              <ul>
                {section.items.map((item, index) => (
                  <li key={`${section.title}-${index}`}>
                    {item.label && <strong>{item.label}: </strong>}{item.content}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </article>
    </section>
  );
}

export default CareerProject01;
