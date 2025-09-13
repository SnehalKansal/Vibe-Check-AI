import React from 'react';

const LogoSymbol = ({ className = "w-16 h-16", ...props }) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6' }} /> {/* Blue */}
        <stop offset="100%" style={{ stopColor: '#2dd4bf' }} /> {/* Turquoise */}
      </linearGradient>
    </defs>

    {/* The path for the curved arrow */}
    <path
      fill="none" // No fill for this shape, it's just a stroke
      stroke="url(#logoGradient)"
      strokeWidth="10" // Adjust stroke width to match the thickness in the image
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M 25 50 A 25 25 0 1 1 75 50 L 60 35 M 75 50 L 90 35" // Simplified path for a curved arrow
    />
  </svg>
);

export default LogoSymbol;