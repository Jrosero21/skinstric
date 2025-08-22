// src/pages/Testing.tsx
import { useState, useRef } from "react";
import Header from "../components/Header";
import RotatingDiamondStack from "../components/graphics/RotatingDiamondStack";
import { useNavigate } from "react-router-dom";
import DiamondButton from "../components/ui/DiamondButton";

type Step = "name" | "city" | "processing" | "done";

export default function Testing() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const goBack = () => {
    if (step === "name") navigate(-1);
    else if (step === "city") setStep("name");
    else if (step === "processing") setStep("city");
    else setStep("city");
  };

  const advanceFromName = () => {
    if (!name.trim()) return;
    setStep("city");
  };

  const advanceFromCity = () => {
    if (!city.trim()) return;
    setStep("processing");
    setTimeout(() => setStep("done"), 1600);
  };

  const onProceed = () => {
    navigate("/");
  };

  const Prompt = ({
    labelTop = "CLICK TO TYPE",
    placeholder,
    value,
    onChange,
    onEnter,
  }: {
    labelTop?: string;
    placeholder: string;
    value: string;
    onChange: (v: string) => void;
    onEnter: () => void;
  }) => (
    <div className="relative z-10 mx-auto w-full text-center">
      <p className="mb-3 text-[14px] leading-[24px] uppercase text-[#1A1B1C]/40">
        {labelTop}
      </p>
      {/* shorter underline */}
      <div className="mx-auto w-[340px] md:w-[480px]">
        <input
          ref={inputRef}
          autoFocus
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onEnter()}
          className="w-full bg-transparent text-center outline-none
                     text-[#1A1B1C] text-[60px] leading-[64px] tracking-[-0.07em] font-normal
                     border-b border-[#B8BCC1] placeholder:text-[#8a8f95]"
          placeholder={placeholder}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1A1B1C]">
      <Header section="INTRO" />

      <main className="relative flex-1">
        <div className="px-4 sm:px-6 lg:px-8 mt-1">
          <p className="text-[16px] font-semibold uppercase tracking-[-0.02em]">
            TO START ANALYSIS
          </p>
        </div>

        {/* Center stage */}
        <section className="relative z-0 mx-auto flex h-[calc(100vh-11rem)] max-w-[1200px] items-center justify-center">
          {/* move the stack+prompt slightly higher */}
          <div className="relative -translate-y-8">
            {/* Rotating squares around the prompt */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="origin-center scale-[0.70] md:scale-[1.20]">
                <RotatingDiamondStack
                  size={602}
                  layerOpacities={[0.55, 0.78, 0.98]}     // outer, middle, inner
                  layerScales={[1.00, 0.92, 0.84]}        // outer > middle > inner
                  layerBrightness={[1.18, 1.05, 0.92]}     // gentle lighten -> neutral -> darken
                />
              </div>
            </div>

            {/* Step content */}
            <div className="relative z-10">
              {step === "name" && (
                <Prompt
                  placeholder="Introduce Yourself"
                  value={name}
                  onChange={setName}
                  onEnter={advanceFromName}
                />
              )}

              {step === "city" && (
                <Prompt
                  placeholder="your city name"
                  value={city}
                  onChange={setCity}
                  onEnter={advanceFromCity}
                />
              )}

              {step === "processing" && (
                <div className="relative z-10 text-center">
                  <p className="text-[13px] text-[#8a8f95]">Processing submission</p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c6c9cd] animate-bounce-x" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c6c9cd] animate-bounce-x [animation-delay:.12s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c6c9cd] animate-bounce-x [animation-delay:.24s]" />
                  </div>
                </div>
              )}

              {step === "done" && (
                <div className="relative z-10 text-center">
                  <p className="text-[22px] md:text-[26px] font-medium">Thank you!</p>
                  <p className="mt-2 text-[13px] text-[#8a8f95]">
                    Proceed for the next step
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Bottom-left BACK — bigger + hover */}
        <div className="absolute bottom-6 left-4 md:left-6">
          <button
            onClick={goBack}
            className="group inline-flex items-center gap-3 text-sm font-semibold tracking-wide"
          >
            <span
              aria-hidden
              className="relative inline-flex h-8 w-8 rotate-45 items-center justify-center border border-[#1A1B1C]
                         transition-all duration-300 ease-out
                         group-hover:scale-[1.06] group-hover:bg-black/5
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
            >
              <img
                src="/assets/PolygonLeft.png"
                alt=""
                className="absolute -rotate-45 h-3 w-3 select-none transition-transform duration-300 ease-out group-hover:-translate-x-[2px]"
                draggable={false}
              />
            </span>
            <span className="uppercase transition-colors duration-300 ease-out group-hover:text-black">
              BACK
            </span>
          </button>
        </div>

        {/* Bottom-right PROCEED — diamond to the RIGHT of the word + enter animation */}
        {step === "done" && (
          <div className="absolute bottom-6 right-4 md:right-6 animate-proceed-enter">
            <DiamondButton
              label="PROCEED"
              direction="right"
              iconPosition="trailing"
              size="md"
              to="#"
            />
            {/* If you need it to actually navigate, call onProceed here instead of "#" */}
            <button onClick={onProceed} className="sr-only" aria-hidden tabIndex={-1} />
          </div>
        )}
      </main>
    </div>
  );
}
