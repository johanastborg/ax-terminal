import React from 'react';

type CRTContainerProps = {
  children: React.ReactNode;
  coherence: number;
};

export const CRTContainer: React.FC<CRTContainerProps> = ({ children, coherence }) => {
  // Calculate distortion based on coherence. Lower coherence = high distortion.
  // coherence is 0-100.
  const distortion = Math.max(0, 100 - coherence);

  // Style for dynamic distortion (e.g. hue-rotate, skew)
  const dynamicStyle: React.CSSProperties = {
    filter: `hue-rotate(${distortion * 1.2}deg) sepia(${distortion * 0.01})`,
    transform: `scale(${1 + distortion * 0.0005}) skew(${distortion * 0.05}deg)`,
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)] font-mono select-none">
      {/* CRT Overlay Effects */}
      <div className="crt-overlay pointer-events-none" />
      <div className="crt-scanline pointer-events-none" />

      {/* Content */}
      <div
        className="relative z-10 w-full h-full p-4 md:p-8 transition-all duration-100 ease-linear"
        style={dynamicStyle}
      >
        <div className="crt-flicker h-full w-full flex flex-col">
            {children}
        </div>
      </div>

      {/* Screen Vignette/Frame */}
      <div className="pointer-events-none absolute inset-0 z-50 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />
    </div>
  );
};
