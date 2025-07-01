"use client";

import React from 'react';
import { cn } from '@/lib/utils';

const sizeMap = {
  xs: { dotSize: 2, gap: 1 },
  sm: { dotSize: 3, gap: 1.5 },
  md: { dotSize: 4, gap: 2 },
  lg: { dotSize: 5, gap: 2.5 },
  xl: { dotSize: 6, gap: 3 }
};

const LoadingDots = ({ 
  size = 'md', 
  color = '#3b82f6', 
  className,
  ...props 
}) => {
  const { dotSize, gap } = sizeMap[size] || sizeMap.md;

  return (
    <div className={cn('flex items-center justify-center', className)} {...props}>
      <div className="flex items-center" style={{ gap: `${gap * 4}px` }}>
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="rounded-full animate-bounce"
            style={{
              width: `${dotSize * 4}px`,
              height: `${dotSize * 4}px`,
              backgroundColor: color,
              animationDelay: `${index * 0.1}s`,
              animationDuration: '0.6s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export { LoadingDots }; 