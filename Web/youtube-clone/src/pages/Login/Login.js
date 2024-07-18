import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import authAxios from "../../util/authAxios";
import "./Login.css";
import Logo from "../../components/Feed/Logo/Logo";
import { AppContext } from "../../AppContext";
import Userfield from "../../components/Login/Userfield/Userfield";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../darkMode.css";
import DarkModeButton from "../../components/DarkModeButton/DarkModeButton";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { darkMode, currentUser, setCurrentUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await authAxios.post("/api/tokens", { username, password });
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      return user;
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      alert("Wrong username or password");
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      console.log("Logged in as: ", currentUser.username);
      navigate("/");
    }
  }, [currentUser, isLoading, navigate]);

  return (
    <div>
      <div className="darkModebtnLogin">
        <DarkModeButton />
      </div>
      <div className="login-container">
        <div className="login-wrapper">
          <Logo />
          <p className="login-title">Login</p>
          <div className="login-form-wrapper">
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
      </div>
    </div>
  );
}
