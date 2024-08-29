// DarkModeToggle.js
import { useEffect, useState } from "react";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load saved theme from local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-3 sm:order-3 order-2 bg-gray-200 dark:border-white border-black border dark:text-white dark:bg-gray-500 rounded-md"
    >
      {isDarkMode ? <MdDarkMode /> : <MdLightMode />}
    </button>
  );
};

export default DarkModeToggle;
