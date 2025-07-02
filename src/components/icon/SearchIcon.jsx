export default function SearchIcon({ 
  size = 24, 
  color = "currentColor", 
  className = "",
  strokeWidth = 3.5
}) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle 
        cx="10" 
        cy="10" 
        r="7" 
        stroke={color} 
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path 
        d="m16 16 6 6" 
        stroke={color} 
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
} 