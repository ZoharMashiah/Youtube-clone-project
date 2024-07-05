import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

const AppContext = React.createContext(null);

export const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [videoList, setVideoList] = useState([]);
  const [filteredVideoList, setFilteredVideoList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("/api/videos", { timeout: 0 });
        setVideoList(res.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (currentUser) {
        axios
          .patch(`/api/users/${currentUser._id}`, {
            settings: { darkMode: newMode },
          })
          .catch((error) => console.error("Error updating user settings:", error));
      }
      return newMode;
    });
  }, [currentUser]);

  const readFileAsDataURL = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }, []);

  const filterVideos = useCallback(async (search, text) => {
    try {
      const res = await axios.post("/api/videos/filter", { search, text });
      setFilteredVideoList(res.data);
      setIsFiltered(true);
    } catch (error) {
      console.error("Error filtering videos:", error);
    }
  }, []);

  const stopFilter = useCallback(() => {
    setIsFiltered(false);
    setFilteredVideoList([]);
  }, []);

  const value = useMemo(
    () => ({
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
      stopFilter,
      isFiltered,
      filteredVideoList,
    }),
    [
      currentUser,
      darkMode,
      videoList,
      selectedCategory,
      toggleDarkMode,
      readFileAsDataURL,
      filterVideos,
      stopFilter,
      isFiltered,
      filteredVideoList,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext };
