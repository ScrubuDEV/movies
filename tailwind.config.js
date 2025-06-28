module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    extend: {},
  },
  plugins: [],
  // Important for Material compatibility
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles to prevent conflicts
  },
};
