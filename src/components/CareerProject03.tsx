import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { externalProjects } from "../config/externalProjects";
import Tooltip from "./Tooltip";

function CareerProject03() {
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
      className={`career-section career-project03 ${isVisible ? "career-project03--visible" : ""}`}
      aria-label="사내외 프로젝트 참여"
    >
      <article className="career-browser career-browser--title career-project03__title">
        <img
          className="career-browser__frame"
          src="/image/browser_3x2_v2.png"
          alt=""
          draggable="false"
        />
        <div className="career-browser__content career-browser__content--title">
          <span className="career-project-title__label">03</span>
          <h2>사내외 프로젝트 참여</h2>
          <strong>UI/UX · Frontend Engineer</strong>
        </div>
      </article>

      <div className="career-card-list career-project03__card-list">
        {externalProjects.map((project, index) => (
          <article
            className={`career-browser career-card career-project03__card career-project03__card--${index + 1}`}
            key={project.title}
          >
            <img
              className="career-browser__frame"
              src="/image/browser_2x3.png"
              alt=""
              draggable="false"
            />
            <div className="career-browser__content career-card__content career-project03__card-content">
              <span className="career-card__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{project.title}</h3>
              <p className="career-project03__meta">
                {project.period} · {project.role}
              </p>
              <ul
                className="found-tech-stack career-project03__stack"
                aria-label="기술 스택"
              >
                {project.techStack.map((technology) => (
                  <li className="found-tech-stack__item" key={technology.name}>
                    <Tooltip label={technology.name}>
                      <Icon
                        className="found-tech-stack__icon"
                        icon={technology.icon}
                        style={
                          technology.color
                            ? { color: technology.color }
                            : undefined
                        }
                        aria-hidden="true"
                      />
                    </Tooltip>
                  </li>
                ))}
              </ul>
              <ul>
                {project.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CareerProject03;
