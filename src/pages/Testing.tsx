import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Use relative paths so Vite doesn't need aliases
import RectSmall from "../assets/Rectangle2778.png";
import RectMid from "../assets/Rectangle2779.png";
import RectBig from "../assets/Rectangle2780.png";

import PolygonLeft from "../assets/PolygonLeft.png";
import PolygonRight from "../assets/PolygonRight.png";

type Step = "name" | "city" | "processing" | "thankyou";

export default function Testing() {
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const nav = useNavigate();

  useEffect(() => {
    if (step === "name" || step === "city") {
      inputRef.current?.focus();
    }
  }, [step]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== "Enter") return;

    if (step === "name") {
      if (!name.trim()) return;
      setStep("city");
      return;
    }
    if (step === "city") {
      if (!city.trim()) return;
      setStep("processing");
      // fake API delay
      setTimeout(() => setStep("thankyou"), 1600);
      return;
    }
  };

  const label =
    step === "name"
      ? "Introduce Yourself"
      : step === "city"
      ? "Enter your city"
      : step === "processing"
      ? "Processing submission"
      : "Thank you!";

  return (
    <section className="testing-shell">
      {/* ===== top-left subhead (unchanged) ===== */}
      <div className="testing-subhead-wrap">
        <p className="testing-subhead">TO START ANALYSIS</p>
      </div>

      {/* rotating diamonds in the back */}
      <div className="rombus-stage" aria-hidden>
        <img className="rombus-img rombus-big   spin-slowest" src={RectBig} alt="" />
        <img className="rombus-img rombus-mid   spin-slow"    src={RectMid} alt="" />
        <img className="rombus-img rombus-small spin-med"     src={RectSmall} alt="" />
      </div>

      {/* ===== centered content ===== */}
      <div className="testing-center">
        {step === "processing" ? (
          <div className="text-center">
            <p className="testing-title opacity-70">{label}</p>
            <div className="mt-3 flex items-center justify-center gap-2 opacity-50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#98a0aa] animate-pulse"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#98a0aa] animate-pulse [animation-delay:120ms]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#98a0aa] animate-pulse [animation-delay:240ms]"></span>
            </div>
          </div>
        ) : step === "thankyou" ? (
          <div className="text-center">
            <h2 className="thank-title">Thank you!</h2>
            <p className="thank-sub">Proceed for the next step</p>
          </div>
        ) : (
          <>
            <p className="testing-click-hint">CLICK TO TYPE</p>

            {/* locked underline exactly matches text width */}
            <span className="title-inline">
              <span className="testing-title">{label}</span>
            </span>

            {/* invisible full-area input to capture typing (no visible field below) */}
            <input
              ref={inputRef}
              className="testing-hidden-input"
              value={step === "name" ? name : step === "city" ? city : ""}
              onChange={(e) =>
                step === "name" ? setName(e.target.value) : setCity(e.target.value)
              }
              onKeyDown={handleKeyDown}
              aria-label={step === "name" ? "Your name" : "Your city"}
            />
          </>
        )}
      </div>

      {/* back in bottom-left */}
      <button
        className="testing-back"
        onClick={() => {
          if (step === "city") setStep("name");
          else if (step === "processing") setStep("city");
          else if (step === "thankyou") setStep("city");
          else nav(-1);
        }}
      >
        <span className="testing-back-icon">
          <img src={PolygonLeft} alt="" />
        </span>
        <span className="testing-back-text">Back</span>
        <span className="sr-only">Go back</span>
      </button>

      {/* proceed (bottom-right) only on thankyou */}
      {step === "thankyou" && (
        <Link to="/capture" className="proceed-cta" aria-label="Proceed to capture">
          <span>Proceed</span>
          <span className="proceed-icon">
            <img src={PolygonRight} alt="" />
          </span>
        </Link>
      )}
    </section>
  );
}
