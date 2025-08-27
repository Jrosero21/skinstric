// src/pages/Result.jsx
import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import DiamondButton from "../components/ui/DiamondButton";
import RotatingDiamondStack from "../components/graphics/RotatingDiamondStack";
import CameraCaptureModal from "../components/camera/CameraCaptureModal";
import { useNavigate } from "react-router-dom";

const BASE = 482;

export default function Result() {
  const [previewUrl, setPreviewUrl] = useState(null);

  const camRef = useRef(null);
  const galRef = useRef(null);

  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraUnsupported, setCameraUnsupported] = useState(false);

  // camera permission prompt
  const [showCamPrompt, setShowCamPrompt] = useState(false);

  // NEW: preparing overlay for gallery flow
  const [isPreparing, setIsPreparing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (previewUrl && typeof previewUrl === "string" && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // unchanged: basic picker handler (used by camera fallback input)
  const handlePick = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPreviewUrl((old) => {
      if (old && old.startsWith("blob:")) URL.revokeObjectURL(old);
      return url;
    });
  };

  // NEW: gallery-specific handler — same preview behavior + preparing overlay + alert
  const handleGalleryPick = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    const url = URL.createObjectURL(f);
    setPreviewUrl((old) => {
      if (old && old.startsWith("blob:")) URL.revokeObjectURL(old);
      return url;
    });

    // show “Preparing analysis…” state, then pop the success notice
    setIsPreparing(true);
    // short realistic delay (matches your video feel)
    setTimeout(() => {
      alert("Image analyzed successfully!");
      setIsPreparing(false);
      // ROUTE TO SELECT AFTER USER HITS "OK"
      navigate("/select");
    }, 1300);
  };

  const openCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setCameraUnsupported(false);
      setCameraOpen(true);
    } else {
      setCameraUnsupported(true);
      camRef.current?.click();
    }
  };

  const handleCaptureBlob = (blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    setPreviewUrl((old) => {
      if (old && old.startsWith("blob:")) URL.revokeObjectURL(old);
      return url;
    });
    setCameraOpen(false);
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Start Analysis section */}
      <section className="min-h-[92vh] flex flex-col bg-white relative md:pt-[64px] justify-center overflow-hidden">
        {/* TOP-LEFT label */}
        <div className="absolute top-2 left-9 md:left-8 text-left z-40">
          <p className="font-semibold text-xs md:text-sm tracking-[0.02em]">
            TO START ANALYSIS
          </p>
        </div>

        {/* TOP-RIGHT preview */}
        <div className="absolute right-7 md:right-8 top-2 md:top-4 z-40 text-left">
          <h2 className="text-xs md:text-sm font-normal mb-1">Preview</h2>
          <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 bg-white overflow-hidden">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
        </div>

        {/* MAIN STAGE */}
        <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-30 space-y-[-20px] md:space-y-0">
          {/* LEFT: Camera */}
          <div className="relative md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:-translate-y-[0%] -translate-y-[1%] md:-translate-x-full flex flex-col items-center justify-center">
            <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]" />
            <ResultDiamonds
              startAngles={[200, 190, 0]}
              size={BASE}
              className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px]"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img
                src="/assets/camera-icon.png"
                alt="Camera Icon"
                width={136}
                height={136}
                onClick={() => setShowCamPrompt(true)}
                className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-105 duration-700 ease-in-out cursor-pointer"
              />
              <div className="absolute bottom-[1%] right-[90px] md:top-[30.9%] md:right-[-12px] translate-y-[-20px] select-none">
                <p className="text-xs md:text-sm font-normal mt-1 leading-[24px]">
                  ALLOW A.I.
                  <br />
                  TO SCAN YOUR FACE
                </p>
                <img
                  src="/assets/ResScanLine.png"
                  alt=""
                  className="absolute hidden md:block md:right-[143px] md:top-[20px]"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Gallery */}
          <div className="relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] flex flex-col items-center mt-12 md:mt-0 justify-center md:-translate-y-[0%] -translate-y-[10%] transition-opacity duration-300">
            <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]" />
            <ResultDiamonds
              startAngles={[205, 195, 0]}
              size={BASE}
              className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px]"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img
                src="/assets/gallery-icon.png"
                alt="Photo Upload Icon"
                width={136}
                height={136}
                onClick={() => galRef.current?.click()}
                className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-105 duration-700 ease-in-out cursor-pointer"
              />
              <div className="absolute top-[75%] md:top-[70%] md:left-[17px] translate-y-[-10px] select-none">
                <p className="text-[12px] md:text-[14px] font-normal mt-2 leading-[24px] text-right">
                  ALLOW A.I.
                  <br />
                  ACCESS GALLERY
                </p>
                <img
                  src="/assets/ResGalleryLine.png"
                  alt=""
                  className="absolute hidden md:block md:left-[120px] md:bottom-[39px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom overlay */}
        <div className="absolute bottom-8 left-0 right-0 z-40">
          <div className="w-full flex justify-between md:px-9 px-13">
            <DiamondButton to="/testing" direction="left" label="BACK" />
            <div className="opacity-0 pointer-events-none">
              <DiamondButton to="/select" direction="right" label="PROCEED" />
            </div>
          </div>
        </div>

        {/* hidden inputs */}
        <input
          ref={camRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handlePick}
        />
        {/* NEW: gallery input uses the gallery-specific handler */}
        <input
          ref={galRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleGalleryPick}
        />
      </section>

      {/* Live camera modal  */}
      <CameraCaptureModal
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onCapture={handleCaptureBlob}
        onFallback={() => camRef.current?.click()}
      />

      {/* Camera permission prompt */}
      {showCamPrompt && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
          <div className="inline-block w-auto max-w-[92vw] shadow-2xl">
            <div className="bg[rgba(26,27,28,0.95)] bg-[rgba(26,27,28,0.95)] pt-4 pb-2">
              <h2 className="text-[#FCFCFC] text-base font-semibold mb-12 leading-[24px] px-6 text-center">
                ALLOW A.I. TO ACCESS YOUR CAMERA
              </h2>
              <div className="flex justify-end gap-8 mt-4 border-t border-[#FCFCFC] pt-2 pr-6 pl-6">
                <button
                  type="button"
                  onClick={() => setShowCamPrompt(false)}
                  className="px-3 text-[#fcfcfca1] font-normal text-sm leading-4 tracking-tight cursor-pointer hover:text-gray-500"
                >
                  DENY
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCamPrompt(false);
                    navigate("/camera");
                  }}
                  className="px-3 text-[#FCFCFC] font-semibold text-sm leading-4 tracking-tight cursor-pointer hover:text-gray-300"
                >
                  ALLOW
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEW: Preparing overlay (gallery flow) */}
      {isPreparing && (
        <div className="fixed inset-0 z-[1200] bg-black/55 backdrop-blur-[1px] flex items-center justify-center">
          <div className="relative w-[260px] h-[260px]">
            <RotatingDiamondStack
              size={260}
              layerScales={[1.0, 0.92, 0.84]}
              layerOpacities={[0.55, 0.75, 0.95]}
              startAngles={[200, 190, 0]}
              spinClasses={["animate-spin-40s", "animate-spin-30s", "animate-spin-24s"]}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
              <p className="text-[#FCFCFC] text-[12px] md:text-[13px] font-semibold tracking-[0.06em]">
                PREPARING YOUR ANALYSIS...
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function ResultDiamonds({ startAngles, className }) {
  const boxRef = React.useRef(null);
  const [size, setSize] = React.useState(0);

  React.useLayoutEffect(() => {
    if (!boxRef.current) return;
    const el = boxRef.current;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      setSize(Math.floor(Math.min(r.width, r.height)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={boxRef} className={className}>
      <RotatingDiamondStack
        size={size || 1}                 // fall back to 1px until measured
        layerScales={[1.0, 0.92, 0.84]}
        layerOpacities={[0.5, 0.7, 0.9]}
        startAngles={startAngles}
        spinClasses={["animate-spin-40s", "animate-spin-30s", "animate-spin-24s"]}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
