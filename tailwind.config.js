/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",    // for app directory (Next.js 13+)
    "./pages/**/*.{js,ts,jsx,tsx}",  // for pages directory
    "./components/**/*.{js,ts,jsx,tsx}", // if you use components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
