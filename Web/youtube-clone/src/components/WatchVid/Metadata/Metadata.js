import React, { useState } from "react";
import styles from "./Metadata.module.css";
import { useNavigate } from "react-router-dom";
import Buttons from "../Buttons/Buttons";
import VideoMenu from "../../VideoMenu/VideoMenu";

export default function Metadata({ currentVideo, setCurrentVideo }) {
  const navigate = useNavigate();

  const getToUserPage = () => {
    navigate(`/userpage/${currentVideo.user._id}`);
  };

  return (
    <div className={styles.videoDetails}>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <span id="user" onClick={() => getToUserPage()}>
            {currentVideo.user.username}
          </span>
        </div>
        <Buttons currentVideo={currentVideo} />
      </div>
      <VideoMenu currentVideo={currentVideo} setCurrentVideo={setCurrentVideo} />
    </div>
  );
}
