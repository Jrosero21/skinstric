import React from "react";
import { useNavigate } from "react-router-dom";

import RectSmall from "../assets/Rectangle2778.png";
import RectMid from "../assets/Rectangle2779.png";
import RectBig from "../assets/Rectangle2780.png";

import PolygonLeft from "../assets/PolygonLeft.png";
import cameraIcon from "../assets/camera-icon.png";
import galleryIcon from "../assets/gallery.png";

export default function Capture() {
  const nav = useNavigate();

  return (
    <section className="capture-shell">
      {/* header subhead (kept consistent) */}
      <div className="testing-subhead-wrap">
        <p className="testing-subhead">TO START ANALYSIS</p>
      </div>

      {/* small preview box (top-right) */}
      <aside className="cap-preview">
        <h3 className="cap-preview-title">Preview</h3>
        <div className="cap-preview-box" />
      </aside>

      {/* options grid */}
      <div className="cap-grid">
        {/* Camera option */}
        <div className="cap-card">
          <div className="rombus-stage" aria-hidden>
            <img className="rombus-img rombus-mid spin-slowest" src={RectMid} alt="" />
            <img className="rombus-img rombus-small spin-slow" src={RectSmall} alt="" />
          </div>

          <button
            type="button"
            className="cap-circle"
            onClick={() => alert("Open camera flow (to be wired to real API)")}
          >
            <img src={cameraIcon} alt="" className="cap-icon" />
          </button>

          <p className="cap-label">
            ALLOW A.I. <br /> TO SCAN YOUR FACE
          </p>
        </div>

        {/* Gallery option */}
        <div className="cap-card">
          <div className="rombus-stage" aria-hidden>
            <img className="rombus-img rombus-mid spin-slowest" src={RectMid} alt="" />
            <img className="rombus-img rombus-small spin-slow" src={RectSmall} alt="" />
          </div>

          <button
            type="button"
            className="cap-circle"
            onClick={() => alert("Open gallery picker (to be wired to real API)")}
          >
            <img src={galleryIcon} alt="" className="cap-icon" />
          </button>

          <p className="cap-label">
            ALLOW A.I. <br /> ACCESS GALLERY
          </p>
        </div>
      </div>

      {/* back bottom-left (same as testing) */}
      <button className="testing-back" onClick={() => nav(-1)}>
        <span className="testing-back-icon">
          <img src={PolygonLeft} alt="" />
        </span>
        <span className="testing-back-text">Back</span>
        <span className="sr-only">Go back</span>
      </button>
    </section>
  );
}
