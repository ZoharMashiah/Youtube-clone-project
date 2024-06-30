import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Feed from "./pages/Feed/Feed";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import VideoDisplay from "./components/WatchVid/VideoDisplay/VideoDisplay";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [context, setContext] = useState(/* initial context */);
  const [users, setUsers] = useState(/* initial users */);

  // useEffect(() => {
  //   createFakeUser();
  // }, []);
  // const createFakeUser = () => {
  //   const fakeUser = {
  //     id: 89,
  //     username: "admin",
  //     password: "admin",
  //     firstName: "Test",
  //     middleName: "",
  //     lastName: "User",
  //     birthDate: "1990-01-01",
  //     photo: "",
  //   };

  //   setUsers((prevUsers) => {
  //     if (!prevUsers.some((user) => user.username === fakeUser.username)) {
  //       return [...prevUsers, fakeUser];
  //     }
  //     return prevUsers;
  //   });
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout context={context} />}>
          <Route path="/" element={<Feed context={context} setContext={setContext} />} />
          <Route
            path="/users/:userId/videos/:videoId"
            element={<VideoDisplay context={context} setContext={setContext} />}
          />
        </Route>
        <Route
          path="/login"
          element={<Login users={users} setContext={setContext} darkMode={darkMode} setDarkMode={setDarkMode} />}
        />
        <Route
          path="/signup"
          element={<Signup users={users} setUsers={setUsers} darkMode={darkMode} setDarkMode={setDarkMode} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
