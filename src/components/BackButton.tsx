import React from "react";
import { Link } from "react-router-dom";
import PolygonLeft from "../assets/PolygonLeft.png";

/**
 * Back button (bottom-left) that matches the hero/test styles.
 * Uses the existing index.css classes: .testing-back / .testing-back-icon
 */
type BackButtonProps = {
  to?: string;
  label?: string;
  className?: string;
};

export default function BackButton({
  to = "/",
  label = "Back",
  className = "",
}: BackButtonProps) {
  return (
    <Link to={to} className={`testing-back ${className}`}>
      <span className="testing-back-icon">
        {/* inner icon (kept small so it fits within the diamond) */}
        <img src={PolygonLeft} alt="" aria-hidden="true" />
      </span>
      <span className="testing-back-text">{label}</span>
    </Link>
  );
}
