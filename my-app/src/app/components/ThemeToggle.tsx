// components/ThemeToggle.js
"use client";
import { useTheme } from "../ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="p-2">
      {isDarkMode ? "☼" : "☾"}
    </button>
  );
};

export default ThemeToggle;
