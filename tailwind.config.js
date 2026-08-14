/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        text: "var(--text)",
        "border-color": "var(--border-color)",
        "neo-yellow": "var(--c-yellow)",
        "neo-yellow-light": "var(--c-yellow-light)",
        "neo-pink": "var(--c-pink)",
        "neo-cyan": "var(--c-cyan)",
        "neo-lime": "var(--c-lime)",
        "neo-purple": "var(--c-purple)",
        "neo-orange": "var(--c-orange)",
        "neo-beige": "var(--c-beige)",
        "neo-indigo": "var(--c-indigo)",

        /* Palette exact named tokens from image */
        "evergreen": "var(--c-evergreen)",
        "darkteal": "var(--c-darkteal)",
        "yellow-green": "var(--c-yellow-green)",
        "cayenne": "var(--c-cayenne)",
        "soft-linen": "var(--c-soft-linen)",

        "yellow-wasabi": "var(--c-yellow-wasabi)",
        "orange-topaz": "var(--c-orange-topaz)",
        "cool-blue": "var(--c-cool-blue)",
        "cassis": "var(--c-cassis)",
        "vert-sauge": "var(--c-vert-sauge)",

        "acid-mint": "var(--c-acid-mint)",
        "signal-blue": "var(--c-signal-blue)",
        "brute-orange": "var(--c-brute-orange)",
        "poster-yellow": "var(--c-poster-yellow)",
        "system-indigo": "var(--c-system-indigo)",
        "riot-purple": "var(--c-riot-purple)",
        "nb-white": "var(--c-nb-white)",
        "nb-black": "var(--c-nb-black)",
      },
      fontFamily: {
        head: ["var(--font-head)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        pixel: ["var(--font-pixel)", "cursive"],
      },
      boxShadow: {
        hard: "var(--shadow-hard)",
        "hard-lg": "var(--shadow-hard-lg)",
        "hard-sm": "var(--shadow-hard-sm)",
      },
      borderWidth: {
        neo: "var(--border-width)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
