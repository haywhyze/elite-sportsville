/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ['var(--font-montserrat)'],
      },
      backgroundImage: {
        hero: "url('/hero.png')",
      },
      colors: {
        'custom-green': '#239d24',
        'custom-green-dark': '#1e7d1e',
        'custom-gold': '#fecc01',
        'custom-gold-dark': '#e5b401',
        'custom-purple': '#9000b9',
        'custom-purple-dark': '#770097',
        'custom-black': '#0b2740',
        'custom-black-dark': '#071c2c',
        'custom-purple-light': '#a461d8',
        
        'bright-yellow': '#FFCC00',
        'bright-purple': '#A000CC',
        'dark-purple': '#500066',
        'dark-green': '#239E23',
        'bright-purple-dark': '#8B009F',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
