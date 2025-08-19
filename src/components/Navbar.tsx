import React from "react";
import { Link } from "react-router-dom";

/**
 * Navbar (static)
 * notes for the team:
 * - using the same structure/sizing we saw in the inspected HTML
 * - 64px tall row, brand on the left, "enter code" on the right
 * - no hover states yet, no rounded corners, no extra borders
 * - colors come straight from our CSS variables so we stay on-brand
 */
export default function Navbar() {
  return (
    <header className="w-full h-[64px]" style={{ background: "var(--color-bg)" }}>
      {/* 64px row, spaced like the inspected DOM */}
      <div className="flex flex-row h-[64px] w-full justify-between py-3 relative z-[1000]">
        {/* left group — small vertical nudge + scale to match Figma feel */}
        <div className="flex flex-row pt-1 scale-75 justify-center items-center">
          {/* brand link back to home */}
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold text-sm mr-2 leading-[16px]"
            style={{ color: "var(--color-text)" }}
            aria-label="Go to home"
          >
            SKINSTRIC
          </Link>

          {/* [ INTRO ] — using characters so we don't need images */}
          <span
            aria-hidden
            className="text-sm leading-[16px]"
            style={{ color: "var(--color-text)", opacity: 0.6 }}
          >
            [
          </span>
          <span
            className="text-sm font-semibold mx-1.5 leading-[16px]"
            style={{ color: "#1a1b1c83" }}
          >
            INTRO
          </span>
          <span
            aria-hidden
            className="text-sm leading-[16px]"
            style={{ color: "var(--color-text)", opacity: 0.6 }}
          >
            ]
          </span>
        </div>

        {/* right-side button — scaled per inspected markup */}
        <button
          type="button"
          className="inline-flex items-center justify-center whitespace-nowrap font-semibold h-9 px-4 py-2 mx-4 scale-[0.8] leading-[16px] text-[10px]"
          style={{
            backgroundColor: "var(--color-button-bg)",
            color: "#FCFCFC",
            border: "none",
            borderRadius: 0,
          }}
          aria-label="Enter code"
        >
          ENTER CODE
        </button>
      </div>
    </header>
  );
}
