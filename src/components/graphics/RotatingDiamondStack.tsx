// src/components/graphics/RotatingDiamondStack.tsx
// Rotates 3 dotted PNG rectangles at distinct speeds/angles.
// Spins in place (no drift). Default opacity increased so all layers are darker.

import React from "react";

type Props = {
  /** Design size in px; wrapper can scale responsively outside. */
  size?: number;
  /**
   * Global opacity for all layers (0–1). If `layerOpacities` is provided,
   * it overrides this value per layer.
   */
  opacity?: number;
  /** Optional per-layer opacities [outer, middle, inner]. */
  layerOpacities?: [number, number, number];
};

export default function RotatingDiamondStack({
  size = 602,
  // DARKER default so the shapes are clearly visible everywhere
  opacity = 0.82,
  layerOpacities,
}: Props) {
  const layers = [
    { src: "/assets/Rectangle2778.png", start: 0,  anim: "animate-spin-45s" },
    { src: "/assets/Rectangle2779.png", start: 15, anim: "animate-spin-40s" },
    { src: "/assets/Rectangle2780.png", start: 32, anim: "animate-spin-36s" },
  ];

  const boxStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div className="relative block pointer-events-none" style={boxStyle} aria-hidden>
      {layers.map((l, i) => {
        const layerOpacity =
          Array.isArray(layerOpacities) && layerOpacities[i] != null
            ? layerOpacities[i]
            : opacity;

        return (
          <img
            key={i}
            src={l.src}
            alt=""
            draggable={false}
            className={`absolute left-1/2 top-1/2 select-none ${l.anim}`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity: layerOpacity,
              // pass starting angle; CSS uses it inside the keyframes to spin in place
              ["--start-rot" as any]: `${l.start}deg`,
            }}
          />
        );
      })}
    </div>
  );
}
