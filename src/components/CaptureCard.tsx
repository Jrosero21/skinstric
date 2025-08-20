// src/components/CaptureCard.tsx
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  diamonds: { large: string; mid: string; small: string };
  iconSrc: string;
  iconAlt: string;
  labelTop: string;
  labelBottom: string;
  lineImg: string;
  rightSide?: boolean;
  onClick?: () => void;
}>;

export default function CaptureCard({
  diamonds,
  iconSrc,
  iconAlt,
  labelTop,
  labelBottom,
  lineImg,
  rightSide,
  onClick,
  children,
}: Props) {
  return (
    <div className="capture-card" onClick={onClick}>
      {/* Per-card diamonds */}
      <div className="capture-diamond-stage">
        <img
          src={diamonds.large}
          alt="Diamond Large"
          className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] capture-spin-1"
        />
        <img
          src={diamonds.mid}
          alt="Diamond Medium"
          className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] capture-spin-2"
        />
        <img
          src={diamonds.small}
          alt="Diamond Small"
          className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] capture-spin-3"
        />
      </div>

      {/* Icon + label */}
      <div className="capture-icon-wrap">
        <div className="capture-icon hover:scale-105 duration-300 ease-in-out cursor-pointer">
          <img src={iconSrc} alt={iconAlt} className="w-[64%] h-[64%]" />
        </div>

        {/* label + pointer line (position differs per card) */}
        <div
          className={
            rightSide
              ? "absolute top-[75%] md:top-[70%] md:left-[17px] translate-y-[-10px]"
              : "absolute bottom-[1%] right-[90px] md:top-[30.9%] md:right-[-12px] translate-y-[-20px]"
          }
        >
          <p
            className={
              rightSide
                ? "text-[12px] md:text-[14px] font-normal mt-2 leading-[24px] text-right"
                : "text-xs md:text-sm font-normal mt-1 leading-[24px]"
            }
          >
            {labelTop}
            <br />
            {labelBottom}
          </p>
          <img
            src={lineImg}
            alt="Pointer"
            className={
              rightSide
                ? "absolute hidden md:block md:left-[120px] md:bottom-[39px]"
                : "absolute hidden md:block md:right-[143px] md:top-[20px]"
            }
          />
        </div>
      </div>

      {children}
    </div>
  );
}
