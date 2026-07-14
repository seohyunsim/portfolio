import { useCallback, useRef } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Found from "./components/Found";
import Info from "./components/Info";
import Landing from "./components/Landing";

function App() {
  const infoRef = useRef<HTMLElement | null>(null);
  const swiperRef = useRef<SwiperInstance | null>(null);

  const handleNavigateToInfo = useCallback((behavior: ScrollBehavior) => {
    const swiper = swiperRef.current;

    if (!swiper) {
      return;
    }

    swiper.slideTo(1, behavior === "smooth" ? 900 : 0);
    swiper.mousewheel.enable();
  }, []);

  const handleSwiperReady = useCallback((swiper: SwiperInstance) => {
    swiperRef.current = swiper;
    swiper.mousewheel.disable();
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
        slidesPerView={1}
        speed={900}
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
      </Swiper>
    </main>
  );
}

export default App;
