import React from "react";
import Search from "../Search/Search";
import UpperButtons from "../UpperButtons/UpperButtons";
import Logo from "../Logo/Logo";
import styles from "./UpBar.module.css";

export default function UpBar({ setSearchText, setTrigger }) {
  return (
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
  );
}
