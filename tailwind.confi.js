const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // 배열의 가장 앞에 원하는 기본 폰트
        sans: ["var(--font-noto-sans-kr)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
        geist: ["var(--font-geist-sans)"],
      },
      keyframes: {
        cardRotate: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' }
        },
        'blue-glow': {
          '0%, 100%': { 
            opacity: '0.98',
            transform: 'scale(1) translate(-50%, -50%)'
          },
          '50%': { 
            opacity: '0.85',
            transform: 'scale(1.05) translate(-47%, -47%)'
          }
        },
        'blue-shadow': {
          '0%, 100%': { 
            opacity: '0.9',
            transform: 'scale(1) translateX(-50%)'
          },
          '50%': { 
            opacity: '0.75',
            transform: 'scale(1.02) translateX(-49%)'
          }
        },
        'spiral-glow': {
          '0%': { 
            transform: 'rotate(0deg) scale(1)',
            opacity: '0.9'
          },
          '50%': { 
            transform: 'rotate(180deg) scale(1.1)',
            opacity: '0.7'
          },
          '100%': { 
            transform: 'rotate(360deg) scale(1)',
            opacity: '0.9'
          }
        },
        'fireworks': {
          '0%': { 
            transform: 'scale(0.8) rotate(0deg)',
            opacity: '0.9'
          },
          '25%': { 
            transform: 'scale(1.1) rotate(90deg)',
            opacity: '0.7'
          },
          '50%': { 
            transform: 'scale(0.9) rotate(180deg)',
            opacity: '0.9'
          },
          '75%': { 
            transform: 'scale(1.2) rotate(270deg)',
            opacity: '0.6'
          },
          '100%': { 
            transform: 'scale(0.8) rotate(360deg)',
            opacity: '0.9'
          }
        }
      },
      animation: {
        'card-rotate': 'cardRotate 8s linear infinite',
        'blue-glow': 'blue-glow 3s ease-in-out infinite',
        'blue-shadow': 'blue-shadow 3s ease-in-out infinite',
        'spiral-glow': 'spiral-glow 4s linear infinite',
        'fireworks': 'fireworks 5s ease-in-out infinite'
      }
    },
  },
}