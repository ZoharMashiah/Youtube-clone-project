import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UpperButtons.module.css";

const DarkModeButton = ({ darkMode, toggleDarkMode }) => (
  <button className={styles.darkModeButton} onClick={toggleDarkMode}>
    {darkMode ? "Light Mode" : "Dark Mode"}
  </button>
);

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

const UserProfile = ({ context, setContext }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.userWrapper}>
      <img
        src={
          context?.photo ||
          "utilites/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png"
        }
        id={styles.profileImage}
        alt="User profile"
      />
      {context == null ? (
        <button onClick={() => navigate("/login")} className={styles.loginBtn}>
          <div className={styles.insideBtn}>
            <i className="bi bi-person"></i>
            <p>Login</p>
          </div>
        </button>
      ) : (
        <button onClick={() => setContext(null)} className={styles.loginBtn}>
          <div className={styles.insideBtn}>
            <i className="bi bi-person"></i>
            <p>Signout</p>
          </div>
        </button>
      )}
    </div>
  );
};

const ButtonsWrapper = ({ context, setContext, darkMode, toggleDarkMode, setTrigger }) => {
  return (
    <div className={styles.buttonsWrapper}>
      <DarkModeButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {context === null ? (
        ""
      ) : (
        <div>
          <UploadVideo setTrigger={setTrigger} />
        </div>
      )}
      <UserProfile context={context} setContext={setContext} />
    </div>
  );
};
export default ButtonsWrapper;

// export default function UpperButtons({ context, setTrigger }) {
//   const [darkMode, setDarkMode] = useState(false);
//   const navigate = useNavigate();

//   const signOut = () => {
//     console.log("NEED TO SIGN OUT WITH CONTEXT");
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     document.body.classList.toggle("dark-mode", !darkMode);
//   };
//   return (
//     <div className={styles.buttonsWrapper}>
//       <DarkModeButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
//       {context === null ? (
//         <LoginButton navigate={navigate} />
//       ) : (
//         <>
//           <UserActions setTrigger={setTrigger} />
//           <UserProfile context={context} signOut={signOut} />
//         </>
//       )}
//     </div>
//   );
// }

// return (
//   <div className={styles.buttonsWrapper}>
//     <button className={styles.darkModeButton} onClick={toggleDarkMode}>
//       {darkMode ? "Light Mode" : "Dark Mode"}
//     </button>
//     <button className={styles.button} onClick={() => setTrigger(true)}>
//       <i className="bi bi-camera-reels" id={styles.icon} />
//     </button>
//     <button className={styles.button}>
//       <i className="bi bi-bell" id={styles.icon2} />
//     </button>
//     {context == null ? (
//       <button onClick={() => navigate("/login")} className={styles.loginBtn}>
//         <div className={styles.insideBtn}>
//           <i className="bi bi-person"></i>
//           <p>Login</p>
//         </div>
//       </button>
//     ) : (
//       <div className={styles.signoutWrapper}>
//         <div>
//           <button onClick={() => signOut()} className={styles.loginBtn}>
//             <div className={styles.insideBtn}>
//               <i className="bi bi-person"></i>
//               <p>Signout</p>
//             </div>
//           </button>
//         </div>
//         <img
//           src={
//             context.photo == null
//               ? "utilites/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png"
//               : context.photo
//           }
//           id={styles.profileImage}
//           alt="User profile"
//         />
//       </div>
//     )}
//   </div>
// );
