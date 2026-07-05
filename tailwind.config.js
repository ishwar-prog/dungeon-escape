/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#FFB800", // Retro golden yellow
        "main-foreground": "#000000",
        border: "#000000",
        background: "#FFF8EB", // Warm parchment light background
        "secondary-background": "#F5E6C8", // Warm parchment darker/accent background
        foreground: "#000000",
        stone: "#8B8594",
        brick: "#E8543E",
        moss: "#5FAD65",
        "violet-deep": "#2B1B3D",
        "violet-mid": "#3D2A54",
      },
      borderRadius: {
        base: "4px",
      },
      boxShadow: {
        shadow: "4px 4px 0px 0px rgba(0,0,0,1)",
        nav: "4px 4px 0px 0px rgba(0,0,0,1)",
        sidebar: "4px 4px 0px 0px rgba(0,0,0,1)",
      },
      translate: {
        boxShadowX: "4px",
        boxShadowY: "4px",
        reverseBoxShadowX: "-4px",
        reverseBoxShadowY: "-4px",
      },
      fontFamily: {
        heading: ["'Baloo 2'", "sans-serif"],
        base: ["'Nunito'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      fontWeight: {
        heading: "800",
        base: "700",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-6px)" },
          "75%": { transform: "translateX(6px)" },
        },
      },
      animation: {
        wiggle: "wiggle 3s ease-in-out infinite",
        shake: "shake 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
