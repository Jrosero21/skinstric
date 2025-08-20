import React from "react";

type Props = {
  large: string;
  mid: string;
  small: string;
};

export default function DiamondSpin({ large, mid, small }: Props) {
  return (
    <div className="capture-diamond-stage">
      {/* These are decorative page-wide spinners; if you want one set per card instead, move into the card */}
      <img
        src={large}
        alt="Diamond Large"
        className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] capture-spin-1"
        style={{ left: "50%", top: "38%", transform: "translate(-50%, -50%)" }}
      />
      <img
        src={mid}
        alt="Diamond Medium"
        className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] capture-spin-2"
        style={{ left: "50%", top: "39%", transform: "translate(-50%, -50%)" }}
      />
      <img
        src={small}
        alt="Diamond Small"
        className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] capture-spin-3"
        style={{ left: "50%", top: "40%", transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
}
