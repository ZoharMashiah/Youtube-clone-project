import React, { useContext } from "react";
import Search from "../Search/Search";
import UpperButtons from "../UpperButtons/UpperButtons";
import Logo from "../Logo/Logo";
import styles from "./UpBar.module.css";
import AppContext from "../../../AppContext";

export default function UpBar({ setSearchText, setTrigger }) {
  const { darkMode } = useContext(AppContext);

  return (
    <div className={` ${darkMode ? "dark-mode" : ""}`}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.searchWrapper}>
          <Search setSearchText={setSearchText} />
        </div>
        <div className={styles.upperButtonsWrapper}>
          <UpperButtons setTrigger={setTrigger} />
        </div>
      </div>
    </div>
  );
}
