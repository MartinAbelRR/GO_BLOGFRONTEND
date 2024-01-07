/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "background-image": "url(./images/bg-blue.jpg)",
        "laptop-image": "url('./assets/background-form.jpg')",
        'menu-open': "url('./assets/menu.svg')",
        'menu-close': "url('./assets/close.svg')",
        'delete': "url('./assets/delete.svg')"
      },
      colors: {
        "azul-oscuro": "#141A40",
        "azul-semioscuro": "#1D2659",
        "gris-azulado": "#495073",
        "azul": "#1B3DA6",
        "naranja": "#F26A4B",
      },
      fontFamily: {
        "roboto": "'Roboto', sans-serif"
      }
    },
  },
  plugins: [],
}
