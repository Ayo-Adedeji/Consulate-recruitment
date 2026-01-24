/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Brand */
        primary: "#1F3A5F",
        primaryLight: "#2F5D8A",
        accent: "#F59E0B",
        azure: "#007FFF",
        azureSoft: "#1E88E5",

        /* Backgrounds */
        bg: "#F8FAFC",
        section: "#F1F5F9",
        card: "#FFFFFF",

        /* Text */
        heading: "#0F172A",
        body: "#334155",
        muted: "#64748B",

        /* Footer */
        footer: "#0F172A",
        footerText: "#94A3B8",
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "Inter", "sans-serif"],
      },

      boxShadow: {
        soft: "0 10px 25px rgba(15, 23, 42, 0.08)",
        card: "0 6px 18px rgba(15, 23, 42, 0.06)",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
