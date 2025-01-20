/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1C7D41',
        secondary: '#F5F6F6',
        text: '#2c3e50',
        border: '#E6E8EC',
      },
      screens: {
        'xs': '320px',
        'sm': '480px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      scale: {
        '51': '1.01',
      },
    },
  },
  plugins: [],
}

