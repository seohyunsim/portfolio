import type { RefObject } from "react";

type SectionDockProps = {
  animated?: boolean;
  notificationRef?: RefObject<HTMLSpanElement | null>;
  showNotification?: boolean;
};

function SectionDock({
  animated = false,
  notificationRef,
  showNotification = false,
}: SectionDockProps) {
  return (
    <footer
      className={`section-dock ${animated ? "section-dock--animated" : ""}`}
      aria-label="애플리케이션 Dock"
    >
      <img
        className="section-dock__image"
        src="/image/dock_bar.png"
        alt=""
        width="1536"
        height="1024"
        draggable="false"
      />
      {showNotification && (
        <span
          ref={notificationRef}
          className="section-dock__notification"
          aria-label="알림 1개"
        >
          1
        </span>
      )}
    </footer>
  );
}

export default SectionDock;
