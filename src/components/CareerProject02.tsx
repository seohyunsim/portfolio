import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { backofficePlatformProject } from "../config/backofficePlatform";
import Tooltip from "./Tooltip";

function CareerProject02() {
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
      className={`career-project-section career-project-section--02 ${isVisible ? "career-project-section--02-visible" : ""}`}
      aria-label="사내 백오피스 플랫폼 개발 프로젝트"
    >
      <article className="career-project-title career-project-title--02">
        <img src="/image/browser_3x2_v2.png" alt="" draggable="false" />
        <div className="career-project-title__content career-project-title__content--02">
          <span className="career-project-title__label">02</span>
          <h2>{backofficePlatformProject.title}</h2>
          <p>{backofficePlatformProject.role}</p>
          <ul className="found-tech-stack" aria-label="기술 스택">
            {backofficePlatformProject.techStack.map((technology) => (
              <li className="found-tech-stack__item" key={technology.name}>
                <Tooltip label={technology.name}>
                  <Icon
                    className="found-tech-stack__icon"
                    icon={technology.icon}
                    style={
                      technology.color ? { color: technology.color } : undefined
                    }
                    aria-hidden="true"
                  />
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
        <img
          className="career-project-title__gif career-project-title__gif--02"
          src="/gif/coding_guy_heart.gif"
          alt="하트와 함께 코딩하는 캐릭터 애니메이션"
          draggable="false"
        />
      </article>

      <article className="career-project-detail career-project-detail--02">
        <img src="/image/browser_1x1.png" alt="" draggable="false" />
        <div className="career-project-detail__content career-project-detail__content--02">
          <dl className="found-detail__overview">
            {backofficePlatformProject.overview.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.content}</dd>
              </div>
            ))}
          </dl>
          {backofficePlatformProject.sections.map((section) => (
            <section className="found-detail__section" key={section.title}>
              <h3>[{section.title}]</h3>
              <ul>
                {section.items.map((item, index) => (
                  <li key={`${section.title}-${index}`}>
                    {item.label && <strong>{item.label}: </strong>}
                    {item.content}
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

export default CareerProject02;
