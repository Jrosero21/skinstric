/** @type {import('tailwindcss').Config} */
// Tailwind v4 doesn't require "content". We'll just extend theme a bit
// so we can map CSS variables (Figma tokens) into Tailwind classes.
export default {
    theme: {
      extend: {
        colors: {
          bg: "hsl(var(--bg))",
          fg: "hsl(var(--fg))",
          brand: "hsl(var(--brand))",
        },
        fontFamily: {
          // using Inter now; can swap to brand font later
          sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        },
        letterSpacing: {
          // tight hero look per Figma
          tightest: "-0.03em",
        },
        borderRadius: {
          // common rounded radius in comps
          xl: "12px",
        },
      },
    },
    // plugins: [] // we can add forms/typography later if needed
  };
  