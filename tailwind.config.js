/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--tw-border))",
        background: "hsl(var(--tw-background))",
        foreground: "hsl(var(--tw-foreground))",
      },
    },
  },
  plugins: [],
  corePlugins: {
    // CRITICAL: Disable Tailwind's CSS reset (preflight).
    // The site already has its own reset in globals.css.
    // Enabling this would break the entire site layout.
    preflight: false,
  },
}
