import React, { useState, useEffect, useCallback, useMemo } from "react";
import authAxios from "./util/authAxios";

const AppContext = React.createContext(null);

export const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [filteredVideoList, setFilteredVideoList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFiltered, setIsFiltered] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await authAxios.get(`/api/tokens`);
          const user = response.data.user;
          if (user) {
            setCurrentUser(user);
            if (user.settings.darkMode) {
              toggleDarkMode();
            }
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          localStorage.removeItem("token");
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await authAxios.get("/api/videos", { timeout: 0 });
        setVideoList(res.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle("dark-mode", newDarkMode);
    if (currentUser) {
      authAxios
        .patch(`/api/users/${currentUser._id}`, {
          settings: { darkMode: newDarkMode },
        })
        .catch((error) => console.error("Error updating user settings:", error));
      currentUser.settings.darkMode = newDarkMode;
    }
  };

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
      const res = await authAxios.post("/api/videos/filter", { search, text });
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
