import { useId, type ReactNode } from "react";

type TooltipProps = {
  children: ReactNode;
  label: string;
};

function Tooltip({ children, label }: TooltipProps) {
  const tooltipId = useId();

  return (
    <span
      className="tooltip"
      tabIndex={0}
      aria-label={label}
      aria-describedby={tooltipId}
    >
      {children}
      <span className="tooltip__content" id={tooltipId} role="tooltip">
        {label}
      </span>
    </span>
  );
}

export default Tooltip;
