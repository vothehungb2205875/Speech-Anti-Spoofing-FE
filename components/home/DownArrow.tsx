interface DownArrowProps {
  className?: string;
  animate?: boolean;
}

export function DownArrow({ className = "", animate = true }: DownArrowProps) {
  return (
    <>
      {animate && (
        <style>{`
          @keyframes bounce-down-svg {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(6px);
            }
          }
          .arrow-animate {
            animation: bounce-down-svg 2s infinite;
          }
        `}</style>
      )}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${animate ? "arrow-animate" : ""} ${className}`}
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </svg>
    </>
  );
}
