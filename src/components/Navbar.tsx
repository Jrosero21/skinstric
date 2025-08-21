// src/components/Navbar.jsx
import React from "react";

/*
  Team note:
  - Simple, stateless top bar used on Home (and later other pages).
  - Kept minimal to match current design; we can swap to a global Layout later.
*/

export default function Navbar() {
  return (
    <div className="flex h-[64px] w-full items-center justify-between px-4 md:px-6 relative z-[1000]">
      {/* Left cluster: SKINSTRIC [INTRO] */}
      <div className="flex items-center gap-2">
        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 font-semibold text-sm leading-[16px] text-[#1A1B1C]"
        >
          SKINSTRIC
        </a>
        {/* “Brackets” as subtle bars to mimic the Figma look */}
        <span className="h-[17px] w-[4px] bg-[#1A1B1C] opacity-20" />
        <p className="text-[#1a1b1c83] font-semibold text-sm">INTRO</p>
        <span className="h-[17px] w-[4px] bg-[#1A1B1C] opacity-20" />
      </div>

      {/* Right: Enter Code button */}
      <button
        type="button"
        className="h-9 px-3 rounded bg-[#1A1B1C] text-[10px] font-semibold leading-[16px] text-white shadow-sm hover:opacity-90 transition"
      >
        ENTER CODE
      </button>
    </div>
  );
}
