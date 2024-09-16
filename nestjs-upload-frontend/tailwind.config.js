module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Ajuste para os arquivos de sua aplicação
  ],
  theme: {
    extend: {
      screens: {
      mbl: { max: "630px" }, // mbl == mobile
      // => @media (max-width: 630px) { ... }
    },
    },
  },
  plugins: [],
}
