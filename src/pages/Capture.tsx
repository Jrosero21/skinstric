import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import  DiamondSpin from "../components/DiamondSpin";
import CaptureCard from "../components/CaptureCard";
import PreviewBox from "../components/PreviewBox";
import PageSubhead from "../components/PageSubhead";
import BackButton from "../components/BackButton";

// assets (relative paths to avoid alias problems)
import CameraIcon from "../assets/camera-icon.png";
import GalleryIcon from "../assets/gallery-icon.png";
import ResDiamondLarge from "../assets/Rectangle2778.png";
import ResDiamondMedium from "../assets/Rectangle2779.png";
import ResDiamondSmall from "../assets/Rectangle2780.png";
import ResScanLine from "../assets/ResScanLine.png";
import ResGalleryLine from "../assets/ResGalleryLine.png";

export default function Capture() {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      // If camera fails (permissions/https), fall back to picker
      fileInputRef.current?.click();
    }
  }, []);

  // Capture a frame from the video for preview
  const snapFromVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 720;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setPreviewSrc(canvas.toDataURL("image/png"));
  }, []);

  // Stop camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const handlePickFile = () => fileInputRef.current?.click();

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPreviewSrc(url);
  };

  return (
    <div className="capture-shell">
      {/* Subhead under brand (same alignment as Testing) */}
      <PageSubhead text="TO START ANALYSIS" />

      {/* Two cards grid */}
      <div className="capture-grid">
        {/* LEFT: Camera */}
        <CaptureCard
          diamonds={{
            large: ResDiamondLarge,
            mid: ResDiamondMedium,
            small: ResDiamondSmall,
          }}
          iconSrc={CameraIcon}
          iconAlt="Camera Icon"
          labelTop="ALLOW A.I."
          labelBottom="TO SCAN YOUR FACE"
          lineImg={ResScanLine}
          linePosClass="md:right-[-12px] md:top-[20px]"
          labelPosClass="md:right-[-12px] md:top-[20px]" // we position line by absolute element below
          onClick={startCamera}
        >
          {/* Hidden video sits on top of icon when streaming */}
          <video
            ref={videoRef}
            className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] rounded-full object-cover"
            style={{ display: streamRef.current ? "block" : "none" }}
            muted
            playsInline
          />
          {/* A small invisible button to “snap” once camera is streaming */}
          {streamRef.current && (
            <button
              type="button"
              className="btn btn-primary mt-40 hidden md:inline-flex"
              onClick={snapFromVideo}
            >
              Snap
            </button>
          )}
        </CaptureCard>

        {/* RIGHT: Gallery */}
        <CaptureCard
          diamonds={{
            large: ResDiamondLarge,
            mid: ResDiamondMedium,
            small: ResDiamondSmall,
          }}
          iconSrc={GalleryIcon}
          iconAlt="Photo Upload Icon"
          labelTop="ALLOW A.I."
          labelBottom="ACCESS GALLERY"
          lineImg={ResGalleryLine}
          rightSide // flips label/line side like the comp
          onClick={handlePickFile}
        />

        {/* hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Spinning diamonds behind each card */}
      <DiamondSpin
        large={ResDiamondLarge}
        mid={ResDiamondMedium}
        small={ResDiamondSmall}
      />

      {/* Preview box (top-right on desktop) */}
      <PreviewBox src={previewSrc} />

      {/* Bottom controls (Back on left; Proceed on right) */}
      <div className="pt-4 md:pt-0 pb-8 bg-white sticky md:static bottom-30.5 mb-0 md:mb-0">
        <div className="absolute bottom-8 w-full flex justify-between md:px-9 px-13">
          <BackButton to="/testing" />

          {/* Hidden until you wire flow; show when preview exists */}
          <Link to="/select" className={previewSrc ? "" : "hidden"}>
            <div className="group hidden sm:flex flex-row relative justify-center items-center">
              <span className="text-sm font-semibold hidden sm:block mr-5">
                PROCEED
              </span>
              <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300" />
              <span className="absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block group-hover:scale-[0.92] ease duration-300">
                ▶
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
