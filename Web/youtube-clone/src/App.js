import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed/Feed";
import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import vid from "./data/videos.json";

function App() {
  const [users, setusers] = useState([]);
  const [context, setContext] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [videos, setVideos] = useState(vid);

  useEffect(() => {
    createFakeUser();
  }, []);
  const createFakeUser = () => {
    const fakeUser = {
      id: 89,
      username: "admin",
      password: "admin",
      firstName: "Test",
      middleName: "",
      lastName: "User",
      birthDate: "1990-01-01",
      photo: "",
    };
    setusers((prevUsers) => {
      if (!prevUsers.some((user) => user.username === fakeUser.username)) {
        return [...prevUsers, fakeUser];
      }
      return prevUsers;
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Feed context={context} setContext={setContext} darkMode={darkMode} setDarkMode={setDarkMode} />}
        />
        <Route
          path="/login"
          element={<Login users={users} setContext={setContext} darkMode={darkMode} setDarkMode={setDarkMode} />}
        />
        <Route
          path="/signup"
          element={<Signup users={users} setusers={setusers} darkMode={darkMode} setDarkMode={setDarkMode} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
