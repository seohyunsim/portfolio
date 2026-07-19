import { useEffect, useRef, useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import { assetPath } from "../utils/assetPath";

type CopiedContact = "phone" | "email" | null;

type ContactProps = {
  onNavigateToTop: () => void;
};

async function writeToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Fall back for browsers that deny the async clipboard API.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function Contact({ onNavigateToTop }: ContactProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const copyTimerRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [copiedContact, setCopiedContact] = useState<CopiedContact>(null);
  const [spotlightValue, setSpotlightValue] = useState("");
  const [isSpotlightFocused, setIsSpotlightFocused] = useState(false);

  useEffect(() => {
    if (isSpotlightFocused) return undefined;

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

    const timeout = window.setTimeout(() => setSpotlightValue(nextValue), delay);
    return () => window.clearTimeout(timeout);
  }, [isSpotlightFocused, spotlightValue]);

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
      { rootMargin: "-12% 0px -12% 0px", threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    },
    [],
  );

  const copyContact = async (
    type: Exclude<CopiedContact, null>,
    value: string,
  ) => {
    await writeToClipboard(value);
    setCopiedContact(type);

    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }

    copyTimerRef.current = window.setTimeout(() => {
      setCopiedContact(null);
    }, 1400);
  };

  return (
    <section
      ref={sectionRef}
      className={`hero-banner contact-section ${isVisible ? "contact-section--visible" : ""}`}
      aria-labelledby="contact-title"
    >
      <label className="spotlight-search contact-search">
        <span className="sr-only">연락처 안내</span>
        <span className="spotlight-search__icon" aria-hidden="true" />
        <input
          type="text"
          value={spotlightValue.replace("\u200b", "")}
          aria-label="Frontend Engineer with UI/UX"
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
          src={assetPath("image/file.png")}
          alt=""
          width="470"
          height="395"
          draggable="false"
        />
        <h1 id="contact-title" className="folder-card__title contact-section__title">
          Contact me
        </h1>
      </div>

      <footer className="contact-dock" aria-label="연락처 및 외부 링크">
        <img
          className="contact-dock__image"
          src={assetPath("image/contact_dock_bar.png")}
          alt=""
          width="1224"
          height="212"
          draggable="false"
        />

        <button
          className="contact-dock__action contact-dock__action--phone"
          type="button"
          aria-label="전화번호 010-9572-3357 복사"
          onClick={() => void copyContact("phone", "010-9572-3357")}
        >
          {copiedContact === "phone" && <span className="contact-dock__tooltip">copy!</span>}
        </button>
        <button
          className="contact-dock__action contact-dock__action--email"
          type="button"
          aria-label="이메일 ssh123661@gmail.com 복사"
          onClick={() => void copyContact("email", "ssh123661@gmail.com")}
        >
          {copiedContact === "email" && <span className="contact-dock__tooltip">copy!</span>}
        </button>
        <a
          className="contact-dock__action contact-dock__action--linkedin"
          href="https://www.linkedin.com/in/seohyun-sim-b119802b5"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="LinkedIn 새 창에서 열기"
        />
        <a
          className="contact-dock__action contact-dock__action--github"
          href="https://github.com/seohyunsim"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub 새 창에서 열기"
        />
      </footer>

      <ScrollToTop
        className="contact-top-button"
        top={-1}
        component={
          <span className="contact-top-button__content">
            <span aria-hidden="true">↑</span>
            <span>Top</span>
          </span>
        }
        onClick={onNavigateToTop}
      />
    </section>
  );
}

export default Contact;
