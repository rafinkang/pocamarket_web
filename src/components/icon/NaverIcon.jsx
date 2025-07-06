const THEME = {
  dark: {
    bg: "#3A3A3A",
    n: "#03C75A",
  },
  green: {
    bg: "#03C75A",
    n: "#FFFFFF",
  },
  white: {
    bg: "#FFFFFF",
    n: "#03C75A",
    border: "#E5E7EB", // gray-200
  },
};

export default function NaverIcon({ theme = "white", size = 40 }) {
  const { bg, n } = THEME[theme] || THEME.white;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="200" height="200" fill={bg} />
      <path
        d="M 70 55 H 100 L 130 105 V 55 H 160 V 145 H 130 L 100 95 V 145 H 70 V 55 Z"
        fill={n}
      />
    </svg>
  );
}