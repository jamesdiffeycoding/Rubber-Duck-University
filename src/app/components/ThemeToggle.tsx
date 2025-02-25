"use client";
import { useTheme } from "../ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-xl hover:bg-sky-700 transition-all rounded-md"
      aria-label="Toggle Theme"
    >
      {isDarkMode ? "☼" : "☾"} {/* Sun and Moon icons for Dark/Light */}
    </button>
  );
};

export default ThemeToggle;
