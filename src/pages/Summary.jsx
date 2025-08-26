import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

// simple ring svg
function Ring({ value = 51 }) {
  const clamped = Math.max(0, Math.min(100, value));
  const C = 50;
  const R = 49.15;
  const CIRC = 2 * Math.PI * R;
  const dash = useMemo(
    () => ({
      trail: `${CIRC}px ${CIRC}px`,
      path: `${CIRC}px ${CIRC}px`,
      offset: `${((100 - clamped) / 100) * CIRC}px`,
    }),
    [clamped, CIRC]
  );

  return (
    <div className="relative w-full max-w-[384px] aspect-square">
      <svg className="text-[#1A1B1C]" viewBox="0 0 100 100">
        <path
          className="CircularProgressbar-trail"
          d={`M ${C},${C} m 0,-${R} a ${R},${R} 0 1 1 0,${2 * R} a ${R},${R} 0 1 1 0,-${2 * R}`}
          strokeWidth="1.7"
          fillOpacity="0"
          style={{
            stroke: "#DFE2E6",
            strokeLinecap: "butt",
            strokeDasharray: dash.trail,
            strokeDashoffset: 0,
          }}
        />
        <path
          className="CircularProgressbar-path"
          d={`M ${C},${C} m 0,-${R} a ${R},${R} 0 1 1 0,${2 * R} a ${R},${R} 0 1 1 0,-${2 * R}`}
          strokeWidth="1.7"
          fillOpacity="0"
          style={{
            stroke: "#1A1B1C",
            strokeLinecap: "butt",
            transitionDuration: "0.8s",
            strokeDasharray: dash.path,
            strokeDashoffset: dash.offset,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-3xl md:text-[40px] font-normal">
          {clamped}
          <span className="absolute text-xl md:text-3xl">%</span>
        </p>
      </div>
    </div>
  );
}

export default function Summary() {
  // active panel: 'race' | 'age' | 'sex'
  const [active, setActive] = useState("race");

  // static options (API later)
  const data = {
    race: [
      ["Latino hispanic", 51],
      ["Southeast asian", 23],
      ["White", 13],
      ["East asian", 5],
      ["South asian", 3],
      ["Middle eastern", 2],
      ["Black", 0],
    ],
    age: [
      ["0-2", 29],
      ["3-9", 0],
      ["10-19", 0],
      ["20-29", 0],
      ["30-39", 31], // default
      ["40-49", 0],
      ["50-59", 7],
      ["60-69", 3],
      ["70+", 29],
    ],
    sex: [
      ["MALE", 64], // default
      ["FEMALE", 35],
    ],
  };

  // per-category selected index (defaults match earlier screenshots)
  const [selected, setSelected] = useState({
    race: 0,
    age: 4,
    sex: 0,
  });

  const headline = data[active][selected[active]]?.[0] ?? "";
  const activePct = data[active][selected[active]]?.[1] ?? 0;

  // helper for left-tile labels
  const leftLabels = {
    race: data.race[selected.race][0],
    age: data.age[selected.age][0],
    sex: data.sex[selected.sex][0],
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header section="ANALYSIS" />

      <main className="flex-1 w-full bg-white md:overflow-hidden overflow-auto">
        <div className="md:h-full max-w-full mx-5 px-4 md:px-0 flex flex-col">
          {/* Title */}
          <div className="text-start ml-4 mb-4 md:mb-10 md:ml-0">
            <h2 className="text-base font-semibold mb-1 leading-[24px]">A.I. ANALYSIS</h2>
            <h3 className="text-4xl md:text-[72px] font-normal leading-[64px] tracking-tighter">
              DEMOGRAPHICS
            </h3>
            <h4 className="text-sm mt-2 leading-[24px]">PREDICTED RACE &amp; AGE</h4>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-[1.5fr_8.5fr_3.15fr] gap-4 mt-10 mb-40 md:gap-4 md:mb-0">
            {/* LEFT TILES */}
            <div className="bg-white space-y-3 md:flex md:flex-col">
              <button
                type="button"
                onClick={() => setActive("race")}
                className={`p-3 cursor-pointer border-t flex flex-col justify-between
                  ${active === "race" ? "bg-[#1A1B1C] text-white hover:bg-black" : "bg-[#F3F3F4] hover:bg-[#E1E1E2]"}
                  h-[96px] md:h-[136px] text-left`}
              >
                <p className="text-base font-semibold">{leftLabels.race}</p>
                <h4 className="text-base font-semibold mb-1">RACE</h4>
              </button>

              <button
                type="button"
                onClick={() => setActive("age")}
                className={`p-3 cursor-pointer border-t flex flex-col justify-between
                  ${active === "age" ? "bg-[#1A1B1C] text-white hover:bg-black" : "bg-[#F3F3F4] hover:bg-[#E1E1E2]"}
                  h-[96px] md:h-[136px] text-left`}
              >
                <p className="text-base font-semibold">{leftLabels.age}</p>
                <h4 className="text-base font-semibold mb-1">AGE</h4>
              </button>

              <button
                type="button"
                onClick={() => setActive("sex")}
                className={`p-3 cursor-pointer border-t flex flex-col justify-between
                  ${active === "sex" ? "bg-[#1A1B1C] text-white hover:bg-black" : "bg-[#F3F3F4] hover:bg-[#E1E1E2]"}
                  h-[96px] md:h-[136px] text-left`}
              >
                <p className="text-base font-semibold">{leftLabels.sex}</p>
                <h4 className="text-base font-semibold mb-1">SEX</h4>
              </button>
            </div>

            {/* CENTER PANEL */}
            <div className="relative bg-gray-100 p-4 flex flex-col items-center justify-center md:h-[57vh] md:border-t">
              <p className="hidden md:block md:absolute text-[40px] mb-2 left-5 top-2">
                {headline}
              </p>

              {/* keep ring right-aligned */}
              <div className="relative md:absolute w-full mb-4 md:right-5 md:bottom-2">
                <div className="flex w-full items-center justify-end">
                  <Ring value={activePct} />
                </div>
              </div>

              <p className="md:absolute text-xs text-[#A0A4AB] md:text-sm lg:text-base font-normal mb-1 leading-[24px] md:bottom-[-15%] md:left-[22%] lg:left-[30%] xl:left-[40%] 2xl:left-[45%]">
                If A.I. estimate is wrong, select the correct one.
              </p>
            </div>

            {/* RIGHT LIST  */}
            <div className="bg-gray-100 pt-4 pb-4 md:border-t">
              <div className="space-y-0">
                <div className="flex justify-between px-4">
                  <h4 className="text-base leading-[24px] tracking-tight font-medium mb-2 uppercase">
                    {active}
                  </h4>
                  <h4 className="text-base leading-[24px] tracking-tight font-medium mb-2">
                    A.I. CONFIDENCE
                  </h4>
                </div>

                {data[active].map(([label, pct], idx) => {
                  const isActive = idx === selected[active];
                  return (
                    <button
                      type="button"
                      key={`${active}-${idx}`}
                      onClick={() =>
                        setSelected((prev) => ({ ...prev, [active]: idx }))
                      }
                      className={`flex w-full items-center justify-between h-[48px] px-4 cursor-pointer
                        ${isActive ? "bg-[#1A1B1C] text-white hover:bg-black" : "hover:bg-[#E1E1E2]"}`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block h-[12px] w-[12px] rounded-full border ${
                            isActive ? "bg-white border-white" : "border-[#1A1B1C]"
                          }`}
                        />
                        <span className="font-normal text-base leading-6 tracking-tight">
                          {label}
                        </span>
                      </div>
                      <span className="font-normal text-base leading-6 tracking-tight">
                        {pct}%
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom nav */}
          <div className="pt-4 md:pt-[37px] pb-6 bg-white sticky bottom-40 md:static md:bottom-0 mb-8 md:mb-16">
            <div className="flex justify-between max-w-full mx-auto px-4 md:px-0">
              <Link to="/select">
                <div>
                  <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                    <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
                      BACK
                    </span>
                  </div>
                  <div className="group hidden sm:flex flex-row relative justify-center items-center">
                    <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300" />
                    <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block group-hover:scale-[0.92] ease duration-300">
                      ▶
                    </span>
                    <span className="text-sm font-semibold hidden sm:block ml-6">
                      BACK
                    </span>
                  </div>
                </div>
              </Link>

              <Link to="/">
                <div>
                  <div className="w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                    <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
                      HOME
                    </span>
                  </div>
                  <div className="hidden sm:flex flex-row relative justify-center items-center">
                    <span className="text-sm font-semibold hidden sm:block mr-5">
                      HOME
                    </span>
                    <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85]" />
                    <span className="absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block">
                      ▶
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
