import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { personalBodyProject } from "../config/personalBody";
import SectionDock from "./SectionDock";
import Tooltip from "./Tooltip";

function Found() {
  const sectionRef = useRef<HTMLElement | null>(null);
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
        rootMargin: "-12% 0px -18% 0px",
        threshold: 0.18,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`found-section ${isVisible ? "found-section--visible" : ""}`}
      aria-label="퍼스널바디 프로젝트"
    >
      <article className="found-browser found-browser--summary">
        <img
          className="found-browser__frame"
          src="/image/browser_3x2_v2.png"
          alt=""
          width="1284"
          height="780"
          draggable="false"
        />
        <div className="found-browser__content found-browser__content--summary">
          <h2>{personalBodyProject.title}</h2>
          <p>{personalBodyProject.role}</p>
          <ul className="found-tech-stack" aria-label="기술 스택">
            {personalBodyProject.techStack.map((technology) => (
              <li
                className="found-tech-stack__item"
                key={technology.name}
              >
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

      <article className="found-browser found-browser--detail">
        <img
          className="found-browser__frame"
          src="/image/browser_1x1.png"
          alt=""
          width="948"
          height="931"
          draggable="false"
        />
        <div className="found-browser__content found-browser__content--detail">
          <dl className="found-detail__overview">
            {personalBodyProject.overview.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.content}</dd>
              </div>
            ))}
          </dl>

          {personalBodyProject.sections.map((section) => (
            <section className="found-detail__section" key={section.title}>
              <h3>[{section.title}]</h3>
              <ul>
                {section.items.map((item, index) => (
                  <li key={`${section.title}-${index}`}>
                    {"label" in item && item.label && (
                      <strong>{item.label}: </strong>
                    )}
                    {item.content}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </article>

      <div className="found-showcases" aria-label="퍼스널바디 프로젝트 이미지">
        {personalBodyProject.showcases.map((showcase) => (
          <figure
            className={`found-showcases__item found-showcases__item--${showcase.id}`}
            key={showcase.id}
          >
            <img
              src={showcase.src}
              alt={showcase.alt}
              draggable="false"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Found;
