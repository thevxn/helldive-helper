/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        chocolate: {
          600: '#d96c1d'
        },
        pcorange: {
          900: '#ffa500'
        },
        pcgreen: {
          900: '#008000'
        },
        pcblue: {
          900: '#0000ff'
        },
        pcpurple: {
          900: '#800080'
        }
      }
    }
  },
  plugins: []
}
