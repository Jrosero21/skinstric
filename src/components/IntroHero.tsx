// src/components/IntroHero.tsx
import { useMemo, useState } from "react";
import HalfDiamond from "./HalfDiamond";
import DiamondButton from "./ui/DiamondButton";

type HoverSide = "left" | "right" | null;

/** Configuration for animations and layout */
const UI = {
  EDGE_GUTTER_REM: 6,
  HEADLINE_MS: 1100,
  FADE_MS: 260,
  EASING: "cubic-bezier(0.22, 1, 0.36, 1)",
  HEADLINE_Y_REM: -0.75,
  DIAMOND_SIZE: 640,
  DIAMOND_Y_OFFSET: -10,
  DOT_GAP: 3 as 2 | 3 | 4,
  TIP_OFFSET_REM: 10,
  // Mobile-specific config
  MOBILE_DIAMOND_SIZE: 400,
  MOBILE_DIAMOND_Y_OFFSET: 0,
};

export default function IntroHero() {
  const [hover, setHover] = useState<HoverSide>(null);

  // Desktop animation logic (unchanged)
  const edgeGutter = `${UI.EDGE_GUTTER_REM}rem`;
  const tipOffset = `${UI.TIP_OFFSET_REM}rem`;
  const translateX = useMemo(() => {
    if (hover === "right") return `calc(-50vw + ${edgeGutter} + ${tipOffset})`;
    if (hover === "left") return `calc( 50vw - ${edgeGutter} - ${tipOffset})`;
    return "0rem";
  }, [hover, edgeGutter, tipOffset]);

  const secondLineX = useMemo(() => {
    if (hover === "right") return "-6rem";
    if (hover === "left") return "6rem";
    return "0rem";
  }, [hover]);

  const translateY = `${UI.HEADLINE_Y_REM}rem`;

  // Style objects for desktop animations
  const headlineStyle: React.CSSProperties = {
    transform: `translateX(${translateX}) translateY(${translateY})`,
    transitionProperty: "transform",
    transitionDuration: `${UI.HEADLINE_MS}ms`,
    transitionTimingFunction: UI.EASING,
    willChange: "transform",
  };

  const secondLineStyle: React.CSSProperties = {
    transform: `translateX(${secondLineX})`,
    transitionProperty: "transform",
    transitionDuration: `${UI.HEADLINE_MS}ms`,
    transitionTimingFunction: UI.EASING,
    willChange: "transform",
  };

  const leftDiamondStyle: React.CSSProperties = {
    opacity: hover === "right" ? 0 : 1,
    transitionProperty: "opacity",
    transitionDuration: `${UI.FADE_MS}ms`,
  };

  const rightDiamondStyle: React.CSSProperties = {
    opacity: hover === "left" ? 0 : 1,
    transitionProperty: "opacity",
    transitionDuration: `${UI.FADE_MS}ms`,
  };

  return (
    <section
      role="region"
      aria-label="Intro hero"
      className="relative isolate h-[calc(100vh-4rem)] min-h-[640px] overflow-hidden"
    >
      {/* Desktop Dotted Diamonds - Hidden on mobile */}
      <div className="hidden lg:block">
        <HalfDiamond
          side="left"
          size={UI.DIAMOND_SIZE}
          yOffset={UI.DIAMOND_Y_OFFSET}
          gap={UI.DOT_GAP}
          style={leftDiamondStyle}
        />
        <HalfDiamond
          side="right"
          size={UI.DIAMOND_SIZE}
          yOffset={UI.DIAMOND_Y_OFFSET}
          gap={UI.DOT_GAP}
          style={rightDiamondStyle}
        />
      </div>

      {/* Mobile Diamond Outlines - Two nested diamonds, only visible below lg breakpoint */}
      <div className="block lg:hidden absolute inset-0 flex items-center justify-center">
        {/* Outer (larger) diamond */}
        <div 
          className="border border-gray-300 transform rotate-45 absolute"
          style={{
            width: `${UI.MOBILE_DIAMOND_SIZE + 80}px`,
            height: `${UI.MOBILE_DIAMOND_SIZE + 80}px`,
          }}
        />
        {/* Inner (smaller) diamond */}
        <div 
          className="border border-gray-300 transform rotate-45 absolute"
          style={{
            width: `${UI.MOBILE_DIAMOND_SIZE}px`,
            height: `${UI.MOBILE_DIAMOND_SIZE}px`,
          }}
        />
      </div>

      {/* Desktop Headline with Animations */}
      <div className="hidden lg:flex relative z-10 h-full items-center justify-center">
        <h1
          className="px-4 text-center text-[60px] lg:text-[100px] text-[#1A1B1C] font-inter font-normal tracking-tighter leading-none"
          style={headlineStyle}
        >
          Sophisticated
          <span className="block text-[#1A1B1C]" style={secondLineStyle}>
            skincare
          </span>
        </h1>
      </div>

      {/* Mobile/Tablet Centered Layout */}
      <div className="block lg:hidden relative z-10 h-full flex flex-col items-center justify-center px-8">
        {/* Mobile Headline - No animations, always centered */}
        <h1 className="text-center text-[48px] sm:text-[60px] text-[#1A1B1C] font-inter font-normal tracking-tighter leading-none mb-6">
          Sophisticated
          <span className="block text-[#1A1B1C]">skincare</span>
        </h1>

        {/* Mobile Description */}
        <p className="text-center text-[#1a1b1c83] text-sm leading-relaxed max-w-sm mb-8">
          Skinstric developed an A.I. that creates a highly-personalized routine tailored to what your skin needs.
        </p>

        {/* Mobile CTA Button with hover zoom effect */}
        <div className="group cursor-pointer">
          <DiamondButton 
            label="ENTER EXPERIENCE" 
            direction="right" 
            to="/testing"
            className="flex-row-reverse group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        </div>
      </div>

      {/* Desktop Side CTAs - Hidden on mobile */}
      <div className="hidden lg:block">
        {/* LEFT CTA */}
        <div
          className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20"
          onMouseEnter={() => setHover("left")}
          onMouseLeave={() => setHover(null)}
          onFocus={() => setHover("left")}
          onBlur={() => setHover(null)}
        >
          <div
            className="transition-opacity"
            style={{ 
              transitionDuration: `${UI.FADE_MS}ms`, 
              opacity: hover === "right" ? 0 : 1 
            } as React.CSSProperties}
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
            style={{ 
              transitionDuration: `${UI.FADE_MS}ms`, 
              opacity: hover === "left" ? 0 : 1 
            } as React.CSSProperties}
          >
            <DiamondButton
              label="TAKE TEST"
              direction="right"
              to="/testing"
              className="flex-row-reverse"
            />
          </div>
        </div>
      </div>

      {/* Desktop Bottom Copy - Hidden on mobile since it's integrated above */}
      <p className="hidden lg:block absolute bottom-10 left-6 md:left-12 max-w-xs text-[12px] leading-relaxed text-[#1a1b1c83] z-10">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALIZED ROUTINE
        TAILORED TO WHAT YOUR SKIN NEEDS.
      </p>
    </section>
  );
}