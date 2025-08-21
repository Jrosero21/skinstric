// src/components/IntroHero.tsx
// Only change in this version: slower headline slide (HEADLINE_MS = 1400).
// Everything else remains exactly as before.

import React, { useMemo, useState } from "react";
import HalfDiamond from "./HalfDiamond";
import DiamondButton from "./ui/DiamondButton";

type HoverSide = "left" | "right" | null;

/** small config block for safe tweaks */
const UI = {
  EDGE_GUTTER_REM: 6,                 // padding from page edge during slide
  HEADLINE_MS: 1400,                  // ⬅️ was 700 — slower, smoother
  FADE_MS: 260,                       // fades stay snappy (unchanged)
  EASING: "cubic-bezier(0.19,1,0.22,1)", // smooth ease-out (unchanged)
  HEADLINE_Y_REM: -0.75,              // vertical nudge (unchanged)
  DIAMOND_SIZE: 640,                  // unchanged
  DIAMOND_Y_OFFSET: -10,              // unchanged
  DOT_GAP: 3 as 2 | 3 | 4,            // unchanged
};

export default function IntroHero() {
  const [hover, setHover] = useState<HoverSide>(null);

  // where the headline slides horizontally
  const edgeGutter = `${UI.EDGE_GUTTER_REM}rem`;
  const translateX = useMemo(() => {
    if (hover === "right") return `calc(-50vw + ${edgeGutter})`; // to left edge
    if (hover === "left")  return `calc( 50vw - ${edgeGutter})`; // to right edge
    return "0rem";
  }, [hover, edgeGutter]);

  // small vertical nudge so the title sits a bit higher visually
  const translateY = `${UI.HEADLINE_Y_REM}rem`;

  return (
    <section
      role="region"
      aria-label="Intro hero"
      className="relative isolate h-[calc(100vh-4rem)] min-h-[640px] overflow-hidden"
    >
      {/* Dotted diamonds — fade out the side being previewed (unchanged) */}
      <HalfDiamond
        side="left"
        size={UI.DIAMOND_SIZE}
        yOffset={UI.DIAMOND_Y_OFFSET}
        gap={UI.DOT_GAP}
        style={{ transition: `opacity ${UI.FADE_MS}ms`, opacity: hover === "right" ? 0 : 1 }}
      />
      <HalfDiamond
        side="right"
        size={UI.DIAMOND_SIZE}
        yOffset={UI.DIAMOND_Y_OFFSET}
        gap={UI.DOT_GAP}
        style={{ transition: `opacity ${UI.FADE_MS}ms`, opacity: hover === "left" ? 0 : 1 }}
      />

      {/* Headline */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <h1
          className="px-4 text-center text-[60px] lg:text-[100px] text-[#1A1B1C] font-inter font-normal tracking-tighter leading-none will-change-transform"
          style={{
            transform: `translateX(${translateX}) translateY(${translateY})`,
            transitionProperty: "transform",
            transitionDuration: `${UI.HEADLINE_MS}ms`,
            transitionTimingFunction: UI.EASING,
          }}
        >
          Sophisticated
          <span className="block text-[#1A1B1C] lg:translate-x-[-6rem]">skincare</span>
        </h1>
      </div>

      {/* LEFT cluster */}
      <div
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20"
        onMouseEnter={() => setHover("left")}
        onMouseLeave={() => setHover(null)}
        onFocus={() => setHover("left")}
        onBlur={() => setHover(null)}
      >
        <div
          className="transition-opacity"
          style={{ transitionDuration: `${UI.FADE_MS}ms`, opacity: hover === "right" ? 0 : 1 }}
        >
          <DiamondButton label="DISCOVER A.I." direction="left" to="#" />
        </div>
      </div>

      {/* RIGHT CTA */}
      <div
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20"
        onMouseEnter={() => setHover("right")}
        onMouseLeave={() => setHover(null)}
        onFocus={() => setHover("right")}
        onBlur={() => setHover(null)}
      >
        <div
          className="transition-opacity"
          style={{ transitionDuration: `${UI.FADE_MS}ms`, opacity: hover === "left" ? 0 : 1 }}
        >
          <DiamondButton label="TAKE TEST" direction="right" to="/testing" />
        </div>
      </div>

      {/* Bottom-left helper copy (stays visible) */}
      <p className="absolute bottom-10 left-6 md:left-12 max-w-xs text-[12px] leading-relaxed text-[#1a1b1c83] z-10">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALIZED ROUTINE
        TAILORED TO WHAT YOUR SKIN NEEDS.
      </p>
    </section>
  );
}
