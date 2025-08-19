/** @type {import('tailwindcss').Config} */

export default {
    theme: {
      extend: {
        colors: {
          bg: "hsl(var(--bg))",
          fg: "hsl(var(--fg))",
          brand: "hsl(var(--brand))",
        },
        fontFamily: {
          // swapped from Inter → Roobert so the app uses the correct font
          sans: ["Roobert", "ui-sans-serif", "system-ui", "sans-serif"],
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
  