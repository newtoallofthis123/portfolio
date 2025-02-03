/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontSize: {
        mx: "0.6rem",
      },
      fontFamily: {
        mono: ['"GeistMono"', "ui-monospace"],
        sans: ['"GeistSans", "Inter Variable", Arial, sans-serif'],
      },
      colors: {
        rosePine: {
          base: "#282828", // Gruvbox dark background
          surface: "#3c3836", // A slightly lighter background
          overlay: "#504945", // Subtle elevation over the surface
          muted: "#665c54", // Muted tones for borders or secondary text
          subtle: "#7c6f64", // Even subtler accents
          text: "#ebdbb2", // Main text (light on dark)
          love: "#cc241d", // Red accent
          gold: "#d79921", // Yellow/gold accent
          rose: "#b16286", // Pinkish-purple accent
          pine: "#98971a", // Green accent
          foam: "#689d6a", // Aqua/teal accent
          iris: "#458588", // Blue accent
          highlightLow: "#3c3836", // Low-intensity highlight (similar to surface)
          highlightMed: "#504945", // Medium-intensity highlight (similar to overlay)
          highlightHigh: "#665c54", // High-intensity highlight (similar to muted)
        },
        rosePineDawn: {
          base: "#faf4ed",
          surface: "#fffaf3",
          overlay: "#f2e9e1",
          muted: "#9893a5",
          subtle: "#797593",
          text: "#575279",
          love: "#b4637a",
          gold: "#ea9d34",
          rose: "#d7827e",
          pine: "#286983",
          foam: "#56949f",
          iris: "#907aa9",
          highlightLow: "#f4ede8",
          highlightMed: "#dfdad9",
          highlightHigh: "#cecacd",
        },
      },
    },
  },
};
