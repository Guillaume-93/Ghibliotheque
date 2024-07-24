/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '3px 3px 3px 3px rgba(0, 0, 0, 0.4)',
        '4xl': '5px 5px 3px 3px rgba(0, 0, 0, 0.4)',
        '5xl': '8px 8px 3px 3px rgba(0, 0, 0, 0.4)',
      },
      fontFamily: {
        lilita: ['Lilita One', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        inknut: ['"Inknut Antiqua"', 'serif'],
        raleway: ['"Raleway"', 'sans-serif'],
        kanit: ['"Kanit"', 'sans-serif'],
        openSans: ['"Open Sans"', 'sans-serif'],
        lato: ['"Lato"', 'sans-serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        merriweather: ['"Merriweather"', 'serif'],
        ubuntu: ['"Ubuntu"', 'sans-serif'],
        oswald: ['"Oswald"', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
        nunito: ['"Nunito"', 'sans-serif'],
        customCursive: ['cursive'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
