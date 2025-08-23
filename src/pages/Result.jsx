// src/pages/Result.jsx
import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import DiamondButton from "../components/ui/DiamondButton";
import RotatingDiamondStack from "../components/graphics/RotatingDiamondStack";
import CameraCaptureModal from "../components/camera/CameraCaptureModal";

const BASE = 482; // diamond base size

export default function Result() {
  const [previewUrl, setPreviewUrl] = useState(null);

  // hidden inputs remain for fallback (gallery + camera fallback on old browsers)
  const camRef = useRef(null);
  const galRef = useRef(null);

  // modal for live camera
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraUnsupported, setCameraUnsupported] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl && typeof previewUrl === "string" && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handlePick = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPreviewUrl((old) => {
      if (old && old.startsWith("blob:")) URL.revokeObjectURL(old);
      return url;
    });
  };

  // open the live camera modal (with graceful fallback to input if not supported)
  const openCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setCameraUnsupported(false);
      setCameraOpen(true);
    } else {
      setCameraUnsupported(true);
      camRef.current?.click();
    }
  };

  // when a frame is captured from the modal
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

        {/* TOP-RIGHT preview (label aligned to the box’s left edge) */}
        <div className="absolute right-7 md:right-8 top-2 md:top-4 z-40 text-left">
          <h2 className="text-xs md:text-sm font-normal mb-1">Preview</h2>
          <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 bg-white overflow-hidden">
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
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
                onClick={openCamera}
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

        {/* Bottom overlay (inside the same section) */}
        <div className="absolute bottom-8 left-0 right-0 z-40">
          <div className="w-full flex justify-between md:px-9 px-13">
            <DiamondButton to="/testing" direction="left" label="BACK" />
            <div className="opacity-0 pointer-events-none">
              <DiamondButton to="/select" direction="right" label="PROCEED" />
            </div>
          </div>
        </div>

        {/* hidden inputs (fallbacks) */}
        <input
          ref={camRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handlePick}
        />
        <input
          ref={galRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePick}
        />
      </section>

      {/* Live camera capture modal (only opens if supported) */}
      <CameraCaptureModal
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onCapture={handleCaptureBlob}
        onFallback={() => camRef.current?.click()}
      />
    </main>
  );
}

/* simple local wrapper for the rotating PNG stack */
function ResultDiamonds({ startAngles, size, className }) {
  return (
    <div className={className}>
      <RotatingDiamondStack
        size={size}
        layerScales={[1.0, 0.92, 0.84]}
        layerOpacities={[0.5, 0.7, 0.9]} // darker: largest lightest, smallest darkest
        startAngles={startAngles}
        spinClasses={["animate-spin-40s", "animate-spin-30s", "animate-spin-24s"]}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
