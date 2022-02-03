module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
       
        '3xl': 'rgba(0, 0, 0, 0.15) 0px 2px 8px',
      },
      colors: {
       
        'light-green': '#08BD37',
        'neutral-0': "#F9F9F9",
        'neutral-100': "#333447",
        'neutral-50': "#3F3E3E",
        'light-yellow': "#FFF4EA"
      },
      margin:{
        '3rem': "3rem"
      }
    },
  },
  plugins: [],
}