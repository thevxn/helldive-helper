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
          900: '#ff8e15'
        },
        pcgreen: {
          900: '#40c84f'
        },
        pcblue: {
          900: '#0ea5ff'
        },
        pcpink: {
          900: '#e118c2'
        }
      }
    }
  },
  plugins: []
}
