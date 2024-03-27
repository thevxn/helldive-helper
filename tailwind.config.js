/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        chocolate: {
          600: '#d96c1d'
        }
      }
    }
  },
  plugins: []
}
