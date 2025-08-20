import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* rotating dotted diamonds */
import RectSmall from "../assets/Rectangle2778.png";
import RectMid   from "../assets/Rectangle2779.png";
import RectLarge from "../assets/Rectangle2780.png";

/* back button arrow (use LEFT asset so the direction is correct) */
import ArrowLeft from "../assets/PolygonLeft.png";

export default function Testing() {
  const nav = useNavigate();

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (step === 0) {
        setStep(1);
        setValue("");
      } else if (step === 1) {
        setStep(2);
        // setTimeout(() => nav("/result"), 900);
      }
    }
  };

  const headline =
    step === 0 ? (value || "Introduce Yourself") : (value || "Enter City");

  return (
    <section className="testing">
      {/* subhead sits under the header; separate container so it doesn't affect centering */}
      <div className="testing-subhead-wrap" aria-hidden="true">
        <p className="testing-subhead">TO START ANALYSIS</p>
      </div>

      {/* dotted diamonds */}
      <img src={RectLarge} alt="" className="rhombus rhombus--3" />
      <img src={RectMid}   alt="" className="rhombus rhombus--2" />
      <img src={RectSmall} alt="" className="rhombus rhombus--1" />

      {/* center input (click anywhere to focus) */}
      <div
        className="testing-center"
        onClick={() => inputRef.current?.focus()}
        role="button"
        aria-label="Type your response"
      >
        {value.length === 0 && <p className="click-to-type">CLICK TO TYPE</p>}

        <h1 className="testing-title" aria-live="polite">
          <span className="title-text">{headline}</span>
          <span className="title-fixed-underline" aria-hidden="true" />
        </h1>

        {/* hidden input captures typing */}
        <input
          ref={inputRef}
          className="sr-only-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
        />
      </div>

      {/* back button (bottom-left) */}
      <button
        type="button"
        className="testing-back side-callout side-callout--left"
        onClick={() => nav(-1)}
        aria-label="Go back"
      >
        <div className="callout-square">
          <img src={ArrowLeft} alt="" className="callout-arrow arrow-cancel-rotate" />
        </div>
        <span className="callout-text">BACK</span>
      </button>

      {step === 2 && (
        <div className="testing-loading" aria-live="polite">
          <div className="dot dot1" />
          <div className="dot dot2" />
          <div className="dot dot3" />
        </div>
      )}
    </section>
  );
}
