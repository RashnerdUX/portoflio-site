import React from 'react';
import type { GlassMorphicCardProps } from '~/types/components.ts';

export const GlassMorphicCard: React.FC<GlassMorphicCardProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl ${className}`}>
      {children}
    </div>
  );
};