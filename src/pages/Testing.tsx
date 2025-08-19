import React, { useState } from "react";
import { Link } from "react-router-dom";

import rect602 from "../assets/Rectangle2778.png"; // 602 x 602
import rect682 from "../assets/Rectangle2779.png"; // 682 x 682
import rect762 from "../assets/Rectangle2780.png"; // 762 x 762

export default function Testing() {
  // very light state machine just to show the skeleton of the flow
  const [step, setStep] = useState<"name" | "city" | "loading">("name");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  function goNext(e: React.FormEvent) {
    e.preventDefault();
    if (step === "name" && name.trim()) {
      setStep("city");
    } else if (step === "city" && city.trim()) {
      setStep("loading");
      // purely decorative delay so you can see the loading state
      setTimeout(() => {
        // we’ll wire this to the real next screen later
      }, 1500);
    }
  }

  return (
    <section className="testing">
      {/* rotating diamonds */}
      <div className="rombs" aria-hidden="true">
        <img className="r1" src={rect602} alt="" />
        <img className="r2" src={rect682} alt="" />
        <img className="r3" src={rect762} alt="" />
      </div>

      {/* center content */}
      <div className="testing-center">
        {step !== "loading" ? (
          <>
            <div className="testing-sub">CLICK TO TYPE</div>
            <h1 className="testing-heading">Introduce Yourself</h1>

            <form className="testing-form" onSubmit={goNext}>
              {step === "name" && (
                <input
                  autoFocus
                  className="testing-input"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              {step === "city" && (
                <input
                  autoFocus
                  className="testing-input"
                  placeholder="Your city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              )}

              <button className="testing-submit" type="submit">
                Continue
              </button>
            </form>
          </>
        ) : (
          <div className="testing-loading">Analyzing…</div>
        )}
      </div>

      {/* back link (bottom-left) */}
      <Link to="/" className="testing-back">
        BACK
      </Link>
    </section>
  );
}
