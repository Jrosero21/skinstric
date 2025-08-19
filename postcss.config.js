// Vite + Tailwind v4 PostCSS config
// note: tailwind's PostCSS plugin now lives in @tailwindcss/postcss
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    tailwindcss(),  // processes @import "tailwindcss"
    autoprefixer(), // vendor prefixes
  ],
};
