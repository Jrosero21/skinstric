import React from "react";

type Props = {
  side: "left" | "right";

  size?: number;

  yOffset?: number;

  gap?: number;

  style?: React.CSSProperties;

  className?: string;
};

export default function HalfDiamond({
  side,
  size = 640,
  yOffset = -10,
  gap = 3,
  style,
  className = "",
}: Props) {
  const half = Math.round(size / 2);
  const topCalc = `calc(50% - ${half}px + ${yOffset}px)`;

  const pos: React.CSSProperties =
    side === "left"
      ? { top: topCalc, left: `-${half}px`, width: `${size}px`, height: `${size}px` }
      : { top: topCalc, right: `-${half}px`, width: `${size}px`, height: `${size}px` };


  const gapClass =
    gap <= 2 ? "diamond-gap-2" : gap >= 4 ? "diamond-gap-4" : "diamond-gap-3";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute hidden md:block"
      style={{ ...pos, ...(style ?? {}) }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <polygon
          className={`diamond-stroke diamond-stroke-2 diamond-color-muted ${gapClass} ${className}`}
          points={`${size / 2},0 ${size},${size / 2} ${size / 2},${size} 0,${size / 2}`}
        />
      </svg>
    </div>
  );
}
