
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}", 
  ],
  theme: {
    extend: {
      fontFamily:{
        handi:'"Handlee", cursive',
        robotothin:' "Dancing Script", cursive'

      },
      backgroundImage:{
        // bg:"url('Images/gallery.jpg')",
      }
    },
  },
  plugins: [],
}


