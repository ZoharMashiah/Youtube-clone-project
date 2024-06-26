import React, { useState } from "react";
import styles from "./UpperButtons.module.css";

export default function UpperButtons({ settrigger, currentUser, setcurrentUser, setgotologin }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };
  return (
    <div className={styles.buttonsWrapper}>
      <button className={styles.darkModeButton} onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <button className={styles.button}>
        <i class="bi bi-camera-reels" id={styles.icon} onClick={() => settrigger(true)} />
      </button>
      <button className={styles.button}>
        <i class="bi bi-bell" id={styles.icon2} />
      </button>
      {currentUser == null ? (
        <button onClick={() => setgotologin(true)} className={styles.loginBtn}>
          <div className={styles.insideBtn}>
            <i class="bi bi-person"></i>
            <p>Login</p>
          </div>
        </button>
      ) : (
        <div className={styles.signoutWrapper}>
          <div>
            <button onClick={() => setcurrentUser(null)} className={styles.loginBtn}>
              <div className={styles.insideBtn}>
                <i class="bi bi-person"></i>
                <p>Signout</p>
              </div>
            </button>
          </div>
          <img
            src={
              currentUser.photo == null
                ? "utilites/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png"
                : currentUser.photo
            }
            id={styles.profileImage}
          />
        </div>
      )}
    </div>
  );
}
