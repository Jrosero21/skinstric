// Home.tsx
// note to team: importing the PNG through Vite keeps paths correct in dev/prod
const halfDiamond = new URL("../assets/Rectangle.png", import.meta.url).href;

export default function Home() {
  return (
    <section className="hero">
      {/* decorative half-diamonds; pointer-events off so they never block clicks */}
      <img src={halfDiamond} alt="" aria-hidden="true" className="edge-img edge-img--left" />
      <img src={halfDiamond} alt="" aria-hidden="true" className="edge-img edge-img--right" />

      {/* left callout sits INSIDE the left diamond (zone width = edge-height/2) */}
      <div className="edge-zone edge-zone--left">
        <button className="side-callout side-callout--left" type="button" aria-label="Discover A.I.">
          <span className="callout-square">
            {/* filled inward arrow (▶) — using tiny inline SVG so it’s crisp at any scale */}
            <svg viewBox="0 0 24 24" width="11" height="11" className="tri tri-right" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="callout-text">DISCOVER A.I.</span>
        </button>
      </div>

      {/* right callout sits INSIDE the right diamond */}
      <div className="edge-zone edge-zone--right">
        <button className="side-callout side-callout--right" type="button" aria-label="Take test">
          <span className="callout-text">TAKE TEST</span>
          <span className="callout-square">
            {/* filled inward arrow (◀) */}
            <svg viewBox="0 0 24 24" width="11" height="11" className="tri tri-left" aria-hidden="true">
              <path d="M16 19V5L5 12z" />
            </svg>
          </span>
        </button>
      </div>

      {/* center headline */}
      <div className="hero-center">
        <h1 className="hero-heading">
          Sophisticated
          <br />
          skincare
        </h1>
        {/* mobile caption only */}
        <p className="hero-caption-mobile">
          Skinstric developed an A.I. that creates a highly-personalized routine tailored to what your skin needs.
        </p>
      </div>

      {/* desktop caption (bottom-left) */}
      <p className="hero-caption-desktop">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A
        <br />
        HIGHLY-PERSONALIZED ROUTINE TAILORED TO
        <br />
        WHAT YOUR SKIN NEEDS.
      </p>
    </section>
  );
}
