// src/pages/CameraLoading.jsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import RotatingDiamondStack from "../components/graphics/RotatingDiamondStack";

const BASE = 482;

export default function CameraLoading() {
  const navigate = useNavigate();

  // called when the countdown finishes
  const handleDone = useCallback(() => {
    // relative to /camera -> goes to /camera/capture
    navigate("capture", { replace: true });
  }, [navigate]);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="min-h-[92vh] relative md:pt-[64px] flex flex-col items-center">
        <div className="flex-1 w-full flex flex-col items-center justify-center">
          {/* Diamond + icon (relative wrapper) */}
          <div className="relative w-[270px] h-[270px] md:w-[482px] md:h-[482px]">
            <RotatingDiamondStack
              size={BASE}
              layerScales={[1.0, 0.92, 0.84]}
              layerOpacities={[0.5, 0.7, 0.9]}
              startAngles={[200, 190, 0]}
              spinClasses={["animate-spin-40s", "animate-spin-30s", "animate-spin-24s"]}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />

            <img
              src="/assets/camera-icon.png"
              alt="Camera"
              width={136}
              height={136}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] md:w-[136px] md:h-[136px]"
              draggable={false}
            />

            {/* STATUS: inside the same wrapper, just below the icon */}
            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[56px] md:translate-y-[72px] text-[11px] md:text-sm tracking-wider text-[#9CA3AF]">
              SETTING UP CAMERA …
            </p>
          </div>

          {/* Tips block (unchanged) */}
          <div className="mt-6 md:mt-7 text-center">
            <p className="text-[11px] md:text-xs text-[#6B7280] tracking-[0.06em]">
              TO GET BETTER RESULTS MAKE SURE TO HAVE
            </p>
            <ul className="mt-3 md:mt-4 flex items-center gap-6 md:gap-10 text-[11px] md:text-xs text-[#6B7280]">
              <li className="inline-flex items-center gap-2">
                <span className="inline-block w-[10px] h-[10px] border border-[#A0A4AB] rotate-45" />
                NEUTRAL EXPRESSION
              </li>
              <li className="inline-flex items-center gap-2">
                <span className="inline-block w-[10px] h-[10px] border border-[#A0A4AB] rotate-45" />
                FRONTAL POSE
              </li>
              <li className="inline-flex items-center gap-2">
                <span className="inline-block w-[10px] h-[10px] border border-[#A0A4AB] rotate-45" />
                ADEQUATE LIGHTING
              </li>
            </ul>
          </div>
        </div>

        {/* Countdown bar – isolated so layout doesn’t shift */}
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[8vh] w-[min(720px,70vw)]">
          <CountdownBar durationMs={3200} onDone={handleDone} />
        </div>
      </section>
    </main>
  );
}

/* Thin centered countdown bar that shrinks to zero */
function CountdownBar({ durationMs = 3000, onDone }) {
  const [pct, setPct] = useState(0);
  const fired = useRef(false);

  useEffect(() => {
    const start = performance.now();
    let raf = requestAnimationFrame(function tick(now) {
      const next = Math.min(100, ((now - start) / durationMs) * 100);
      setPct(next);
      if (next < 100) {
        raf = requestAnimationFrame(tick);
      } else if (!fired.current) {
        fired.current = true;
        onDone?.(); // tell parent to navigate
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [durationMs, onDone]);

  const remaining = Math.max(0, 100 - pct);
  const marginLeft = (100 - remaining) / 2;

  return (
    <div className="h-[4px] md:h-[6px] rounded-full bg-zinc-300/50 overflow-hidden">
      <div
        className="h-full bg-zinc-400/70 rounded-full transition-[width,margin] duration-75 ease-linear"
        style={{ width: `${remaining}%`, marginLeft: `${marginLeft}%` }}
      />
    </div>
  );
}
