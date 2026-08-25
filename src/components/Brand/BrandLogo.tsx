import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = ''
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl'
  };

  const subtitleSizes = {
    sm: 'text-[8px]',
    md: 'text-[9px]',
    lg: 'text-[10px]'
  };

  return (
    <div className={`flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      {/* Aesthetic Geometric Monogram Emblem */}
      <div className={`relative ${iconDimensions[size]} shrink-0 flex items-center justify-center`}>
        {/* Ambient Glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#F7C600]/30 to-[#FFE169]/10 blur-sm group-hover:blur-md transition-all duration-300" />
        
        {/* Outer Beveled Hex-Diamond Shield */}
        <div className="relative w-full h-full rounded-xl bg-gradient-to-b from-[#1F1F1F] via-[#121212] to-[#0A0A0A] border border-[#F7C600]/80 shadow-[0_4px_16px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-[#F7C600] group-hover:scale-105">
          
          {/* Subtle Dynamic Geometric Grid lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#F7C60015_1px,transparent_1px)] [background-size:6px_6px] pointer-events-none" />
          
          {/* Top Gold Horizon Glint */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#F7C600] to-transparent opacity-90" />
          
          {/* High-Precision SVG Monogram (Intertwined M & A with Golden Angle Cuts) */}
          <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            <defs>
              <linearGradient id="logoGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF176" />
                <stop offset="45%" stopColor="#F7C600" />
                <stop offset="100%" stopColor="#D4A000" />
              </linearGradient>
              <linearGradient id="logoSteelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>
              <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="0.8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Aesthetic 'M' Geometric Chevron Wings */}
            <path
              d="M6 26V10L14 19L18 14L22 19L30 10V26"
              stroke="url(#logoSteelGrad)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />

            {/* Aesthetic 'A' Golden Apex Triangle with Crossbar */}
            <path
              d="M11 26L18 8L25 26"
              stroke="url(#logoGoldGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#goldGlow)"
            />
            {/* Bold Gold Crossbar with central diamond */}
            <path
              d="M13.5 20.5H22.5"
              stroke="url(#logoGoldGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            
            {/* Crown Apex Sparkle Dot */}
            <circle cx="18" cy="8" r="1.5" fill="#FFFFFF" className="animate-pulse" />
          </svg>

          {/* Bottom Gold Accent Notch */}
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-gradient-to-br from-transparent via-[#F7C600]/40 to-[#F7C600]" />
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-condensed font-black text-white tracking-wider uppercase transition-colors group-hover:text-neutral-100 ${titleSizes[size]}`}>
            MA CONSIDER
          </span>
          <span className={`font-condensed font-black text-[#F7C600] tracking-wider uppercase drop-shadow-[0_0_12px_rgba(247,198,0,0.3)] ${titleSizes[size]}`}>
            BRANDS
          </span>
        </div>

        {showTagline && (
          <div className={`flex items-center gap-1.5 font-bold uppercase tracking-[0.22em] text-neutral-400 mt-1 leading-none ${subtitleSizes[size]}`}>
            <span className="text-[#F7C600] font-extrabold">PRO TOOLS</span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-300">USA DISTRIBUTOR</span>
          </div>
        )}
      </div>
    </div>
  );
};
