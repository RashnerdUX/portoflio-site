import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { ProjectButtonProps } from '~/types/components';

export const ProjectButton: React.FC<ProjectButtonProps> = ({ 
  href, 
  children, 
  variant = "primary" 
}) => {
  const baseClasses = "group relative overflow-hidden px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-3";
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/25",
    secondary: "bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm"
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${variants[variant]}`}
    >
      <span className="relative z-10">{children}</span>
      <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      
      {/* Magical hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-pink-400/20 to-purple-400/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </a>
  );
};