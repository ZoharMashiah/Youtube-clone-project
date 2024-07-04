import React, { useState } from "react";

const AppContext = React.createContext(null);

export const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const [fillteredVideoList, setFillteredVideoList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilltered, setIsFilltered] = useState(false)

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

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const filterVideos = async (search, text) => {
    console.log(text)
    const res = await fetch("/api/videos/filter", {
      method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          search, text
        })
    })
    console.log(res)
    setFillteredVideoList(await res.json())
    setIsFilltered(true)
  }

  const stopFillter = () => {
    setIsFilltered(false)
  }

  const value = {
    currentUser,
    setCurrentUser,
    darkMode,
    toggleDarkMode,
    videoList,
    setVideoList,
    selectedCategory,
    setSelectedCategory,
    readFileAsDataURL,
    filterVideos,
    setIsFilltered,
    stopFillter,
    isFilltered,
    fillteredVideoList,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext };
