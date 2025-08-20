import React from "react";
import { Link } from "react-router-dom";
import PolygonRight from "../assets/PolygonRight.png";

/**
 * “Proceed” CTA placed in a corner (commonly bottom-right).
 * Self-contained styling so it won’t break your existing CSS.
 */
type CornerCTAProps = {
  to: string;
  label?: string;
  corner?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  className?: string;
};

export default function CornerCTA({
  to,
  label = "Proceed",
  corner = "bottom-right",
  className = "",
}: CornerCTAProps) {
  const cornerPos =
    corner === "bottom-right"
      ? "fixed bottom-6 right-6"
      : corner === "bottom-left"
      ? "fixed bottom-6 left-6"
      : corner === "top-right"
      ? "fixed top-6 right-6"
      : "fixed top-6 left-6";

  return (
    <Link
      to={to}
      className={`${cornerPos} z-[5] inline-flex items-center gap-2 text-[12px] uppercase`}
    >
      <span className="inline-grid place-items-center w-[34px] h-[34px] rotate-45 border border-[#1A1B1C]">
        <img
          src={PolygonRight}
          alt=""
          aria-hidden="true"
          className="-rotate-45 w-[12px] h-auto"
        />
      </span>
      <span className="opacity-85">{label}</span>
    </Link>
  );
}
