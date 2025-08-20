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

  // focus the invisible input so typing “just works”
  useEffect(() => {
    inputRef.current?.focus();
  }, [phase]);

  const placeholder = phase === "name" ? "Introduce Yourself" : "Enter your city";

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (phase === "name") {
        setPhase("city");
        setValue("");
        return;
      }
      if (phase === "city") {
        setPhase("loading");
        // mock loading -> route after a brief pause
        setTimeout(() => {
          navigate("/result"); // you can swap to your real route later
        }, 900);
      }
    }
  }

  return (
    <section id="testing">
         {/* Subhead below brand (do not change this block’s position) */}
      <div className="testing-subhead-wrap">
        <p className="testing-subhead">TO START ANALYSIS</p>
      </div>

        <div className="testing-shell">
     
      {/* Rotating diamonds (kept exactly as your CSS expects) */}
      <div className="rombus-stage" aria-hidden>
        <img src={RectBig} alt="" className="rombus-img rombus-big spin-slowest" draggable={false} />
        <img src={RectMid} alt="" className="rombus-img rombus-mid  spin-slow"    draggable={false} />
        <img src={RectSmall} alt="" className="rombus-img rombus-small spin-med"   draggable={false} />
      </div>

      {/* Center stack */}
      <div className="testing-center" onClick={() => inputRef.current?.focus()}>
        <div className="testing-click-hint">CLICK TO TYPE</div>

        {/* underline matches text width because of .title-inline */}
        <h1 className="testing-title">
          <span className="title-inline">
            {value.length ? value : placeholder}
          </span>
        </h1>

        {/* invisible input that captures typing */}
        <input
          ref={inputRef}
          className="testing-hidden-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label={placeholder}
        />
      </div>

      {/* Back (left corner) */}
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
