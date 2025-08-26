// src/pages/Camera/Capture.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { postPhaseTwo } from "../../lib/apiClient";

function BackLite() {
  return (
    <a
      href="/result"
      aria-label="Back"
      className="group flex items-center gap-4 md:gap-5 text-white select-none"
    >
      <span className="relative inline-block w-11 h-11">
        <span className="absolute inset-0 border border-white/85 rotate-45 rounded-[2px] transition duration-200 group-hover:border-white group-hover:scale-[1.04]" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-180 text-white leading-none transition-transform duration-200 group-hover:-translate-x-[46%]">
          ▶
        </span>
      </span>
      <span className="text-sm font-semibold tracking-tight">BACK</span>
    </a>
  );
}

export default function Capture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [ready, setReady] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // NOTE: only change here — make play() reliable and clean up safely
    let stream;
    let cancelled = false;

    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        if (cancelled) {
          // if unmounted before ready, stop immediately
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        const v = videoRef.current;
        if (!v) return;

        // set srcObject once
        v.srcObject = stream;

        // wait for metadata (dimension info) before calling play()
        await new Promise((resolve) => {
          if (v.readyState >= 1) resolve();
          else {
            const onMeta = () => {
              v.removeEventListener("loadedmetadata", onMeta);
              resolve();
            };
            v.addEventListener("loadedmetadata", onMeta);
          }
        });

        // try to play; AbortError is benign if a load interrupts play()
        try {
          await v.play();
        } catch (err) {
          if (!err || err.name !== "AbortError") {
            console.error("Camera play() error:", err);
          }
        }
        setReady(true);
      } catch (e) {
        console.error("Camera error:", e);
      }
    })();

    return () => {
      // tidy up on unmount
      cancelled = true;
      const v = videoRef.current;
      try {
        if (v) {
          v.pause();
          v.srcObject = null;
        }
      } catch {}
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const w = video.videoWidth || video.clientWidth || 1280;
    const h = video.videoHeight || video.clientHeight || 720;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, w, h);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    setPhotoUrl(dataUrl);
    setCaptured(true);
  };

  const handleRetake = () => {
    setCaptured(false);
    setPhotoUrl(null);
    setAnalyzing(false);
  };

  const handleUsePhoto = async () => {
    if (!photoUrl) return;
    
    setAnalyzing(true);
    
    try {
      // Convert data URL to base64 string (remove data:image/jpeg;base64, prefix)
      const base64Image = photoUrl.split(',')[1];
      
      // Call Phase Two API
      const result = await postPhaseTwo({ image: base64Image });
      console.log("Phase Two response:", result);
      
      // Store the result for Summary page
      const existingUser = JSON.parse(localStorage.getItem("sx_user") || "{}");
      localStorage.setItem(
        "sx_user", 
        JSON.stringify({ ...existingUser, phase2: result })
      );
      
      setAnalyzing(false);
      navigate("/select");
    } catch (error) {
      console.error("Phase Two error:", error);
      // Still proceed to keep the flow working
      setAnalyzing(false);
      navigate("/select");
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="relative min-h-[92vh] bg-black">
        <video
          ref={videoRef}
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />

        {photoUrl && (
          <img
            src={photoUrl}
            alt="Captured"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {!captured && (
          <button
            type="button"
            aria-label="Take picture"
            className="group absolute top-1/2 -translate-y-1/2 right-8 md:right-12 flex items-center gap-2 text-white z-20"
            onClick={handleCapture}
          >
            <span className="text-[10px] md:text-xs tracking-[0.08em] opacity-90">
              TAKE PICTURE
            </span>
            <img
              src="/assets/Camera.png"
              alt=""
              draggable={false}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full ring-1 ring-white/55 transition duration-200 ease-out group-hover:scale-105 group-hover:ring-white"
            />
          </button>
        )}

        <div className="absolute left-6 md:left-9 bottom-12 z-20">
          <BackLite />
        </div>

        {!captured && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[150px] md:bottom-[150px] text-center z-20 select-none">
            <p className="text-[10px] md:text-[11px] tracking-[0.08em] text-[#fcfcfc] mb-2">
              TO GET BETTER RESULTS MAKE SURE TO HAVE
            </p>
            <ul className="mt-3 md:mt-4 flex items-center gap-6 md:gap-10 flex-nowrap text-[10px] md:text-[11px] text-[#fcfcfc]">
              <li className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <span className="inline-block w-[9px] h-[9px] border border-white/70 rotate-45" />
                NEUTRAL EXPRESSION
              </li>
              <li className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <span className="inline-block w-[9px] h-[9px] border border-white/70 rotate-45" />
                FRONTAL POSE
              </li>
              <li className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <span className="inline-block w-[9px] h-[9px] border border-white/70 rotate-45" />
                ADEQUATE LIGHTING
              </li>
            </ul>
          </div>
        )}

        {captured && (
          <div className="absolute left-1/2 -translate-x-1/2 top-[96px] md:top-[110px] z-20 select-none">
            <span className="text-[#FCFCFC] tracking-[0.08em] text-xs md:text-sm">
              GREAT SHOT!
            </span>
          </div>
        )}

        {captured && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[102px] text-center z-20">
            <p className="text-[#FCFCFC] text-[11px] md:text-sm mb-3">Preview</p>
            <div className="flex items-center justify-center gap-3 md:gap-4">
              <button
                type="button"
                onClick={handleRetake}
                className="px-5 py-2 bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-300 shadow-md text-sm rounded-none"
              >
                Retake
              </button>
              <button
                type="button"
                onClick={handleUsePhoto}
                disabled={analyzing}
                aria-busy={analyzing}
                className={`px-6 py-2 bg-[#1A1B1C] text-[#FCFCFC] cursor-pointer hover:bg-gray-800 shadow-md text-sm rounded-none ${
                  analyzing ? "opacity-80 pointer-events-none" : ""
                }`}
              >
                {analyzing ? "Uploading..." : "Use This Photo"}
              </button>
            </div>
          </div>
        )}

        {analyzing && (
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            <div className="rounded-md bg-gray-300/90 px-8 pt-6 pb-12 text-gray-800 shadow-lg">
              <div className="text-xl md:text-2xl tracking-wide mb-4">
                ANALYZING IMAGE…
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-700 animate-bounce-x" />
                <span
                  className="w-2.5 h-2.5 rounded-full bg-gray-600 animate-bounce-x"
                  style={{ animationDelay: "0.15s" }}
                />
                <span
                  className="w-2.5 h-2.5 rounded-full bg-gray-500 animate-bounce-x"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
              <div className="h-6 md:h-8" />
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
        <div className="absolute inset-x-0 bottom-0 h-[18px] bg-white/95 pointer-events-none" />
      </section>
    </main>
  );
}
