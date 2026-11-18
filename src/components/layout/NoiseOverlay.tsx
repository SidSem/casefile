import React from 'react';
import { useGameStore } from '../../store/useGameStore';

export const NoiseOverlay: React.FC = () => {
  const { settings } = useGameStore();

  if (settings.reducedMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Film Grain Texture SVG */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Noir Vignette */}
      <div 
        className="absolute inset-0 bg-radial-gradient pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 65%, rgba(0, 0, 0, 0.45) 100%)'
        }}
      />
    </div>
  );
};
