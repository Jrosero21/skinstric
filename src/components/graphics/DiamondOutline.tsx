import React from "react";

/**
 * Edge-anchored, vertically centered dotted diamond.
 * Style is controlled by utility classNames (e.g., "diamond-stroke diamond-gap-3").
 *
 * Props only handle geometry/positioning. Visuals come from classes.
 */
type Props = {
  side: "left" | "right";
  /** Square size in px (Figma ~602; we’ve been using 640 for a touch larger) */
  size?: number;
  /** Optional vertical nudge from exact center (px). Negative moves up. */
  yOffset?: number;
  /** Extra classes for stroke variants: diamond-gap-2/3/4, diamond-stroke-2, etc. */
  className?: string;
};

export default function DiamondOutline({
  side,
  size = 640,     // set 602 if you want exact figma; we bumped a bit larger
  yOffset = -10,  // aligns with your CTA center; tweak ±2–6px if needed
  className = "",
}: Props) {
  const half = Math.round(size / 2);

  // Vertically center (to line up with CTAs at 50vh), then nudge with yOffset
  const topCalc = `calc(50% - ${half}px + ${yOffset}px)`;

  // Horizontally anchor half off-screen so only the inward tip points to center
  const style: React.CSSProperties =
    side === "left"
      ? { top: topCalc, left: `-${half}px`, width: `${size}px`, height: `${size}px` }
      : { top: topCalc, right: `-${half}px`, width: `${size}px`, height: `${size}px` };

  return (
    <div aria-hidden className="pointer-events-none absolute hidden md:block" style={style}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} preserveAspectRatio="xMidYMid meet">
        <polygon
          className={`diamond-stroke diamond-stroke-2 diamond-color-muted diamond-gap-3 ${className}`}
          points={`${size / 2},0 ${size},${size / 2} ${size / 2},${size} 0,${size / 2}`}
        />
      </svg>
    </div>
  );
}
