import React from 'react'
import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Themetoggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

//   Check local storage for theme preference on component mount
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <div onClick={toggleTheme} className="cursor-pointer fixed bottom-5 right-5 z-50 rounded-full border border-slate-300 bg-white p-3 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
      {isDarkMode ? <Sun className='text-yellow-500 size-6'/> : <Moon className='text-gray-500 size-6'/>}
    </div>
  )
}
