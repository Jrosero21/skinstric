import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

// rombus assets (relative paths, as you set up)
import RectSmall from "../assets/Rectangle2778.png";
import RectMid from "../assets/Rectangle2779.png";
import RectBig from "../assets/Rectangle2780.png";

type Step = "name" | "city";

export default function Testing() {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("name");
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // keep the caret visible in the input
  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      if (step === "name") {
        setStep("city");
        setValue("");
      } else {
        // next screen in your flow
        navigate("/capture");
      }
    }
  };

  // lock underline length to a sensible base (matches “Introduce Yourself”)
  const baseChars = step === "name" ? 18 : 12;
  const underlineCh = Math.max(baseChars, (value?.length || 0) || baseChars);

  return (
    <main className="testing-shell">
      {/* Subheader lives under <main> (as you wanted) */}
      <div className="testing-subhead-wrap">
        <p className="testing-subhead">TO START ANALYSIS</p>
      </div>

      {/* rotating diamonds — classes/speeds come from your CSS */}
      <div className="rombus-stage">
        <img src={RectBig} alt="" className="rombus-img rombus-big spin-slow" />
        <img src={RectMid} alt="" className="rombus-img rombus-mid spin-slower" />
        <img src={RectSmall} alt="" className="rombus-img rombus-small spin-slowest" />
      </div>

      {/* centered headline/input with bottom border (underline) */}
      <div className="testing-center">
        <p className="testing-click-hint">CLICK TO TYPE</p>

        <div className="flex justify-center">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={step === "name" ? "Introduce Yourself" : "Your City"}
            aria-label={step === "name" ? "Introduce Yourself" : "City"}
            className="
              testing-title
              bg-transparent
              border-0 border-b border-[#1A1B1C]
              focus:ring-0 outline-none
              text-center placeholder-[#A1A8B3]
            "
            // underline width tracks text length (locked baseline)
            style={{ width: `${underlineCh}ch` }}
          />
        </div>
      </div>

      {/* Back (same component/placement as Capture) */}
      <div className="fixed bottom-6 left-6 z-[5]">
        <BackButton to="/" />
      </div>
    </main>
  );
}
