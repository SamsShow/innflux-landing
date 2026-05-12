/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ground: "#0A0B0D",
        surface: "#15171B",
        hairline: "#1F2227",
        border2: "#2A2D33",
        text: "#FAFAF7",
        muted: "#9AA0A8",
        soft: "#C9CCD2",
        dim: "#8A8F98",
        faint: "#5C6068",
        gold: "#FFD24A",
        peach: "#FF7A4D",
        magenta: "#D63CFF",
      },
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "monospace"],
        serif: ["Instrument Serif", "ui-serif", "serif"],
      },
    },
  },
  plugins: [],
};
