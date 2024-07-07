// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Include all JS, JSX, TS, and TSX files in the src directory
    './public/index.html',         // Include your main HTML file
    // Add any other paths where Tailwind utility classes are used
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
