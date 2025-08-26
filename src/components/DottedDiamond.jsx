import React from "react";

export default function DottedDiamond({ hiddenWhenHover = false }) {
  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none absolute inset-0 z-0 flex items-center justify-center transition-all duration-500 ease-out",
        hiddenWhenHover ? "opacity-0 scale-95" : "opacity-100 scale-100",
      ].join(" ")}
    >
      {/* Desktop double diamond around headline */}
      <div className="relative max-lg:hidden">
        {/* Outer diamond */}
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#1A1B1C]/30" />
        {/* Inner diamond */}
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#1A1B1C]/30" />
      </div>

      {/* Mobile single diamond (still elegant & centered) */}
      <div className="h-[300px] w-[300px] rotate-45 border border-[#1A1B1C]/30 lg:hidden" />
    </div>
  );
}
