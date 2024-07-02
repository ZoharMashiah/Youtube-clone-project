import React, {useState} from "react";

const AppContext = React.createContext(null);

export const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [videoList, setVideoList] = useState([]);

  const toggleDarkMode = async (indicator) => {
    const newDarkMode = !darkMode;
    if (indicator && currentUser != null) {
      const res = await fetch(`/api/users/${currentUser._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({settings: {darkMode: !darkMode}})
      })
    }
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", newDarkMode);
  };
  const setDark = (dark) => {
    setDarkMode(dark);
    document.body.classList.toggle("dark-mode", dark);
  };

  const value = {
    currentUser,
    setCurrentUser,
    darkMode,
    toggleDarkMode,
    videoList,
    setVideoList,
    setDark
  }

  return (<AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>)
}

export {AppContext};
