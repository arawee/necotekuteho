import React from 'react';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

export const CustomPlusIcon = ({ className, style, color = '#161616' }: IconProps) => (
  <svg 
    width="10" 
    height="10" 
    viewBox="0 0 10 10" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path 
      d="M3.58031 9.51937V5.91937H0.000312582V3.59937H3.58031V-0.000625372H6.06031V3.59937H9.64031V5.91937H6.06031V9.51937H3.58031Z" 
      fill={color}
    />
  </svg>
);

export const CustomArrowIcon = ({ className, style, color = '#00A51B' }: IconProps) => (
  <svg 
    width="12" 
    height="12" 
    viewBox="0 0 12 12" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path 
      d="M4.16156 11.5628L7.22156 7.66281C7.54156 7.23615 7.88156 6.97615 8.24156 6.88281H0.00156253V4.68281H8.16156C8.02823 4.64281 7.86823 4.55615 7.68156 4.42281C7.50823 4.28948 7.3549 4.13615 7.22156 3.96281L4.14156 0.00281215H6.90156L11.4016 5.76281L6.88156 11.5628H4.16156Z" 
      fill={color}
    />
  </svg>
);
