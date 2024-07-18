import React, { useContext } from "react";
import { AppContext } from "../../AppContext";
import "./DarkModeButton.css";

export default function DarkModeButton() {
  const { darkMode, toggleDarkMode } = useContext(AppContext);

  return (
    <button className="darkModeButton" onClick={() => toggleDarkMode()}>
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
