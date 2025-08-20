import React from "react";
import Edge from "../assets/Rectangle.png";
import PolygonLeft from "../assets/PolygonLeft.png";
import PolygonRight from "../assets/PolygonRight.png";

/* team note (amateur dev):
   This page only handles the hero. The header is fixed by <Navbar /> already.
   The “edge” PNGs are purely decorative (behind content). The two .edge-zone
   containers sit on top so we can position the label + icon right at the inner
   corner without messing with the background images.
*/
export default function Home() {
  return (
    <section className="hero">
      {/* decorative half diamonds (behind) */}
      <img src={Edge} alt="" className="edge-img edge-img--left" />
      <img src={Edge} alt="" className="edge-img edge-img--right" />

      {/* center headline block */}
      <div className="hero-center">
        <h1 className="hero-heading">
          Sophisticated
          <br />
          skincare
        </h1>


        <p className="hero-caption-mobile">
          Skinstric developed an A.I. that creates a highly-personalized routine
          tailored to what your skin needs.
        </p>
      </div>

      {/* left interactive zone sitting on top of the left diamond */}
      <div className="edge-zone edge-zone--left" aria-hidden>
        {/* team note: re-enable pointer events on the actual callout so it can be clicked later */}
        <button className="side-callout side-callout--left" type="button">
          <span className="callout-square" aria-hidden>
         
            <img src={PolygonRight} alt="" className="callout-arrow" />
          </span>
          <span className="callout-text">Discover A.I.</span>
        </button>
      </div>

      {/* right interactive zone sitting on top of the right diamond */}
      <div className="edge-zone edge-zone--right" aria-hidden>
        <button className="side-callout side-callout--right" type="button">
          <span className="callout-text">Take test</span>
          <span className="callout-square" aria-hidden>
       
            <img src={PolygonLeft} alt="" className="callout-arrow" />
          </span>
        </button>
      </div>

      {/* desktop caption in the bottom-left */}
      <p className="hero-caption-desktop">
        Skinstric developed an A.I. that creates a
        <br />
        highly-personalized routine tailored to
        <br />
        what your skin needs.
      </p>
    </section>
  );
}
