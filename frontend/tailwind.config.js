// tailwind.config.js
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: '#5f6FFF', // your custom primary color
        },
        gridTemplateColumns: {
          auto: 'repeat(auto-fill, minmax(200px, 1fr))',
        },
      },
    },
    plugins: [],
  }
  