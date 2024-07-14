import React, { useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UpperButtons.module.css";
import { AppContext } from "../../../AppContext";
import DarkModeButton from "../../DarkModeButton/DarkModeButton";

const UploadVideo = ({ setTrigger }) => (
  <>
    <button className={styles.button} onClick={() => setTrigger(true)}>
      <i className="bi bi-camera-reels" id={styles.icon} />
    </button>
  </>
);

const UserButtons = ({ currentUser, setCurrentUser, darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const getToUserPage = () => {
    navigate(`/userpage/${currentUser._id}`);
  };

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem("token");
    if (darkMode) {
      toggleDarkMode();
    }

    navigate("/");
  }, [setCurrentUser, darkMode, toggleDarkMode, navigate]);

  return (
    <div className={styles.userWrapper}>
      {currentUser === null ? (
        <button onClick={() => navigate("/login")} className={styles.signBtn}>
          <i className="bi bi-person"></i>
          <span>Sign in</span>
        </button>
      ) : (
        <div>
          <img src={currentUser.photo} id={styles.profileImage} alt="User profile" onClick={() => getToUserPage()} />
          <button onClick={logout} className={styles.signBtn}>
            <i className="bi bi-person"></i>
            <span>Sign out</span>
          </button>
        </div>
      )}
    </div>
  );
};

const ButtonsWrapper = ({ setTrigger }) => {
  const { currentUser, setCurrentUser, darkMode, toggleDarkMode } = useContext(AppContext);

  return (
    <div className={styles.buttonsWrapper}>
      <DarkModeButton style={styles.darkModeButton} />
      {currentUser === null ? (
        ""
      ) : (
        <div>
          <UploadVideo setTrigger={setTrigger} />
        </div>
      )}
      <UserButtons
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </div>
  );
};
export default ButtonsWrapper;
