import DiamondButton from "./ui/DiamondButton";
import DiamondOutline from "./graphics/DiamondOutline";

export default function IntroHero() {
  return (
    <section
      role="region"
      aria-label="Intro hero"
      className="relative isolate h-[calc(100vh-4rem)] min-h-[640px] overflow-hidden"
    >
      {/* Dotted diamonds (styled via utility classes) */}
      <DiamondOutline side="left"  />
      <DiamondOutline side="right" />

      {/* Center headline (from your inspect) */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="px-4 text-center text-[60px] lg:text-[100px] text-[#1A1B1C] font-inter font-normal tracking-tighter leading-none">
          Sophisticated
          <span className="block text-[#1A1B1C] lg:translate-x-[-6rem]">
            skincare
          </span>
        </h1>
      </div>

      {/* Side CTAs with bordered diamond around the arrow */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2">
        <DiamondButton label="DISCOVER A.I." to="/discover" direction="left" />
      </div>
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2">
        <DiamondButton label="TAKE TEST" to="/testing" direction="right" />
      </div>

      {/* Bottom-left helper copy */}
      <p className="absolute bottom-10 left-6 md:left-12 max-w-xs text-[12px] leading-relaxed text-[#1a1b1c83]">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALIZED ROUTINE
        TAILORED TO WHAT YOUR SKIN NEEDS.
      </p>
    </section>
  );
}
