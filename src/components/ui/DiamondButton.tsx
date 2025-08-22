// src/components/ui/DiamondButton.tsx
import { Link } from "react-router-dom";

type Props = {
  label: string;
  direction?: "left" | "right";
  to: string;
  className?: string;

  /** Where the diamond icon sits relative to the label */
  iconPosition?: "leading" | "trailing";

  /** Slight size bump options */
  size?: "sm" | "md" | "lg";
};

export default function DiamondButton({
  label,
  direction = "right",
  to,
  className = "",
  iconPosition = "leading",
  size = "md",
}: Props) {
  const arrowSrc =
    direction === "left" ? "/assets/PolygonLeft.png" : "/assets/PolygonRight.png";

  // nudge the arrow in the direction on hover
  const arrowTranslate =
    direction === "left"
      ? "group-hover:-translate-x-[2px]"
      : "group-hover:translate-x-[2px]";

  // size presets (little bigger than before)
  const sizeMap = {
    sm: { box: "h-7 w-7", arrow: "h-2.5 w-2.5", text: "text-xs" },
    md: { box: "h-8 w-8", arrow: "h-3 w-3", text: "text-sm" },
    lg: { box: "h-9 w-9", arrow: "h-3.5 w-3.5", text: "text-base" },
  } as const;
  const sz = sizeMap[size];

  const Diamond = (
    <span
      aria-hidden
      className={`relative inline-flex ${sz.box} rotate-45 items-center justify-center border border-[#1A1B1C]
                 transition-all duration-300 ease-out
                 group-hover:scale-[1.06] group-hover:bg-black/5
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40`}
    >
      <img
        src={arrowSrc}
        alt=""
        className={`absolute -rotate-45 ${sz.arrow} select-none transition-transform duration-300 ease-out ${arrowTranslate}`}
        draggable={false}
      />
    </span>
  );

  const Label = (
    <span className={`uppercase ${sz.text} transition-colors duration-300 ease-out group-hover:text-black`}>
      {label}
    </span>
  );

  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-3 font-semibold tracking-wide ${className}`}
    >
      {iconPosition === "leading" ? (
        <>
          {Diamond}
          {Label}
        </>
      ) : (
        <>
          {Label}
          {Diamond}
        </>
      )}
    </Link>
  );
}
