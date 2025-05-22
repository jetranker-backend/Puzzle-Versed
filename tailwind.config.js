/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'tech': ['Space Grotesk', 'JetBrains Mono', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
