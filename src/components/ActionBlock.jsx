// src/components/ActionBlock.jsx
import React from "react";

/*
  Team note:
  - Generic block that renders the dotted frame + action button.
  - Props:
    - side: "left" | "right" -> decides which edge to anchor and text/button orientation
    - faded: boolean -> controls opacity (non-hovered side fades)
    - label: string -> button label (e.g., "DISCOVER A.I." or "TAKE TEST")
    - onHoverEnter / onHoverLeave: handlers to set hover side in the parent
    - onClick: click handler (e.g., navigate to /testing)
  - Positioning values follow the current layout spec (off-canvas feel).
*/

export default function ActionBlock({
  side = "left",
  faded = false,
  label = "ACTION",
  onHoverEnter,
  onHoverLeave,
  onClick,
}) {
  const isLeft = side === "left";

  // Container position: we anchor off-screen (negative vw) to match the look
  const containerPos = isLeft
    ? "absolute left-[calc(-50vw)]"
    : "absolute right-[calc(-50vw)]";

  // Fade logic for the non-hovered side
  const opacityClass = faded ? "opacity-0" : "opacity-100";

  // Button placement (mirrors left vs right)
  const buttonPos = isLeft
    ? "absolute top-1/2 right-0 -translate-y-1/2 translate-x-[20%] hover:translate-x-[24%]"
    : "absolute top-1/2 left-0 -translate-y-1/2 -translate-x-[20%] hover:-translate-x-[24%]";

  // Triangle (▶) positions differ slightly for each side (so it lines up nicely)
  const triangleClass = isLeft
    ? "absolute left-[14px] top-[8px] -rotate-180 text-[14px]"
    : "absolute left-[107px] top-[8px] text-[14px]";

  // When we don’t want the frame/button to eat mouse events (until hover), we set pointer-events on button
  return (
    <div
      className={[
        "pointer-events-none",
        containerPos,
        "top-1/2 h-[500px] w-[500px] -translate-y-1/2",
        "transition-opacity duration-400 ease-out",
        opacityClass,
      ].join(" ")}
    >
      <div className="relative h-full w-full">
        {/* Dotted rotated frame */}
        <div className="absolute inset-0 rotate-45 border border-dotted border-[#A0A4AB]" />
        {/* Action button */}
        <button
          type="button"
          className={[
            "pointer-events-auto group inline-flex items-center justify-center gap-3 text-sm font-normal text-[#1A1B1C] transition-transform duration-300",
            buttonPos,
          ].join(" ")}
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          onClick={onClick}
        >
          {/* For right side, label appears before the square; for left side after */}
          {isLeft ? null : <span className="mr-10">{label}</span>}

          <div className="h-[30px] w-[30px] rotate-45 border border-solid border-black transition-transform duration-300 group-hover:scale-110" />

          {/* Triangle indicator */}
          <span className={triangleClass}>▶</span>

          {isLeft ? <span className="ml-10">{label}</span> : null}
        </button>
      </div>
    </div>
  );
}
