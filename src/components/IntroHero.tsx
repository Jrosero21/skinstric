// src/components/IntroHero.tsx
// Hover RIGHT  CTA -> headline slides to LEFT edge, left CTA+copy and LEFT diamond fade out
// Hover LEFT   CTA -> headline slides to RIGHT edge, right CTA and RIGHT diamond fade out

import React, { useMemo, useState } from "react";
import HalfDiamond from "./HalfDiamond";
import DiamondButton from "./ui/DiamondButton";

type HoverSide = "left" | "right" | null;

export default function IntroHero() {
  const [hover, setHover] = useState<HoverSide>(null);

  // Keep a little padding when sliding to the edge
  const edgeGutter = "6rem"; // adjust to taste
  const translateX = useMemo(() => {
    if (hover === "right") return `calc(-50vw + ${edgeGutter})`; // slide to left edge
    if (hover === "left")  return `calc( 50vw - ${edgeGutter})`; // slide to right edge
    return "0rem"; // centered
  }, [hover]);

  const ease = "cubic-bezier(0.22,1,0.36,1)";

  return (
    <section
      role="region"
      aria-label="Intro hero"
      className="relative isolate h-[calc(100vh-4rem)] min-h-[640px] overflow-hidden"
    >
      {/* Dotted diamonds — fade out the side being previewed */}
      <HalfDiamond
        side="left"
        style={{ transition: "opacity 260ms", opacity: hover === "right" ? 0 : 1 }}
      />
      <HalfDiamond
        side="right"
        style={{ transition: "opacity 260ms", opacity: hover === "left" ? 0 : 1 }}
      />

      {/* Headline */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <h1
          className="px-4 text-center text-[60px] lg:text-[100px] text-[#1A1B1C] font-inter font-normal tracking-tighter leading-none
                     transition-transform duration-500 will-change-transform"
          style={{ transform: `translateX(${translateX})`, transitionTimingFunction: ease }}
        >
          Sophisticated
          <span className="block text-[#1A1B1C] lg:translate-x-[-6rem]">skincare</span>
        </h1>
      </div>

      {/* LEFT cluster (CTA + paragraph) — fades when previewing RIGHT */}
      <div
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20"
        onMouseEnter={() => setHover("left")}
        onMouseLeave={() => setHover(null)}
        onFocus={() => setHover("left")}
        onBlur={() => setHover(null)}
      >
        <div className="transition-opacity duration-300" style={{ opacity: hover === "right" ? 0 : 1 }}>
          <DiamondButton label="DISCOVER A.I." direction="left" to="#" />
        </div>
      </div>

      {/* RIGHT CTA — fades when previewing LEFT */}
      <div
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20"
        onMouseEnter={() => setHover("right")}
        onMouseLeave={() => setHover(null)}
        onFocus={() => setHover("right")}
        onBlur={() => setHover(null)}
      >
        <div className="transition-opacity duration-300" style={{ opacity: hover === "left" ? 0 : 1 }}>
          <DiamondButton label="TAKE TEST" direction="right" to="/testing" />
        </div>
      </div>

      {/* Bottom-left helper copy — part of left content; hide on RIGHT hover */}
      <p
        className="absolute bottom-10 left-6 md:left-12 max-w-xs text-[12px] leading-relaxed text-[#1a1b1c83]
                   transition-opacity duration-300 z-10"
        style={{ opacity: hover === "right" ? 0 : 1 }}
      >
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALIZED ROUTINE
        TAILORED TO WHAT YOUR SKIN NEEDS.
      </p>
    </section>
  );
}
