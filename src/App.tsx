import { useEffect, useRef, useState, type CSSProperties } from "react";

type CursorPosition = CSSProperties & {
  "--cursor-start-x": string;
  "--cursor-start-y": string;
  "--cursor-target-x": string;
  "--cursor-target-y": string;
};

const timeline = [
  {
    period: "2026.01",
    company: "PERSONAL BODY",
    role: "창업, 기획 · 디자인 · 개발 · 영업 · 마케팅 전반 책임, UI/UX/FE Engineer",
  },
  {
    period: "2023.01 - 2026.04",
    company: "자이언트스텝",
    role: "사내 어드민 플랫폼 프론트엔드 개발, 디자인 시스템 구축",
  },
  {
    period: "2022.12",
    company: "공개SW 개발자대회 은상",
    role: "developer portfolio 관련 디자인 시스템 구축",
  },
  {
    period: "2019.02 - 2022.02",
    company: "인덕대학교",
    role: "컴퓨터전자공학과",
  },
];

function App() {
  const heroRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLElement | null>(null);
  const notificationRef = useRef<HTMLSpanElement | null>(null);
  const isCursorMovingRef = useRef(false);
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);
  const [spotlightValue, setSpotlightValue] = useState("");
  const [isSpotlightFocused, setIsSpotlightFocused] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<CursorPosition | null>(
    null,
  );

  useEffect(() => {
    if (isSpotlightFocused) {
      return undefined;
    }

    const prefix = "Frontend Engineer with ";
    const animatedWord = "UI/UX";
    const currentWord = spotlightValue.startsWith(prefix)
      ? spotlightValue.slice(prefix.length)
      : "";
    const isComplete = currentWord === animatedWord;
    const isDeleting = spotlightValue.endsWith("\u200b");
    const visibleValue = spotlightValue.replace("\u200b", "");
    const visibleWord = visibleValue.startsWith(prefix)
      ? visibleValue.slice(prefix.length)
      : "";

    let delay = 115;
    let nextValue = visibleValue;

    if (!visibleValue) {
      delay = 700;
      nextValue = prefix;
    } else if (isComplete && !isDeleting) {
      delay = 1400;
      nextValue = `${visibleValue}\u200b`;
    } else if (isDeleting) {
      delay = 75;
      nextValue = `${prefix}${visibleWord.slice(0, -1)}${
        visibleWord.length > 1 ? "\u200b" : ""
      }`;
    } else if (visibleWord.length < animatedWord.length) {
      nextValue = `${prefix}${animatedWord.slice(0, visibleWord.length + 1)}`;
    }

    const timeout = window.setTimeout(
      () => setSpotlightValue(nextValue),
      delay,
    );

    return () => window.clearTimeout(timeout);
  }, [isSpotlightFocused, spotlightValue]);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) {
      return undefined;
    }

    const handleWheel = (event: WheelEvent) => {
      const notification = notificationRef.current;
      const heroRect = hero.getBoundingClientRect();

      if (isCursorMovingRef.current) {
        event.preventDefault();
        return;
      }

      if (
        event.deltaY <= 0 ||
        !notification ||
        heroRect.top < -2 ||
        heroRect.bottom <= window.innerHeight * 0.5
      ) {
        return;
      }

      event.preventDefault();

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        timelineRef.current?.scrollIntoView({ behavior: "auto" });
        return;
      }

      const notificationRect = notification.getBoundingClientRect();
      isCursorMovingRef.current = true;
      setCursorPosition({
        "--cursor-start-x": `${window.innerWidth + 20}px`,
        "--cursor-start-y": `${Math.max(160, window.innerHeight * 0.48)}px`,
        "--cursor-target-x": `${notificationRect.left + notificationRect.width / 2 - 7}px`,
        "--cursor-target-y": `${notificationRect.top + notificationRect.height / 2 - 2}px`,
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  const handleCursorArrival = () => {
    timelineRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(() => {
      setCursorPosition(null);
      isCursorMovingRef.current = false;
    }, 750);
  };

  useEffect(() => {
    const node = timelineRef.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTimelineVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "-15% 0px -20% 0px",
        threshold: 0.2,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="portfolio">
      <section
        ref={heroRef}
        className="hero-banner"
        aria-labelledby="portfolio-title"
      >
        <label className="spotlight-search">
          <span className="sr-only">Spotlight 검색</span>
          <span className="spotlight-search__icon" aria-hidden="true" />
          <input
            type="text"
            value={spotlightValue.replace("\u200b", "")}
            placeholder="Search Spotlight"
            autoComplete="off"
            spellCheck="false"
            onChange={(event) => setSpotlightValue(event.target.value)}
            onFocus={() => setIsSpotlightFocused(true)}
            onBlur={() => {
              setSpotlightValue("");
              setIsSpotlightFocused(false);
            }}
          />
        </label>
        <div className="folder-card">
          <img
            className="folder-card__image"
            src="/image/file.png"
            alt=""
            width="470"
            height="395"
            draggable="false"
          />
          <h1 id="portfolio-title" className="folder-card__title">
            Portfolio
          </h1>
        </div>
        <div className="hero-dock" aria-label="애플리케이션 Dock">
          <img
            className="hero-dock__image"
            src="/image/dock_bar.png"
            alt=""
            width="1536"
            height="1024"
            draggable="false"
          />
          <span
            ref={notificationRef}
            className="hero-dock__notification"
            aria-label="알림 1개"
          >
            1
          </span>
        </div>
        {cursorPosition && (
          <img
            className="scroll-cursor"
            src="/image/cursor.png"
            alt=""
            width="512"
            height="512"
            style={cursorPosition}
            onAnimationEnd={handleCursorArrival}
            draggable="false"
          />
        )}
      </section>

      <section
        ref={timelineRef}
        className={`timeline-section ${
          isTimelineVisible ? "timeline-section--visible" : ""
        }`}
        aria-labelledby="timeline-title"
      >
        <div className="browser-composition">
          <article className="browser-window browser-window--who">
            <img
              className="browser-window__frame"
              src="/image/browser_3x2_v2.png"
              alt=""
              width="1284"
              height="780"
              draggable="false"
            />
            <div className="browser-window__content browser-window__content--who">
              <h2 className="browser-window__title">WHO I AM ?</h2>
            </div>
          </article>

          <article className="browser-window browser-window--profile">
            <img
              className="browser-window__frame"
              src="/image/browser_2x3.png"
              alt=""
              width="912"
              height="1170"
              draggable="false"
            />
            <div className="browser-window__content browser-window__content--profile">
              <img
                className="browser-window__profile"
                src="/image/profile.png"
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
              src="/image/browser_1x1.png"
              alt=""
              width="948"
              height="931"
              draggable="false"
            />
            <div className="browser-window__content browser-window__content--timeline">
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
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

export default App;
