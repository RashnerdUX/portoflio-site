/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'circle-gradient': 'var(--circle-gradient)',
      },
    },
  },
  plugins: [],
}