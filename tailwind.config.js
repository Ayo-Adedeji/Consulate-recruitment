/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Animations
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        fadeInDown: 'fadeInDown 0.8s ease-out forwards',
        fadeInLeft: 'fadeInLeft 0.8s ease-out forwards',
        fadeInRight: 'fadeInRight 0.8s ease-out forwards',
        fadeIn: 'fadeIn 1s ease-out forwards',
        marquee: 'marquee 20s linear infinite',
        marqueeSlow: 'marquee 35s linear infinite',
        marqueeMedium: 'marquee 28s linear infinite',
        marqueeFast: 'marquee 22s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 6s ease-in-out infinite 2s',
      },
      

      // Colors
      colors: {
        /* Brand */
        primary: "#1F3A5F",
        primaryLight: "#2F5D8A",
        accent: "#F59E0B",
        azure: "#007FFF",
        azureSoft: "#1E88E5",

        /* Backgrounds */
        bg: "#F8FAFC",
        section: "#20B2AA",
        card: "#FFFFFF",

        /* Text */
        heading: "#0F172A",
        body: "#F5F7FA",
        muted: "#FFBFAA",

        /* Footer */
        footer: "#1A2A6C",
        footerText: "#94A3B8",
      },

      // Fonts
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "Inter", "sans-serif"],
      },

      // Box Shadows
      boxShadow: {
        soft: "0 10px 25px rgba(15, 23, 42, 0.08)",
        card: "0 6px 18px rgba(15, 23, 42, 0.06)",
      },

      // Border Radius
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
