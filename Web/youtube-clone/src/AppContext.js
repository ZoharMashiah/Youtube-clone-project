import React, { useState } from "react";

const AppContext = React.createContext(null);

export const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle("dark-mode", newDarkMode);

    if (currentUser) {
      fetch(`/api/users/${currentUser._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: { darkMode: newDarkMode } }),
      }).catch((error) => console.error("Error updating user settings:", error));
      currentUser.settings.darkMode = newDarkMode;
    }

    console.log("darkMode: ", newDarkMode, "user setting: ", currentUser?.settings.darkMode);
  };

  const value = {
    currentUser,
    setCurrentUser,
    darkMode,
    toggleDarkMode,
    videoList,
    setVideoList,
    selectedCategory,
    setSelectedCategory,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext };
