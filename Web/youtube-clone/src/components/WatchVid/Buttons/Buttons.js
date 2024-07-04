import React, { useState, useContext } from "react";
import axios from "axios";
import styles from "./Buttons.module.css";
import { AppContext } from "../../../AppContext";

export default function Buttons({ currentVideo }) {
  const { currentUser } = useContext(AppContext);

  const handleAction = async (action) => {
    console.log("hi");
  };

  const isLiked = false;
  const isDisliked = false;

  if (!currentVideo) {
    return null; // a loading indicator
  }

  return (
    <div className={styles.buttonsWrapper}>
      <div className={styles.likedDislikedWrapper}>
        <button className={styles.likedBtn} onClick={() => handleAction("like")}>
          <p className={styles.num}>{currentVideo.like || 0}</p>
          <i className={`${styles.liked} ${isLiked ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"}`}></i>
        </button>
        <button className={styles.dislikedBtn} onClick={() => handleAction("dislike")}>
          <i className={`${styles.liked} ${isDisliked ? "bi bi-hand-thumbs-down-fill" : "bi bi-hand-thumbs-down"}`}></i>
          <p className={styles.num}>{currentVideo.dislike || 0}</p>
        </button>
      </div>
    </div>
  );
}
