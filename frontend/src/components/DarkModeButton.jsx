import { useState, useEffect } from "react";
import "./DarkModeButton.css";

const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      document.body.classList.add("dark-theme");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <div className="toggle">
      <input
        type="checkbox"
        id="dark-mode-toggle"
        className="toggle-checkbox"
        onClick={toggleTheme}
      />
      <label htmlFor="dark-mode-toggle" className="toggle-label"></label>
    </div>
  );
};

export default DarkModeButton;
