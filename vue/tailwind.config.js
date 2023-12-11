/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue, js, ts, jsx, tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-0.75rem)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0rem)'
          }
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-in-out both'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

