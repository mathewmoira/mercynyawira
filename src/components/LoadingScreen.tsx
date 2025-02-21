import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center animate-fade-in backdrop-blur-sm">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/20 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
      </div>

      {/* Grid background with mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>

      {/* Loading animation container */}
      <div className="relative flex flex-col items-center scale-75 md:scale-100">
        {/* Outer rotating ring */}
        <div className="w-24 h-24 rounded-full border-b-2 border-gold/20 animate-[spin_2s_linear_infinite]"></div>
        
        {/* Middle rotating ring */}
        <div className="absolute top-0 w-24 h-24 rounded-full border-r-2 border-t-2 border-gold/40 animate-[spin_1.5s_linear_infinite]"></div>
        
        {/* Inner rotating ring */}
        <div className="absolute top-0 w-24 h-24 rounded-full border-t-2 border-l-2 border-gold animate-[spin_1s_linear_infinite]"></div>
        
        {/* Center pulsing dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-gold rounded-full animate-pulse"></div>
        </div>

        {/* Loading text */}
        <div className="mt-8 text-gold text-lg font-medium tracking-[0.2em] animate-pulse">
          LOADING
        </div>
      </div>
    </div>
  );
} 