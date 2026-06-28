/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          900: '#0B0F19', // Main background
          800: '#151C2C', // Cards background
          700: '#1E293B',
        },
        gold: {
          400: '#F1D570',
          500: '#D4AF37', // Primary accent
          600: '#B08D28',
        },
        cyan: {
          400: '#33EFFF',
          500: '#00E5FF', // AI/Tech accent
          600: '#00B8CC',
        }
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00E5FF, 0 0 10px #00E5FF' },
          '100%': { boxShadow: '0 0 20px #00E5FF, 0 0 30px #00E5FF' },
        }
      }
    },
  },
  plugins: [],
}
