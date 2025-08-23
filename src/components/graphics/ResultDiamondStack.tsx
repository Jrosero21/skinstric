import React from "react";

type Props = {
  /** Base square size in px (width === height). */
  size?: number;
  /** Extra classes on the outer wrapper. */
  className?: string;
  /**
   * Multipliers applied to base size for each layer,
   * order: [largest, mid, smallest]
   */
  layerScales?: number[];
  /**
   * Opacity for each layer, order: [largest, mid, smallest]
   * (largest should be lightest, smallest darkest)
   */
  layerOpacities?: number[];
  /** Starting angles in degrees, order: [largest, mid, smallest] */
  startAngles?: number[];
  /** Override animation classes (3 length). */
  spinClasses?: string[];
  /** PNG paths in order [largest, mid, smallest] */
  images?: string[];
};

/** Allow a CSS custom property on the style object */
type CSSVars = React.CSSProperties & { ["--start-rot"]?: string };

export default function ResultDiamondStack({
  size = 482,
  className = "",
  layerScales = [1.0, 0.92, 0.84],
  layerOpacities = [0.22, 0.32, 0.48], // largest=lightest, smallest=darkest
  startAngles = [205, 195, 0],
  spinClasses = ["animate-spin-40s", "animate-spin-30s", "animate-spin-24s"],
  images = [
    "/assets/Rectangle2780.png", // large
    "/assets/Rectangle2779.png", // mid
    "/assets/Rectangle2778.png", // small
  ],
}: Props) {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      {images.map((src, i) => {
        const w = Math.round(size * (layerScales[i] ?? 1));
        const h = w;
        const opacity = layerOpacities[i] ?? 1;
        const start = startAngles[i] ?? 0;
        const spin = spinClasses[i] ?? "animate-spin-36s";

        const style: CSSVars = {
          width: w,                 // React adds 'px' when number is used
          height: h,
          opacity,
          ["--start-rot"]: `${start}deg`, // custom CSS variable for keyframes
        };

        return (
          <img
            key={i}
            src={src}
            alt=""
            draggable={false}
            className={`absolute left-1/2 top-1/2 ${spin}`}
            style={style}
          />
        );
      })}
    </div>
  );
}
