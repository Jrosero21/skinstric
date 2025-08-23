// src/components/camera/CameraCaptureModal.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * Lightweight camera modal that uses getUserMedia to capture a single frame.
 * - Requests the "environment" camera when available.
 * - Falls back via onFallback() if permission is denied or unsupported.
 * - Returns a Blob (image/jpeg) through onCapture(blob).
 */
export default function CameraCaptureModal({ open, onClose, onCapture, onFallback }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  // Start/stop camera when modal opens/closes
  useEffect(() => {
    let stopped = false;

    async function start() {
      setError("");
      setReady(false);
      if (!open) return;

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Camera not supported on this device.");
        onFallback && onFallback();
        onClose && onClose();
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
        if (stopped) {
          // safety: if we closed quickly, stop and bail
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Safari/iOS requires playsInline + muted + autoplay on the element to start
          const play = videoRef.current.play();
          if (play && typeof play.catch === "function") {
            play.catch(() => {});
          }
        }
        setReady(true);
      } catch (e) {
        setError("Unable to access camera.");
        onFallback && onFallback();
        onClose && onClose();
      }
    }

    start();
    return () => {
      stopped = true;
      stopStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const stopStream = () => {
    const s = streamRef.current;
    if (s) {
      s.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  const handleCapture = async () => {
    if (!videoRef.current) return;
    setLoading(true);

    const video = videoRef.current;
    const w = video.videoWidth || 1280;
    const h = video.videoHeight || 720;

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, w, h);

    canvas.toBlob(
      (blob) => {
        setLoading(false);
        if (blob) {
          onCapture && onCapture(blob);
        } else {
          setError("Capture failed. Try again.");
        }
        stopStream();
      },
      "image/jpeg",
      0.92
    );
  };

  const handleClose = () => {
    stopStream();
    onClose && onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-[1px] flex items-center justify-center">
      <div className="bg-white w-[min(92vw,900px)] max-w-[900px] rounded-none shadow-xl relative">
        {/* Video area */}
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-contain"
            playsInline
            autoPlay
            muted
          />
          {!ready && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/90 text-sm">Opening camera…</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-4 py-3">
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex items-center justify-center h-9 px-4 text-xs font-semibold bg-white border border-zinc-300 hover:bg-zinc-50"
          >
            Cancel
          </button>

          <div className="text-xs text-red-600">{error}</div>

          <button
            type="button"
            onClick={handleCapture}
            disabled={!ready || loading}
            className="inline-flex items-center justify-center h-9 px-4 text-xs font-semibold text-white bg-[#1A1B1C] hover:bg-black disabled:opacity-50"
          >
            {loading ? "Capturing…" : "Capture"}
          </button>
        </div>
      </div>
    </div>
  );
}
