// src/components/graphics/RotatingDiamondStack.tsx
// Rotates 3 dotted PNG rectangles (distinct speeds/angles/sizes).
// Draw order: largest first (bottom) -> smallest last (top)
// Opacity/brightness are applied by SIZE RANK:
//   rank 0 = largest (outer), rank 1 = middle, rank 2 = smallest (inner).
// NOTE: brightness is optional and mild by default so nothing can "disappear".

import React from "react";

type Props = {
  /** Outer (largest) design size in px; wrapper can be scaled responsively outside. */
  size?: number;

  /**
   * Global fallback opacity if `layerOpacities` is not provided.
   * When `layerOpacities` is provided, it’s interpreted as [outer, middle, inner]
   * and applied by size rank (largest->outer, smallest->inner).
   */
  opacity?: number;

  /** Per-rank opacities [outer(largest), middle, inner(smallest)]. */
  layerOpacities?: [number, number, number];

  /**
   * Per-rank relative size multipliers [outer(largest), middle, inner(smallest)].
   * Keep each ≤ 1.00 to avoid exceeding the wrapper (prevents clipping).
   */
  layerScales?: [number, number, number];

  /**
   * Optional per-rank brightness [outer, middle, inner]; 1 = unchanged, >1 lighter, <1 darker.
   * Defaults are neutral so the component behaves exactly like before if you don’t pass it.
   */
  layerBrightness?: [number, number, number];
};

export default function RotatingDiamondStack({
  size = 602,
  opacity = 0.82,
  layerOpacities,
  layerScales = [1.0, 0.92, 0.84],
  layerBrightness, // <-- optional & neutral unless provided
}: Props) {
  // Base layers (assets + speeds + base scales)
  const baseLayers = [
    { src: "/assets/Rectangle2778.png", start: 0,  anim: "animate-spin-45s", scale: layerScales[0] },
    { src: "/assets/Rectangle2779.png", start: 15, anim: "animate-spin-40s", scale: layerScales[1] },
    { src: "/assets/Rectangle2780.png", start: 32, anim: "animate-spin-36s", scale: layerScales[2] },
  ];

  // Absolute size for each + keep original index
  const withSize = baseLayers.map((l, i) => ({
    ...l,
    i,
    w: Math.round(size * l.scale),
  }));

  // Draw largest first (bottom), smallest last (top)
  const drawOrder = [...withSize].sort((a, b) => b.w - a.w);

  // Opacity by size rank (largest -> 0, middle -> 1, smallest -> 2)
  const bySizeOpacities = layerOpacities ?? ([0.65, 0.85, 1.0] as [number, number, number]);

  // Brightness by size rank; default neutral if not provided
  const bySizeBrightness = layerBrightness ?? ([1, 1, 1] as [number, number, number]);

  // Wrapper is sized by the largest layer to keep everything centered
  const boxStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div className="relative block pointer-events-none" style={boxStyle} aria-hidden>
      {drawOrder.map((l, rank) => (
        <img
          key={`${l.src}-${rank}`}
          src={l.src}
          alt=""
          draggable={false}
          className={`absolute left-1/2 top-1/2 select-none ${l.anim}`}
          style={{
            width: `${l.w}px`,
            height: `${l.w}px`,
            aspectRatio: "1 / 1",                       // guard vs stretching
            opacity: bySizeOpacities[rank] ?? opacity,  // size-rank opacity
            filter: `brightness(${bySizeBrightness[rank] ?? 1})`, // size-rank brightness
            ["--start-rot" as any]: `${l.start}deg`,    // keeps centered while spinning
          }}
        />
      ))}
    </div>
  );
}
