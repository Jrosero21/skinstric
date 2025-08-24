// src/pages/camera/Capture.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

export default function Capture() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stream;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setReady(true);
        }
      } catch (err) {
        console.error("getUserMedia error:", err);
      }
    })();

    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <main className="min-h-screen bg-black relative">
      {/* Fixed white bar behind header (to match reference) */}
      <div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-[64px] bg-white z-40 pointer-events-none"
      />
      <Header /> {/* Header will sit above the white bar */}

      {/* live video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          playsInline
          muted
          className="w-full h-full object-cover"
        />
      </div>

      {/* WHITE back button (unchanged) */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Back"
        className="fixed left-6 bottom-8 z-50 group flex items-center gap-4 text-white"
      >
        <div className="w-12 h-12 rotate-45 border border-white flex items-center justify-center group-hover:scale-[1.03] transition">
          <span className="rotate-[-45deg] -translate-x-[2px]">◀</span>
        </div>
        <span className="text-sm font-semibold">BACK</span>
      </button>

      {/* shutter button uses Camera.png (unchanged) */}
      <button
        type="button"
        className="fixed right-10 top-1/2 -translate-y-1/2 z-50 flex items-center gap-3"
        onClick={() => {
          // capture logic to be wired later
          console.log("TODO: capture frame");
        }}
      >
        <span className="text-[11px] tracking-wider text-white/90">
          TAKE PICTURE
        </span>
        <img
          src="/assets/Camera.png"
          alt="Shutter"
          className="w-[56px] h-[56px] select-none"
          draggable={false}
        />
      </button>

      {/* bottom guidance — moved up a bit */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-40 text-center text-white/80">
        <p className="text-[11px] md:text-xs tracking-[0.06em]">
          TO GET BETTER RESULTS MAKE SURE TO HAVE
        </p>
        <ul className="mt-2 flex items-center gap-6 md:gap-10 text-[11px] md:text-xs">
          <li className="inline-flex items-center gap-2">
            <span className="inline-block w-[10px] h-[10px] border border-white/70 rotate-45" />
            NEUTRAL EXPRESSION
          </li>
          <li className="inline-flex items-center gap-2">
            <span className="inline-block w-[10px] h-[10px] border border-white/70 rotate-45" />
            FRONTAL POSE
          </li>
          <li className="inline-flex items-center gap-2">
            <span className="inline-block w-[10px] h-[10px] border border-white/70 rotate-45" />
            ADEQUATE LIGHTING
          </li>
        </ul>
      </div>

      {/* tiny loading hint if camera isn’t ready yet (unchanged) */}
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <span className="text-white/80 text-sm">Opening camera…</span>
        </div>
      )}
    </main>
  );
}
