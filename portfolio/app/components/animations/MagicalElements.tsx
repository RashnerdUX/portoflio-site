import React from 'react';
import { Sparkles } from 'lucide-react';

export const MagicalElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating sparkles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        >
          <Sparkles className="w-4 h-4 text-purple-300 opacity-60" />
        </div>
      ))}
      
      {/* Floating orbs */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`orb-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${20 + Math.random() * 30}px`,
            height: `${20 + Math.random() * 30}px`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};