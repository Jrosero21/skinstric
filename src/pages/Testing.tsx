// src/pages/Testing.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

/*
  Team note (junior dev-style):
  - The previous build failed because Vite couldn’t resolve ../assets/*.png imports.
  - Best practice for plain static images: place them in /public/assets and reference by URL strings.
  - That means we don’t "import" the files; we use src="/assets/Rectangle2778.png" directly.
*/

export default function Testing() {
  const navigate = useNavigate();

  // Phase 1 fields (name + location) – we’ll wire validation + API next
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  // Quick placeholders for the three decorative rectangles (served from /public)
  const RectSmall = "/assets/Rectangle2778.png";
  const RectMid = "/assets/Rectangle2779.png";
  const RectBig = "/assets/Rectangle2780.png";

  const onBack = () => navigate("/");
  const onProceed = (e: React.FormEvent) => {
    e.preventDefault();
    // In Phase 1 API step we’ll:
    // - validate inputs
    // - persist to localStorage
    // - POST to skinstricPhaseOne
    // For now, just navigate forward as a placeholder.
    navigate("/results");
  };

  return (
    <main className="min-h-[100dvh] bg-white text-[#1A1B1C]">
      {/* Top bar with back */}
      <div className="flex items-center justify-between px-4 py-4">
        <BackButton to="/" />
        <button
          type="button"
          onClick={onBack}
          className="text-xs rounded px-2 py-1 border border-[#1A1B1C]/20 hover:bg-[#1A1B1C]/5"
        >
          Exit
        </button>
      </div>

      {/* Decorative rectangles row (uses public assets) */}
      <div className="mx-auto mt-6 flex items-center justify-center gap-4">
        <img
          src={RectSmall}
          alt=""
          className="h-8 w-auto select-none"
          draggable={false}
        />
        <img
          src={RectMid}
          alt=""
          className="h-10 w-auto select-none"
          draggable={false}
        />
        <img
          src={RectBig}
          alt=""
          className="h-12 w-auto select-none"
          draggable={false}
        />
      </div>

      {/* Phase 1 form (placeholder UI; API/validation added next) */}
      <form onSubmit={onProceed} className="mx-auto mt-10 max-w-md px-4">
        <h1 className="mb-6 text-2xl font-semibold">Introduce Yourself</h1>

        <label className="mb-3 block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-5 w-full rounded border border-[#1A1B1C]/30 px-3 py-2 outline-none focus:border-[#1A1B1C]"
          placeholder="John Doe"
        />

        <label className="mb-3 block text-sm font-medium">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mb-8 w-full rounded border border-[#1A1B1C]/30 px-3 py-2 outline-none focus:border-[#1A1B1C]"
          placeholder="New York"
        />

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="rounded border border-[#1A1B1C] px-4 py-2 text-sm hover:bg-[#1A1B1C] hover:text-white transition"
          >
            Back
          </button>

            <button
              type="submit"
              className="rounded bg-[#1A1B1C] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition"
            >
              Proceed
            </button>
        </div>
      </form>
    </main>
  );
}
