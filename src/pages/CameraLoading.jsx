// src/pages/CameraLoading.jsx
import React from "react";
import Header from "../components/Header";
import RotatingDiamondStack from "../components/graphics/RotatingDiamondStack";

const BASE = 482;

export default function CameraLoading() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="min-h-[92vh] relative md:pt-[64px] flex flex-col items-center">
        <div className="flex-1 w-full flex flex-col items-center justify-center">
          {/* Diamond + icon */}
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

            {/* MOVED: status text now inside the stack, directly under the icon */}
            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[88px] md:translate-y-[108px] text-[11px] md:text-sm tracking-wider text-[#9CA3AF]">
              SETTING UP CAMERA …
            </p>
          </div>

          {/* Tips block (now directly below the stack since status moved inside) */}
          <div className="mt-6 md:mt-7 text-center">
            <p className="text-[11px] md:text-xs text-[#6B7280] tracking-[0.06em]">
              TO GET BETTER RESULTS MAKE SURE TO HAVE
            </p>

            {/* Replaced bullets with hollow square-diamonds (rotated bordered squares) */}
            <ul className="mt-3 md:mt-4 flex items-center justify-center gap-6 md:gap-10 text-[11px] md:text-xs text-[#6B7280]">
              <li className="inline-flex items-center">
                <span
                  className="inline-block w-[9px] h-[9px] border border-[#6B7280] rotate-45 mr-3 align-middle"
                  aria-hidden="true"
                />
                <span className="align-middle">NEUTRAL EXPRESSION</span>
              </li>
              <li className="inline-flex items-center">
                <span
                  className="inline-block w-[9px] h-[9px] border border-[#6B7280] rotate-45 mr-3 align-middle"
                  aria-hidden="true"
                />
                <span className="align-middle">FRONTAL POSE</span>
              </li>
              <li className="inline-flex items-center">
                <span
                  className="inline-block w-[9px] h-[9px] border border-[#6B7280] rotate-45 mr-3 align-middle"
                  aria-hidden="true"
                />
                <span className="align-middle">ADEQUATE LIGHTING</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
