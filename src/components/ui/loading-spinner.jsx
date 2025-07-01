"use client";

import React from 'react';
import { cn } from '@/lib/utils';

const sizeMap = {
  xs: { size: 16, strokeWidth: 3 },
  sm: { size: 20, strokeWidth: 3.5 },
  md: { size: 24, strokeWidth: 4 },
  lg: { size: 32, strokeWidth: 5 },
  xl: { size: 40, strokeWidth: 6 }
};

const LoadingSpinner = ({ 
  size = 'md', 
  color = '#3b82f6', 
  className,
  ...props 
}) => {
  const { size: svgSize, strokeWidth } = sizeMap[size] || sizeMap.md;
  const radius = (svgSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  return (
    <div className={cn('inline-block', className)} {...props}>
      <svg
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        className="animate-spin"
      >
        {/* 배경 원 (연한 회색) */}
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* 진행 원 (메인 색상) */}
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.75}
        />
      </svg>
    </div>
  );
};

export { LoadingSpinner }; 