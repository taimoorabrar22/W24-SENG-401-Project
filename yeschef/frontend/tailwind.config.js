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
        customPink: '#e83e8c',  // Yet another example custom color
        customBeige: '#C6AA58',  // Yet another example custom color
      },
    },
    fontFamily: {
      sans: ["Fraunces", "serif"],
    },
  },
  plugins: [],
};

