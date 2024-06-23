import { BrowserRouter, Routes, Route, Outlet, useNavigate, Navigate } from "react-router-dom";
import Feed from "./pages/Feed/Feed";
import "./App.css";
import React, { useState } from "react";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import vid from "./data/videos.json";

function App() {
  const [users, setusers] = useState([]);
  const [currentUser, setcurrentUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [videos, setVideos] = useState(vid);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <Login users={users} setcurrentUser={setcurrentUser} darkMode={darkMode} setDarkMode={setDarkMode} />
          }
        />
        <Route
          path="/signup"
          element={<Signup users={users} setusers={setusers} darkMode={darkMode} setDarkMode={setDarkMode} />}
        />
        <Route
          path="/"
          element={
            <Feed
              currentUser={currentUser}
              setcurrentUser={setcurrentUser}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              videos={videos}
              setVideos={setVideos}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
