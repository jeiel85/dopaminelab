/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vicky: {
          pink: '#FF5E97',
          lightpink: '#FFDFEC',
          yellow: '#FFDF00',
          lime: '#CCFF00',
          cyan: '#00F0FF',
          purple: '#A855F7',
          dark: '#121214',
          card: '#1E1E24',
        }
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'brutal': '4px 4px 0px #000000',
        'brutal-lg': '6px 6px 0px #000000',
        'brutal-pink': '5px 5px 0px #FF5E97',
        'brutal-yellow': '5px 5px 0px #FFDF00',
        'brutal-cyan': '5px 5px 0px #00F0FF',
        'brutal-lime': '5px 5px 0px #CCFF00',
        'glow-pink': '0 0 20px rgba(255, 94, 151, 0.6)',
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.6)',
      },
      animation: {
        'bounce-slow': 'bounce 2.5s infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 0.3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
