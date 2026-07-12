import { useEffect, useRef, useState } from 'react';

const profile = {
  name: 'Seohyun Sim',
  role: 'Frontend Developer',
  eyebrow: 'Interactive Web / Product UI / DX',
  heroSummary:
    '인터랙티브한 웹 개발과 사용자 경험 개선에 높은 가치를 두며, 모션과 구조를 함께 설계하는 3년차 프론트엔드 개발자입니다.',
  bio: [
    '모션을 활용한 인터랙티브 웹 플랫폼 개발 경험을 바탕으로 사용자에게 시각적 흥미를 제공하는 UI를 고민하고 구현합니다.',
    '개발자 경험의 개선은 생산성 향상과 개발 비용 절감으로 이어진다는 신념으로 협업 방식과 개발 프로세스를 꾸준히 점검합니다.',
  ],
  current: '자이언트스텝 웹 플랫폼 프론트엔드 개발',
  award: '2022 공개SW 개발자대회 일반부문 은상',
};

const skills = [
  'React',
  'Next.js',
  'TypeScript',
  'React Query',
  'React Hook Form',
  'Zustand',
  'Storybook',
  'Motion UI',
];

const timeline = [
  {
    period: '2026.01',
    company: 'PERSONAL BODY',
    role: '창업, 기획 · 디자인 · 개발 · 영업 · 마케팅 전반 책임, UI/UX/FE Engineer',
  },
  {
    period: '2023.01 - 2026.04',
    company: '자이언트스텝',
    role: '사내 어드민 플랫폼 프론트엔드 개발, 디자인 시스템 구축',
  },
  {
    period: '2022.12',
    company: '공개SW 개발자대회 은상',
    role: 'developer portfolio 관련 디자인 시스템 구축',
  },
  {
    period: '2019.02 - 2022.02',
    company: '인덕대학교',
    role: '컴퓨터전자공학과',
  },
];

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/seohyunsim',
  },
  {
    label: 'Blog',
    href: 'https://velog.io/@seohyunsim',
  },
  {
    label: 'Portfolio',
    href: 'https://seohyunsim-portfolio.vercel.app/',
  },
  {
    label: 'Email',
    href: 'mailto:ssh123661@gmail.com',
  },
];

function App() {
  const aboutRef = useRef<HTMLElement | null>(null);
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  useEffect(() => {
    const node = aboutRef.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '-15% 0px -20% 0px',
        threshold: 0.2,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="portfolio">
      <div className="background-orb" aria-hidden="true" />
      <div className="background-orb background-orb--blur" aria-hidden="true" />

      <section className="hero" aria-labelledby="page-title">
        <p className="hero__eyebrow">{profile.eyebrow}</p>
        <h1 id="page-title" className="hero__title">
          <span>Seohyun</span>
          <span>Sim</span>
        </h1>
        <div className="hero__copy">
          <p className="hero__role">{profile.role}</p>
          <p>{profile.heroSummary}</p>
        </div>
      </section>

      <section className="wordmark" aria-label="Seohyun Sim wordmark">
        <p className="wordmark__first">Seohyun</p>
        <p className="wordmark__last">
          <span>Frontend</span>
          <span className="wordmark__dash" aria-hidden="true" />
          <span>Developer</span>
        </p>
      </section>

      <section
        ref={aboutRef}
        className={`about ${isAboutVisible ? 'about--visible' : ''}`}
        aria-labelledby="about-title"
      >
        <h2 id="about-title" className="sr-only">
          About Seohyun Sim
        </h2>

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

        <div className="about__bio">
          <p>
            <span className="strike">기능 구현자</span>를 넘어 제품의 흐름과
            사용자의 맥락을 함께 설계하는 프론트엔드 개발자입니다.
          </p>
          {profile.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="about__meta">
            {profile.current} / {profile.award}
          </p>
        </div>

        <nav className="contact" aria-label="연락처와 채널">
          {links.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
}

export default App;
