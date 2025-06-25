"use client";

import { POKEMON_RARITY_CONFIG } from "@/constants/pokemon";

export default function RarityIcon({ rarity, size = 30 }) {
  const config = POKEMON_RARITY_CONFIG[rarity];

  if (!config) return null;

  return (
    <div className="inline-flex items-center gap-1">
      {Array.from({ length: config.count }, (_, index) => (
        <img 
          key={`rarity-icon-${rarity}-${index}`}
          src={config.src} 
          alt={`${rarity} icon`}
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      ))}
    </div>
  );
}