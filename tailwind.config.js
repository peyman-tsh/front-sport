/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-vazirmatn)', 'Vazirmatn', 'Tahoma', 'sans-serif'],
      },
      colors: {
        brand: {
          yellow: '#F59E0B',      // Warm golden yellow
          'yellow-light': '#FEF3C7', // Soft pale yellow
          'yellow-hover': '#D97706',
          blue: '#0284C7',        // Crisp sky blue
          'blue-light': '#E0F2FE',  // Soft pale light blue
          'blue-pale': '#F0F9FF',   // Very light ice blue
          'blue-border': '#BAE6FD', // Soft border blue
        },
      },
      boxShadow: {
        'soft-yellow': '0 8px 24px -4px rgba(245, 158, 11, 0.25)',
        'soft-blue': '0 8px 24px -4px rgba(56, 189, 248, 0.25)',
        'card-light': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        'card-hover': '0 12px 30px -4px rgba(14, 165, 233, 0.12), 0 4px 10px -2px rgba(245, 158, 11, 0.08)',
      },
      backgroundImage: {
        'light-glow': 'radial-gradient(circle at 50% 0%, rgba(224, 242, 254, 0.8) 0%, rgba(254, 243, 199, 0.35) 45%, rgba(255, 255, 255, 0) 75%)',
        'soft-mesh': 'linear-gradient(135deg, #F0F9FF 0%, #FFFFFF 50%, #FFFBEB 100%)',
      }
    },
  },
  plugins: [],
};
