import React from "react";
import Search from "../Search/Search";
import UpperButtons from "../UpperButtons/UpperButtons";
import LogoMenu from "../LogoMenu/LogoMenu";
import styles from "./UpBar.module.css";

export default function UpBar({ context, setSearchText, setTrigger }) {
  return (
    <div className={styles.wrapper}>
      <LogoMenu />
      <div className={styles.searchWrraper}>
        <Search setSearchText={setSearchText} />
      </div>
      <div className={styles.upperButtonsWrraper}>
        <UpperButtons context={context} setTrigger={setTrigger} />
      </div>
    </div>
  );
}
