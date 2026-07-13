import { useEffect, useRef, useState, type CSSProperties } from "react";
import SectionDock from "./SectionDock";

type CursorPosition = CSSProperties & {
  "--cursor-start-x": string;
  "--cursor-start-y": string;
  "--cursor-target-x": string;
  "--cursor-target-y": string;
};

type LandingProps = {
  onNavigateToInfo: (behavior: ScrollBehavior) => void;
};

function Landing({ onNavigateToInfo }: LandingProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const notificationRef = useRef<HTMLSpanElement | null>(null);
  const isCursorMovingRef = useRef(false);
  const hasCursorPlayedRef = useRef(false);
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
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const handleWheel = (event: WheelEvent) => {
      const notification = notificationRef.current;
      const sectionRect = section.getBoundingClientRect();

      if (isCursorMovingRef.current) {
        event.preventDefault();
        return;
      }

      if (hasCursorPlayedRef.current) {
        return;
      }

      if (
        event.deltaY <= 0 ||
        !notification ||
        sectionRect.top < -2 ||
        sectionRect.bottom <= window.innerHeight * 0.5
      ) {
        return;
      }

      event.preventDefault();
      hasCursorPlayedRef.current = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        onNavigateToInfo("auto");
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
  }, [onNavigateToInfo]);

  const handleCursorArrival = () => {
    onNavigateToInfo("smooth");

    window.setTimeout(() => {
      setCursorPosition(null);
      isCursorMovingRef.current = false;
    }, 750);
  };

  return (
    <section
      ref={sectionRef}
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

      <SectionDock
        animated
        notificationRef={notificationRef}
        showNotification
      />

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
  );
}

export default Landing;
