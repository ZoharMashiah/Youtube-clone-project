import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Logo from "../../components/Feed/Logo/Logo";
import { AppContext } from "../../AppContext";
import Userfield from "../../components/Login/Userfield/Userfield";
import "bootstrap-icons/font/bootstrap-icons.css";
import DarkModeButton from "../../components/DarkModeButton/DarkModeButton";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { darkMode, toggleDarkMode, currentUser, setCurrentUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("api/tokens", { username, password });
      if (response.status === 200) {
        const { user, token } = response.data;
        localStorage.setItem("token", token);
        console.log("Logged in as: ", user);
        return user;
      } else {
        alert("Login failed: could not get user");
        console.log("Login failed: could not get user");
        return false;
      }
    } catch (error) {
      alert("Login failed", error.message);
      return false;
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let user = await handleLogin();
      if (user) {
        setCurrentUser(user);
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser && !isLoading) {
      console.log("Logged in as: ", currentUser);
      navigate("/");
    }
  }, [currentUser, isLoading, navigate]);

  return (
    <div className={`login-page ${darkMode ? "dark-mode" : ""}`}>
      <DarkModeButton style={"dark-mode-toggle"} />
      <Logo />
      <p className="login-title">Login</p>
      <div className="login-wrapper">
        <div className="input-group">
          <i className="bi bi-person-circle"></i>
          <Userfield label="Username" settext={setUsername} />
        </div>
        <div className="input-group">
          <i className="bi bi-lock"></i>
          <Userfield label="Password" settext={setPassword} />
        </div>
        <div className="login-footer">
          <p>Don't have an account?</p>
          <button id="register-button" onClick={() => navigate("/signup")}>
            <p>Register</p>
          </button>
        </div>
        <button className="confirm-button" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Logging in..." : "Confirm"}
        </button>
      </div>
    </div>
  );
}

// const checkAuth = async () => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     try {
//       const response = await axios.get("api/verify-token", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.data.user) {
//         setCurrentUser(response.data.user);
//       }
//     } catch (error) {
//       console.error("Token verification failed:", error);
//       localStorage.removeItem("token");
//       setCurrentUser(null);
//     }
//   }
// };

// // Check auth status on component mount
// useEffect(() => {
//   checkAuth();
// }, []);
