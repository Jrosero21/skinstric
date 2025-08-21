// src/components/HalfDiamond.tsx
// Edge-anchored, vertically centered dotted diamond.
// NOTE: gap now typed as `number` to quiet VS Code/TS in all setups.

import React from "react";

type Props = {
  side: "left" | "right";
  /** Diamond square size in px */
  size?: number;
  /** Vertical nudge in px (negative = up) */
  yOffset?: number;
  /** Dotted gap in px (we map 2/3/4 to utility classes) */
  gap?: number;
  /** Optional style override (used to fade on hover) */
  style?: React.CSSProperties;
  /** Extra classNames (rarely needed) */
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

  // Map numeric gap to our tiny utility set
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
