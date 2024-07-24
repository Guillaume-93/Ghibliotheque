/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // animation: {
      //   marquee: "marquee 20s linear infinite",
      //   "marquee-reverse": "marquee-reverse 20s linear infinite",
      // },
      // keyframes: {
      //   marquee: {
      //     "0%": { transform: "translateX(100%)" },
      //     "100%": { transform: "translateX(-100%)" },
      //   },
      //   "marquee-reverse": {
      //     "0%": { transform: "translateX(-100%)" },
      //     "100%": { transform: "translateX(100%)" },
      //   },
      // },
      boxShadow: {
        '3xl': '3px 3px 3px 3px rgba(0, 0, 0, 0.4)',
        // Ajoutez d'autres niveaux d'ombre si nécessaire
        '4xl': '5px 5px 3px 3px rgba(0, 0, 0, 0.4)',
        '5xl': '8px 8px 3px 3px rgba(0, 0, 0, 0.4)',
      },
      fontFamily: {
        lilita: ['Lilita One', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        inknut: ['"Inknut Antiqua"', 'serif'],
        greatVibes: ['"Great Vibes"', 'cursive'],
        raleway: ['"Raleway"', 'sans-serif'],
        kanit: ['"Kanit"', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
