import React from 'react';
import { Zap } from 'lucide-react';

export const MagicalCookingAnimation: React.FC = () => {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Cauldron base */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-20 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full border-4 border-gray-600" />
      
      {/* Cauldron body */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-28 h-16 bg-gradient-to-b from-gray-600 to-gray-800 rounded-t-3xl border-4 border-gray-500" />
      
      {/* Magical brew inside */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
      
      {/* Magical steam/sparkles rising */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-ping"
          style={{
            left: `${45 + Math.random() * 10}%`,
            bottom: `${40 + i * 8}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: '2s'
          }}
        >
          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-70" />
        </div>
      ))}
      
      {/* Magic wand */}
      <div className="absolute top-4 right-8 transform rotate-45">
        <div className="w-1 h-16 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full" />
        <div className="absolute -top-2 -left-1 w-3 h-3">
          <Zap className="w-3 h-3 text-yellow-400 animate-pulse" />
        </div>
      </div>
      
      {/* Floating ingredients */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`ingredient-${i}`}
          className="absolute w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-bounce opacity-70"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + Math.sin(i) * 20}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: '3s'
          }}
        />
      ))}
    </div>
  );
};