import React, { useContext } from "react";
import { AppContext } from "../../AppContext";

export default function DarkModeButton({ style }) {
  const { darkMode, toggleDarkMode } = useContext(AppContext);

  return (
    <button className={style} onClick={() => toggleDarkMode()}>
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
