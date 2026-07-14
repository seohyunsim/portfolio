import { useEffect, useRef, useState } from "react";
import { personalProjects } from "../config/personalProjects";

function PersonalProject() {
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
      className={`career-project-section personal-project ${isVisible ? "personal-project--visible" : ""}`}
      aria-label="개인 프로젝트"
    >
      <article className="career-project-title personal-project__title">
        <img src="/image/browser_3x2_v2.png" alt="" draggable="false" />
        <div className="career-project-title__content personal-project__title-content">
          <h2>개인 프로젝트</h2>
        </div>
      </article>

      <article className="career-project-detail personal-project__detail">
        <img src="/image/browser_1x1.png" alt="" draggable="false" />
        <div className="career-project-detail__content personal-project__content">
          {personalProjects.map((project) => (
            <article className="personal-project__item" key={project.title}>
              <header className="personal-project__item-header">
                <h3>{project.title}</h3>
                <time>{project.period}</time>
              </header>
              {project.achievement && <strong className="personal-project__achievement">{project.achievement}</strong>}
              <p className="personal-project__stack">{project.techStack.join(" · ")}</p>
              <p className="personal-project__description">{project.description}</p>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}

export default PersonalProject;
