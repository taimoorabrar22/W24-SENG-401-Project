/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        customBlue: '#007bff', // Example custom color
        customGreen: '#142917', // Another example custom color
        customPink: '#C71585',  // Yet another example custom color
        customPink2: '#f542d4',
        customBeige: '#8a6f24',  // Yet another example custom color
        customBeige2: '#C6AA58'
      },
    },
    fontFamily: {
      sans: ["Dancing Script", "serif"],
    },
  },
  plugins: [],
};

