import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // On mount: detect theme preference
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (theme === "dark" || (!theme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }

    setMounted(true);
  }, []);

  // Toggle theme manually
  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setIsDarkMode(!isDarkMode);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    console.log("Theme changed to:", newTheme);
  };

  if (!mounted) {
    return (
      <div className="cursor-pointer rounded-lg border border-primary/20 bg-primary/20 p-2">
        <Moon className="text-gray-500 size-4" />
      </div>
    );
  }

  return (
    <div
      onClick={toggleTheme}
      className="cursor-pointer rounded-lg border border-primary/20 bg-primary/20 p-2"
    >
      {isDarkMode ? (
        <Sun className="text-yellow-500 size-4" />
      ) : (
        <Moon className="text-gray-500 size-4" />
      )}
    </div>
  );
};

export default ThemeToggle;
