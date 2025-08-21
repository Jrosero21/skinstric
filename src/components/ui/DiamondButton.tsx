// src/components/ui/DiamondButton.tsx
import { Link } from "react-router-dom";

type Props = {
  label: string;
  to?: string;                 // left CTA can stay on page -> "#"
  direction: "left" | "right";
  className?: string;
};

export default function DiamondButton({ label, to = "#", direction, className = "" }: Props) {
  const iconSrc =
    direction === "left" ? "/assets/PolygonLeft.png" : "/assets/PolygonRight.png";

  return (
    <Link to={to} className={`group inline-flex items-center gap-3 text-xs font-semibold tracking-wide ${className}`}>
      {/* bordered diamond wrapper */}
      <span
        aria-hidden
        className="relative inline-flex h-6 w-6 rotate-45 items-center justify-center border border-[#1A1B1C]"
      >
        {/* arrow PNG inside, counter-rotated */}
        <img
          src={iconSrc}
          alt=""
          className="absolute -rotate-45 h-2.5 w-2.5 select-none"
          draggable={false}
        />
      </span>
      <span className="text-[#1A1B1C]">{label}</span>
    </Link>
  );
}
