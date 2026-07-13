import { useCallback, useRef } from "react";
import Info from "./components/Info";
import Landing from "./components/Landing";

function App() {
  const infoRef = useRef<HTMLElement | null>(null);

  const handleNavigateToInfo = useCallback((behavior: ScrollBehavior) => {
    infoRef.current?.scrollIntoView({ behavior, block: "start" });
  }, []);

  return (
    <main className="portfolio">
      <Landing onNavigateToInfo={handleNavigateToInfo} />
      <Info sectionRef={infoRef} />
    </main>
  );
}

export default App;
