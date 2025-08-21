// src/components/HalfDiamond.tsx
// Draws one edge-anchored dotted diamond. We use Tailwind utilities
// (defined in styles.css) for the dotted stroke so it’s easy to tune.
// This component is intentionally tiny and lives in components/.

import React from "react";

type Props = {
  side: "left" | "right";
  /** Diamond square size in px (set to 640 for a touch larger than Figma’s 602) */
  size?: number;
  /** Vertical nudge in px (negative = up). We align to CTA center, so default lifts slightly. */
  yOffset?: number;
  /** Optional style override (we use this to fade-out on hover) */
  style?: React.CSSProperties;
  /** Extra classNames for custom stroke variants if needed */
  className?: string;
};

export default function HalfDiamond({
  side,
  size = 640,
  yOffset = -10,
  style,
  className = "",
}: Props) {
  const half = Math.round(size / 2);
  const topCalc = `calc(50% - ${half}px + ${yOffset}px)`;

  const pos: React.CSSProperties =
    side === "left"
      ? { top: topCalc, left: `-${half}px`, width: `${size}px`, height: `${size}px` }
      : { top: topCalc, right: `-${half}px`, width: `${size}px`, height: `${size}px` };

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute hidden md:block"
      style={{ ...pos, ...(style ?? {}) }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} preserveAspectRatio="xMidYMid meet">
        <polygon
          className={`diamond-stroke diamond-stroke-2 diamond-color-muted diamond-gap-3 ${className}`}
          points={`${size / 2},0 ${size},${size / 2} ${size / 2},${size} 0,${size / 2}`}
        />
      </svg>
    </div>
  );
}
