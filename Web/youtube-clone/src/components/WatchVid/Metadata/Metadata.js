import React, { useState } from "react";
import styles from "./Metadata.module.css";
import { useNavigate } from "react-router-dom";
import Buttons from "../Buttons/Buttons";
import Ellipsis from "../../Ellipsis/Ellipsis";

export default function Metadata({ currentVideo }) {
  const navigate = useNavigate();

  const getToUserPage = () => {
    navigate(`/userpage/${currentVideo.user._id}`);
  };

  return (
    <div className={styles.videoDetails}>
      <div className={styles.titleWrapper}>
        <p id={styles.title}>{currentVideo.title}</p>
        <span id={styles.user} onClick={() => getToUserPage()}>
          {currentVideo.user.username}
        </span>
        <Buttons currentVideo={currentVideo} />
      </div>
      <Ellipsis video={currentVideo} />
    </div>
  );
}
