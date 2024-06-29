import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UpperButtons.module.css";

export default function UpperButtons({ context, setTrigger }) {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const signOut = () => {
    console.log("need to sign out");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <div className={styles.buttonsWrapper}>
      <button className={styles.darkModeButton} onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <button className={styles.button} onClick={() => setTrigger(true)}>
        <i className="bi bi-camera-reels" id={styles.icon} />
      </button>
      <button className={styles.button}>
        <i className="bi bi-bell" id={styles.icon2} />
      </button>
      {context == null ? (
        <button onClick={() => navigate("/login")} className={styles.loginBtn}>
          <div className={styles.insideBtn}>
            <i className="bi bi-person"></i>
            <p>Login</p>
          </div>
        </button>
      ) : (
        <div className={styles.signoutWrapper}>
          <div>
            <button onClick={() => signOut()} className={styles.loginBtn}>
              <div className={styles.insideBtn}>
                <i className="bi bi-person"></i>
                <p>Signout</p>
              </div>
            </button>
          </div>
          <img
            src={
              context.photo == null
                ? "utilites/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png"
                : context.photo
            }
            id={styles.profileImage}
            alt="User profile"
          />
        </div>
      )}
    </div>
  );
}
