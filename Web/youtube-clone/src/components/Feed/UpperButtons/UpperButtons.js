import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UpperButtons.module.css";
import { AppContext } from "../../../AppContext";
import DarkModeButton from "../../DarkModeButton/DarkModeButton";

// const DarkModeButton = ({ darkMode, toggleDarkMode }) => (
//   <button className={styles.darkModeButton} onClick={() => toggleDarkMode(true)}>
//     {darkMode ? "Light Mode" : "Dark Mode"}
//   </button>
// );

const UploadVideo = ({ setTrigger }) => (
  <>
    <button className={styles.button} onClick={() => setTrigger(true)}>
      <i className="bi bi-camera-reels" id={styles.icon} />
    </button>
    <button className={styles.button}>
      <i className="bi bi-bell" id={styles.icon} />
    </button>
  </>
);

const UserButtons = ({ currentUser, setCurrentUser, darkMode ,toggleDarkMode }) => {
  const navigate = useNavigate();
  const getToUserPage = () => {
    navigate(`/userpage/${currentUser._id}`, {replace: true});
  }

  return (
    <div className={styles.userWrapper}>
        <img
        src={
          currentUser?.photo ||
          "utilites/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png"
        }
        id={styles.profileImage}
        alt="User profile"
        onClick={currentUser?() => getToUserPage(): () =>{}}
      />
      {currentUser === null ? (
        <button onClick={() => navigate("/login")} className={styles.signBtn}>
          <i className="bi bi-person"></i>
          <span>Sign in</span>
        </button>
      ) : (
        <button
          onClick={() => {
            navigate("/");
            setCurrentUser(null);
            localStorage.removeItem("token");
            if (darkMode)
              toggleDarkMode(false)
          }}
          className={styles.signBtn}
        >
          <i className="bi bi-person"></i>
          <span>Sign out</span>
        </button>
      )}
    </div>
  );
};

const ButtonsWrapper = ({ setTrigger }) => {
  const { currentUser, setCurrentUser, darkMode, toggleDarkMode, setDarkMode } = useContext(AppContext);
  console.log("darkmode: ",darkMode, currentUser?.settings.darkMode)

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
      <UserButtons currentUser={currentUser} setCurrentUser={setCurrentUser} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};
export default ButtonsWrapper;
