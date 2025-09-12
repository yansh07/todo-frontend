import React, { useState, useEffect, useRef } from "react";
import { Palette } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("cyber");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("planit-theme") || "cyber";
    setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme);
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("planit-theme", newTheme);
    setIsOpen(false); // auto-close after selecting
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const themes = [
    { id: "cyber", name: "Cyber", emoji: "🤖" },
    { id: "electric", name: "Electric", emoji: "⚡" },
    { id: "sunset", name: "Sunset", emoji: "🌅" },
    { id: "ocean", name: "Ocean", emoji: "🌊" },
    { id: "light-cyber", name: "Light", emoji: "☀️" },
    { id: "light-vibrant", name: "Vibrant", emoji: "🎨" },
  ];

  return (
    <div className="relative px-3" ref={dropdownRef}>
      {/* Accordion Header */}
      <button
        className="flex w-full items-center justify-between rounded-lg border px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition border-yellow-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Modes
        </span>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* Dropdown Content */}
      <div
        className={`absolute left-0 right-0 mt-2 rounded-lg border border-yellow-400  dark:bg-gray-900 shadow-lg overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-3 p-3">
          {themes.map((themeOption) => (
            <button
              key={themeOption.id}
              className={`theme-btn flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition hover:scale-105 ${
                theme === themeOption.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
              onClick={() => handleThemeChange(themeOption.id)}
              title={`Switch to ${themeOption.name} theme`}
            >
              <span>{themeOption.emoji}</span>
              {themeOption.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
