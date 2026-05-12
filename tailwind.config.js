/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ground: "#0A1F17",
        surface: "#0F2820",
        hairline: "#1A3327",
        border2: "#2A4536",
        text: "#FAFAF7",
        muted: "#9AA8A2",
        soft: "#C9D5CF",
        dim: "#8A988F",
        faint: "#5C6862",
        gold: "#B7F1D5",
        peach: "#5FCDA0",
        magenta: "#2DB4C8",
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
