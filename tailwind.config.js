/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  // The public site has its own reset in globals.css; Tailwind only styles /studio.
  corePlugins: { preflight: false },
  plugins: [],
}
