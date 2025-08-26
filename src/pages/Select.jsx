import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import DiamondButton from "../components/ui/DiamondButton";

// Diamond tile. Clickable only when `clickable` is true.
function DiamondTile({ label, onClick, clickable = false, className = "", onMouseEnter, onMouseLeave }) {
  const base =
    "relative select-none w-[102px] h-[102px] md:w-[130px] md:h-[130px] " +
    "bg-[#EEF0F3] hover:bg-[#E6E9ED] transition-colors duration-200 " +
    "rotate-45 shadow-[0_0_0_1px_rgba(0,0,0,0.04)_inset]";
  const inner =
    "absolute inset-0 -rotate-45 flex items-center justify-center " +
    "text-[10px] md:text-[11px] font-semibold tracking-[0.02em] " +
    "text-[#1A1B1C] text-center leading-[1.2] px-3 whitespace-pre-line";

  const commonProps = {
    onMouseEnter,
    onMouseLeave,
    className: `${base} ${clickable ? "cursor-pointer" : "cursor-default"} ${className}`,
    "aria-label": label,
  };

  if (clickable) {
    return (
      <button type="button" onClick={onClick} {...commonProps}>
        <span className={inner}>{label}</span>
      </button>
    );
  }

  return (
    <div {...commonProps}>
      <span className={inner}>{label}</span>
    </div>
  );
}

export default function Select() {
  const [lastClicked, setLastClicked] = useState(null);
  const [hoveredKey, setHoveredKey] = useState(null); 
  const navigate = useNavigate();

  const handleTile = (key) => setLastClicked(key);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* MAIN SECTION LAYOUT */}
      <section className="min-h-[92vh] relative md:pt-[64px] flex flex-col bg-white">
        {/* top-left copy */}
        <div className="absolute top-6 left-8 text-left">
          <p className="text-[11px] md:text-xs font-bold tracking-wide text-[#1A1B1C]">
            A.I. ANALYSIS
          </p>
          <p className="text-[10px] md:text-[11px] text-[#6B6F74] mt-2 leading-relaxed">
            A.I. HAS ESTIMATED THE FOLLOWING.
            <br />
            FIX ESTIMATED INFORMATION IF NEEDED.
          </p>
        </div>

        {/* CENTER BAND — flex row, pt-1, items-center, justify-center */}
        <div className="flex-1 flex flex-row pt-1 items-center justify-center">
          <div className="scale-[0.75] md:scale-100">
            {/* cluster wrapper with tight, non-touching spacing */}
            <div className="relative w-[230px] h-[230px] md:w-[292px] md:h-[292px]">
              {/* --- HOVER HALO --- */}
              <div className="pointer-events-none absolute inset-0">
                <svg
                  viewBox="0 0 100 100"
                  className={`absolute left-1/2 top-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ease-in ${
                    hoveredKey ? "opacity-80" : "opacity-0"
                  }`}
                >
                  <polygon
                    points="50,0 100,50 50,100 0,50"
                    className="diamond-stroke diamond-stroke-2 diamond-color-muted"
                  />
                </svg>
              </div>

              {/* top — ONLY clickable with subtle zoom hover */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 translate-y-[-16px] md:translate-y-[-18px]">
                <DiamondTile
                  label="DEMOGRAPHICS"
                  clickable
                  onClick={() => {
                    // record click and navigate to summary 
                    handleTile("demographics");
                    navigate("/summary");
                  }}
                  onMouseEnter={() => setHoveredKey("demographics")}
                  onMouseLeave={() => setHoveredKey(null)}
                  className="transform-gpu transition-transform duration-300 ease-out hover:scale-[1.04] will-change-transform"
                />
              </div>

              {/* left — non-clickable */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 translate-x-[-16px] md:translate-x-[-18px]">
                <DiamondTile
                  label={"COSMETIC\nCONCERNS"}
                  clickable={false}
                  onMouseEnter={() => setHoveredKey("cosmetic")}
                  onMouseLeave={() => setHoveredKey(null)}
                />
              </div>

              {/* right — non-clickable */}
              <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-[16px] md:translate-x-[18px]">
                <DiamondTile
                  label="SKIN TYPE DETAILS"
                  clickable={false}
                  onMouseEnter={() => setHoveredKey("skin")}
                  onMouseLeave={() => setHoveredKey(null)}
                />
              </div>

              {/* bottom — non-clickable */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[16px] md:translate-y-[18px]">
                <DiamondTile
                  label="WEATHER"
                  clickable={false}
                  onMouseEnter={() => setHoveredKey("weather")}
                  onMouseLeave={() => setHoveredKey(null)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM WHITE BAR — sticky on mobile; static on md+ */}
        <div className="pt-4 md:pt-12 pb-8 bg-white sticky md:static bottom-40 mb-0 md:mb-0">
          <div className="flex justify-between max-w-full mx-auto px-13 md:px-9">
            {/* Back */}
            <Link to="/result">
              <div>
                <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                  <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">BACK</span>
                </div>
                <div className="group hidden sm:flex flex-row relative justify-center items-center">
                  <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300" />
                  <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block group-hover:scale-[0.92] ease duration-300">
                    ▶
                  </span>
                  <span className="text-sm font-semibold hidden sm:block ml-6">BACK</span>
                </div>
              </div>
            </Link>

            {/* Get Summary */}
            <Link to="/summary">
              <div>
                <div className="w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                  <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">SUM</span>
                </div>
                <div className="group hidden sm:flex flex-row relative justify-center items-center">
                  <span className="text-sm font-semibold hidden sm:block mr-5">GET SUMMARY</span>
                  <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300" />
                  <span className="absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block group-hover:scale-[0.92] ease duration-300">
                    ▶
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
