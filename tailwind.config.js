/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'delete': "url('./assets/delete.svg')",
        "laptop-image": "url('./assets/background-form.jpg')",
        'menu-open': "url('./assets/menu.svg')",
        'menu-close': "url('./assets/close.svg')"        
      },
      colors: {
        "azul": "#1B3DA6",
        "azul-oscuro": "#141A40",
        "azul-semioscuro": "#1D2659",
        "gris-azulado": "#495073",
        "naranja": "#F26A4B"
      },
      fontFamily: {
        "roboto": "'Roboto', sans-serif"
      }
    },
  },
  plugins: [],
}
