import withMT from '@material-tailwind/react/utils/withMT'
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,jsx}",],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['Roboto', 'sans-serif'],
      }
    },
    
  },
  plugins: [],
});