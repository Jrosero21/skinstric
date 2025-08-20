import React from "react";

/** Subhead aligned like on the Testing page (top: 86px, left: 32px) */
export default function PageSubhead({ text }: { text: string }) {
  return (
    <div className="testing-subhead-wrap">
      <p className="testing-subhead">{text}</p>
    </div>
  );
}
