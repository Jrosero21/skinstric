// src/pages/Result.jsx
import { useCallback, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import DiamondButton from "../components/ui/DiamondButton";
import RotatingDiamondStack from "../components/graphics/RotatingDiamondStack";

/** Read a File to base64 preview */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onerror = () => reject(new Error("Failed to read file"));
    r.onload = () => resolve(String(r.result));
    r.readAsDataURL(file);
  });
}

export default function Result() {
  const [preview, setPreview] = useState(null);

  const galleryRef = useRef(null);
  const cameraRef = useRef(null);

  const onPick = useCallback(async (file) => {
    if (!file) return;
    const b64 = await fileToBase64(file);
    setPreview(b64);
    try {
      localStorage.setItem("skinstric:imageBase64", b64);
    } catch {}
  }, []);

  const openGallery = () => galleryRef.current?.click();
  const openCamera = () => cameraRef.current?.click();

  // Slightly different spin speeds per side for a subtle variance
  const leftStack = useMemo(
    () => ({ size: 620, speeds: ["animate-spin-36s", "animate-spin-30s", "animate-spin-24s"] }),
    []
  );
  const rightStack = useMemo(
    () => ({ size: 620, speeds: ["animate-spin-45s", "animate-spin-36s", "animate-spin-30s"] }),
    []
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1A1B1C]">
      <Header />

      <main className="relative flex-1">
        {/* top helper line (matches Testing page tone) */}
        <div className="px-6 sm:px-8 md:px-10 mt-1 text-[10px] tracking-wide uppercase">
          To start analysis
        </div>

        {/* Preview box (top-right) */}
        <aside className="absolute right-6 top-16">
          <div className="text-[10px] mb-2 opacity-80">Preview</div>
          <div className="w-[128px] h-[128px] border border-dotted border-[#A0A4AB] bg-white grid place-items-center overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Selected preview"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="text-[10px] text-[#1a1b1c83]">No image</div>
            )}
          </div>
        </aside>

        {/* Two action zones */}
        <section className="relative mt-8 grid grid-cols-1 md:grid-cols-2 gap-y-20">
          {/* LEFT: Camera / Scan your face */}
          <div className="relative flex items-center justify-center py-16">
            {/* rotating dotted stack */}
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <RotatingDiamondStack
                size={leftStack.size}
                speeds={leftStack.speeds}
                opacities={[0.18, 0.22, 0.28]}
              />
            </div>

            <button
              type="button"
              onClick={openCamera}
              className="relative z-10 group grid place-items-center"
              aria-label="Allow A.I. to scan your face (open camera)"
            >
              {/* circular button w/ camera icon */}
              <div className="w-[92px] h-[92px] rounded-full border-2 border-[#1A1B1C] grid place-items-center bg-white shadow-sm transition group-hover:scale-[1.03]">
                <img src="/assets/camera-icon.png" alt="" className="w-10 h-10" />
              </div>

              {/* callout label to the right */}
              <div className="absolute left-[120px] top-1/2 -translate-y-1/2 text-left">
                <div className="text-[10px] uppercase tracking-wide">Allow A.I.</div>
                <div className="text-[10px] uppercase tracking-wide">To scan your face</div>
              </div>
            </button>

            {/* Hidden camera input (mobile can use device camera) */}
            <input
              ref={cameraRef}
              type="file"
              accept="image/*"
              capture="user"
              className="hidden"
              onChange={(e) => onPick(e.target.files?.[0] ?? null)}
            />
          </div>

          {/* RIGHT: Gallery / Access gallery */}
          <div className="relative flex items-center justify-center py-16">
            {/* rotating dotted stack */}
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <RotatingDiamondStack
                size={rightStack.size}
                speeds={rightStack.speeds}
                opacities={[0.18, 0.22, 0.28]}
              />
            </div>

            <button
              type="button"
              onClick={openGallery}
              className="relative z-10 group grid place-items-center"
              aria-label="Allow A.I. to access gallery (pick image)"
            >
              <div className="w-[92px] h-[92px] rounded-full border-2 border-[#1A1B1C] grid place-items-center bg-white shadow-sm transition group-hover:scale-[1.03]">
                <img src="/assets/gallery-icon.png" alt="" className="w-10 h-10" />
              </div>

              {/* callout label to the left */}
              <div className="absolute right-[120px] top-1/2 -translate-y-1/2 text-right">
                <div className="text-[10px] uppercase tracking-wide">Allow A.I.</div>
                <div className="text-[10px] uppercase tracking-wide">Access gallery</div>
              </div>
            </button>

            {/* Hidden gallery input */}
            <input
              ref={galleryRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onPick(e.target.files?.[0] ?? null)}
            />
          </div>
        </section>

        {/* Back (bottom-left) */}
        <div className="absolute left-6 bottom-6">
          <DiamondButton label="BACK" direction="left" to={-1} />
        </div>
      </main>
    </div>
  );
}
