import React from "react";
import styles from "./LeftMenu.module.css";
import Subscribers from "../Subscribers/Subscribers";
import ButtonField from "../ButtonField/ButtonField";
import YouInfo from "../YouInfo/YouInfo";
import Explore from "../Explore/Explore";

export default function LeftMenu() {
  return (
    <div className={styles.LeftMenu}>
      <ButtonField text="Home" icon="bi bi-house-door" />
      <ButtonField text="Subscriptions" icon="bi bi-card-heading" />
      {/* <Menu /> */}
      {/* <hr className={styles.hr}/>
        <YouInfo /> */}
      <hr className={styles.hr} />
      <Subscribers />
      {/* <hr className={styles.hr}/>
        <Explore /> */}
      <hr className={styles.hr} />
      <ButtonField text="Settings" icon="bi bi-gear" />
    </div>
  );
}
