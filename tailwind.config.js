export default {
  content: [
  "./index.html",
  "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
  extend: {
  borderRadius: {
  xl: "calc(var(--radius) - 2px)",
  '2xl': "var(--radius)",
  '3xl': "calc(var(--radius) + 6px)",
  },
  },
  },
  plugins: [],
  };