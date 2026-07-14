import { useCallback, useRef } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Career from "./components/Career";
import CareerProject01 from "./components/CareerProject01";
import CareerProject02 from "./components/CareerProject02";
import CareerProject03 from "./components/CareerProject03";
import Contact from "./components/Contact";
import Found from "./components/Found";
import Info from "./components/Info";
import Landing from "./components/Landing";
import PersonalProject from "./components/PersonalProject";

const ACTIVE_SECTION_STORAGE_KEY = "portfolio-active-section";
const SECTION_COUNT = 9;

function getStoredSectionIndex() {
  try {
    const storedIndex = Number.parseInt(
      window.sessionStorage.getItem(ACTIVE_SECTION_STORAGE_KEY) ?? "0",
      10,
    );

    return Number.isInteger(storedIndex) &&
      storedIndex >= 0 &&
      storedIndex < SECTION_COUNT
      ? storedIndex
      : 0;
  } catch {
    return 0;
  }
}

function storeSectionIndex(index: number) {
  try {
    window.sessionStorage.setItem(ACTIVE_SECTION_STORAGE_KEY, String(index));
  } catch {
    // The portfolio still works when browser storage is unavailable.
  }
}

function App() {
  const infoRef = useRef<HTMLElement | null>(null);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const initialSectionRef = useRef(getStoredSectionIndex());
  const isLandingUnlockedRef = useRef(false);

  const handleNavigateToInfo = useCallback((behavior: ScrollBehavior) => {
    const swiper = swiperRef.current;

    if (!swiper) {
      return;
    }

    swiper.slideTo(1, behavior === "smooth" ? 900 : 0);
    swiper.mousewheel.enable();
  }, []);

  const handleNavigateToTop = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    isLandingUnlockedRef.current = true;
    swiper.slideTo(0, 900);
    swiper.mousewheel.enable();
  }, []);

  const handleSwiperReady = useCallback((swiper: SwiperInstance) => {
    swiperRef.current = swiper;

    if (swiper.activeIndex === 0 && !isLandingUnlockedRef.current) {
      swiper.mousewheel.disable();
      return;
    }

    swiper.mousewheel.enable();
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperInstance) => {
    storeSectionIndex(swiper.activeIndex);

    if (swiper.activeIndex === 0 && !isLandingUnlockedRef.current) {
      swiper.mousewheel.disable();
      return;
    }

    swiper.mousewheel.enable();
  }, []);

  return (
    <main className="portfolio">
      <Swiper
        className="portfolio__swiper"
        direction="vertical"
        modules={[Mousewheel]}
        mousewheel={{
          forceToAxis: true,
          releaseOnEdges: false,
          thresholdDelta: 24,
          thresholdTime: 700,
        }}
        preventInteractionOnTransition
        resistance={false}
        initialSlide={initialSectionRef.current}
        slidesPerView={1}
        speed={900}
        onSlideChange={handleSlideChange}
        onSwiper={handleSwiperReady}
        allowTouchMove={false}
      >
        <SwiperSlide className="portfolio__slide">
          <Landing onNavigateToInfo={handleNavigateToInfo} />
        </SwiperSlide>
        <SwiperSlide className="portfolio__slide">
          <Info sectionRef={infoRef} />
        </SwiperSlide>
        <SwiperSlide className="portfolio__slide">
          <Found />
        </SwiperSlide>
        <SwiperSlide className="portfolio__slide">
          <Career />
        </SwiperSlide>
        <SwiperSlide className="portfolio__slide">
          <CareerProject01 />
        </SwiperSlide>
        <SwiperSlide className="portfolio__slide">
          <CareerProject02 />
        </SwiperSlide>
        <SwiperSlide className="portfolio__slide">
          <CareerProject03 />
        </SwiperSlide>
        <SwiperSlide className="portfolio__slide">
          <PersonalProject />
        </SwiperSlide>
        <SwiperSlide className="portfolio__slide">
          <Contact onNavigateToTop={handleNavigateToTop} />
        </SwiperSlide>
      </Swiper>
    </main>
  );
}

export default App;
