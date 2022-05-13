module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        primaryM: 'var(--primaryM)',
        primaryL: 'var(--primaryL)',
      },
      brightness: {
        60: '.60',
      },
    },
  },
  plugins: [],
};
