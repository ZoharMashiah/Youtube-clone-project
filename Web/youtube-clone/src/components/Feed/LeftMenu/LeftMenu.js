import React from "react";
import styles from "./LeftMenu.module.css";
import Menu from "../Menu/Menu";
import YouInfo from "../YouInfo/YouInfo";
import Subscribers from "../Subscribers/Subscribers";
import Explore from "../Explore/Explore";
import More from "../More/More";

export default function LeftMenu() {
  return (
    <div className={styles.LeftMenu}>
      <div className={styles.Scrollable}>
        <Menu />
        {/* <hr className={styles.hr}/>
        <YouInfo /> */}
        <hr className={styles.hr} />
        <Subscribers />
        {/* <hr className={styles.hr}/>
        <Explore /> */}
        <hr className={styles.hr} />
        <More />
      </div>
    </div>
  );
}
