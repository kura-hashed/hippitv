/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bubble: {
          50: '#fdfbf7',
          100: '#f7f4ea',
          200: '#eee6cf',
          300: '#e3d2ab',
          400: '#d7bb81',
          500: '#cfa65c',
        },
        toddler: {
          blue: '#4A90E2',
          softblue: '#E8F3FF',
          green: '#2EC4B6',
          softgreen: '#E7F9F7',
          orange: '#FF9F1C',
          softorange: '#FFF3E2',
          pink: '#FF6B8B',
          softpink: '#FFEBF0',
          yellow: '#FFD166',
          softyellow: '#FFF9E6',
          purple: '#845EC2',
          softpurple: '#F3ECFC',
        }
      },
      fontFamily: {
        sans: ['"Quicksand"', '"Nunito"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 20px -2px rgba(50, 50, 93, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'hover': '0 12px 32px -4px rgba(74, 144, 226, 0.18)',
      }
    },
  },
  plugins: [],
}
