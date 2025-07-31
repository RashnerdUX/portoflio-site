import React from 'react';
import type { SocialLinkProps } from '~/types/components';

export const SocialLink: React.FC<SocialLinkProps> = ({ 
  href, 
  icon: Icon, 
  label, 
  color 
}) => {
  const colorClasses = {
    blue: {
      text: 'text-blue-400 group-hover:text-blue-300',
      gradient: 'from-blue-400/0 via-blue-400/10 to-blue-400/0',
      border: 'hover:border-blue-400/50'
    },
    green: {
      text: 'text-green-400 group-hover:text-green-300',
      gradient: 'from-green-400/0 via-green-400/10 to-green-400/0',
      border: 'hover:border-green-400/50'
    },
    purple: {
      text: 'text-purple-400 group-hover:text-purple-300',
      gradient: 'from-purple-400/0 via-purple-400/10 to-purple-400/0',
      border: 'hover:border-purple-400/50'
    },
    pink: {
      text: 'text-pink-400 group-hover:text-pink-300',
      gradient: 'from-pink-400/0 via-pink-400/10 to-pink-400/0',
      border: 'hover:border-pink-400/50'
    },
    red: {
      text: 'text-red-400 group-hover:text-red-300',
      gradient: 'from-red-400/0 via-red-400/10 to-red-400/0',
      border: 'hover:border-red-400/50'
    },
    black: {
      text: 'text-black-400 group-hover:text-black-300',
      gradient: 'from-black-400/0 via-black-400/10 to-black-400/0',
      border: 'hover:border-black-400/50'
    }
  };

  const currentColor = colorClasses[color];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex items-center gap-3 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 ${currentColor.border} transition-all duration-300 hover:scale-105 active:scale-95`}
    >
      <Icon className={`w-6 h-6 ${currentColor.text} transition-colors duration-300`} />
      <span className="text-white font-medium">{label}</span>
      <div className={`absolute inset-0 bg-gradient-to-r ${currentColor.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`} />
    </a>
  );
};