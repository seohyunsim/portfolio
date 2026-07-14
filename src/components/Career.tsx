import { useEffect, useRef, useState } from "react";
import { careerCards, careerSummary } from "../config/career";
import SectionDock from "./SectionDock";

function Career() {
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
      className={`career-section ${isVisible ? "career-section--visible" : ""}`}
      aria-label="자이언트스텝 경력 요약"
    >
      <article className="career-browser career-browser--title">
        <img
          className="career-browser__frame"
          src="/image/browser_3x2_v2.png"
          alt=""
          width="1284"
          height="780"
          draggable="false"
        />
        <div className="career-browser__content career-browser__content--title">
          <span className="career-browser__eyebrow">CAREER</span>
          <h2>{careerSummary.company}</h2>
          <p>{careerSummary.period}</p>
          <strong>{careerSummary.role}</strong>
        </div>
      </article>

      <div className="career-card-list">
        {careerCards.map((card, index) => (
          <article
            className={`career-browser career-card career-card--${index + 1}`}
            key={card.title}
          >
            <img
              className="career-browser__frame"
              src="/image/browser_2x3.png"
              alt=""
              width="912"
              height="1170"
              draggable="false"
            />
            <div className="career-browser__content career-card__content">
              <span className="career-card__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{card.title}</h3>
              <ul>
                {card.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <SectionDock />
    </section>
  );
}

export default Career;
