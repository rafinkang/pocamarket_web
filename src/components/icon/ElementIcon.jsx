"use client";

import { POKEMON_ELEMENT_CONFIG } from "@/constants/pokemon";

export default function ElementIcon({ element, loop = null, size = 30, className = "" }) {
  const config = POKEMON_ELEMENT_CONFIG[element];

  if (!config) return null;

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      {Array.from({ length: loop ? loop : config.count }, (_, index) => (
        <img 
          key={`element-icon-${element}-${index}`}
          src={config.src} 
          alt={`${element} icon`}
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      ))}
    </div>
  );
}