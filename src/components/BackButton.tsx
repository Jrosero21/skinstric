// src/components/BackButton.tsx
import React from "react";
import { Link } from "react-router-dom";

/*
  Team note (junior dev-style):
  - Replaced the image import (PolygonLeft.png) with an inline SVG arrow.
  - This removes a file dependency and fixes the Vite "cannot resolve import" error.
  - If design later requires a specific PNG, we can swap the <svg> for an <img>.
*/

export default function BackButton({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} aria-label="Back" className="relative inline-flex items-center gap-2">
      {/* Inline left arrow (triangle) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="w-3 h-3 fill-current text-[#1A1B1C] rotate-180"
      >
        {/* Using ▶ but drawn with a path so it’s crisp */}
        <path d="M8 5v14l11-7z" />
      </svg>

      <span className="text-sm font-medium text-[#1A1B1C]">Back</span>
    </Link>
  );
}
