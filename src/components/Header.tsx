// src/components/Header.tsx
// Behavior-only update:
// - If current route is an "analysis" page, show section = ANALYSIS and hide "ENTER CODE".
// - Otherwise, default to INTRO and show "ENTER CODE".
// Notes for team: keep markup/classes identical so no layout shifts.

import { Link, useLocation } from "react-router-dom";

type HeaderProps = { section?: string };

export default function Header({ section }: HeaderProps) {
  const { pathname } = useLocation();

  // Simple route check — add to this list as new analysis pages are introduced.
  const isAnalysisRoute =
    /^\/camera(\/capture)?$/.test(pathname) ||
    /^\/select$/.test(pathname) ||
    /^\/summary$/.test(pathname);

  // If a section prop is supplied, it wins. Otherwise infer from route.
  const sectionLabel = section ?? (isAnalysisRoute ? "ANALYSIS" : "INTRO");
  const showEnterCode = !isAnalysisRoute;

  return (
    <header className="flex flex-row h-[64px] w-full justify-between py-3 mb-3 relative z-[1000] px-3 sm:px-4">
      {/* left cluster (unchanged layout) */}
      <div className="flex flex-row pt-1 scale-75 justify-center items-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-opacity h-9 px-4 py-2 font-semibold text-sm mr-2 leading-[16px] text-[#1A1B1C] z-[1000] hover:opacity-90"
        >
          SKINSTRIC
        </Link>

        {/* Bracketed section label (unchanged style) */}
        <span className="text-[#1a1b1c83] font-semibold text-sm leading-[16px]">
          {"[ "}{sectionLabel}{" ]"}
        </span>
      </div>

      {/* right button — render only when allowed; classes unchanged */}
      {showEnterCode && (
        <Link
          to="/testing"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-opacity disabled:pointer-events-none
                   h-9 px-4 py-2 mx-4 scale-[0.8] text-[#FCFCFC] text-[10px] bg-[#1A1B1C] leading-[16px]  hover:opacity-90"
        >
          ENTER CODE
        </Link>
      )}
    </header>
  );
}
