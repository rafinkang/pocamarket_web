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
    },
  },
}