import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// use RELATIVE paths (keeps your build happy without vite alias)
import RectSmall from "../assets/Rectangle2778.png";
import RectMid from "../assets/Rectangle2779.png";
import RectBig from "../assets/Rectangle2780.png";
import PolygonLeft from "../assets/PolygonLeft.png";

type Phase = "name" | "city" | "loading";

export default function Testing() {
  const [phase, setPhase] = useState<Phase>("name");
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // focus the input so typing “just works”
  useEffect(() => {
    inputRef.current?.focus();
  }, [phase]);

  const placeholder = phase === "name" ? "Introduce Yourself" : "Enter your city";

  function handleEnter() {
    if (phase === "name") {
      setPhase("city");
      setValue("");
      // re-focus next tick
      requestAnimationFrame(() => inputRef.current?.focus());
      return;
    }
    if (phase === "city") {
      setPhase("loading");
      setTimeout(() => navigate("/result"), 900);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEnter();
    }
  }

  return (
    <section id="testing">
      
      <div className="testing-shell">
        {/* Subhead below brand (kept your alignment) */}
      <div className="testing-subhead-wrap">
        <p className="testing-subhead">TO START ANALYSIS</p>
      </div>
        {/* Rotating diamonds (unchanged from your file) */}
        <div className="rombus-stage" aria-hidden>
          <img src={RectBig} alt="" className="rombus-img rombus-big spin-slowest" draggable={false} />
          <img src={RectMid} alt="" className="rombus-img rombus-mid  spin-slow"    draggable={false} />
          <img src={RectSmall} alt="" className="rombus-img rombus-small spin-med"   draggable={false} />
        </div>

        {/* Center stack */}
        <div className="testing-center">
          <div className="testing-click-hint">CLICK TO TYPE</div>

          {/* Headline + locked underline */}
          <h1 className="testing-title">
            {/* wrapper is position:relative so we can lay the input over the text */}
            <span className="title-inline-wrap">
              <span className="title-inline-text">
                {value.length ? value : placeholder}
              </span>
              {/* overlay input: transparent text, visible caret, same font metrics */}
              <input
                ref={inputRef}
                className="typing-overlay-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                aria-label={placeholder}
                autoCapitalize="words"
                autoCorrect="off"
                spellCheck={false}
              />
            </span>
          </h1>
        </div>

        {/* Back (left corner) — outer diamond + left arrow */}
        <Link to="/" className="testing-back" aria-label="Back to intro">
          <span className="testing-back-icon">
            <img src={PolygonLeft} alt="" />
          </span>
          <span className="testing-back-text">Back</span>
        </Link>
      </div>
    </section>
  );
}
