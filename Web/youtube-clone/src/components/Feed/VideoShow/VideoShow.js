import React, { useState } from "react";
import styles from "./VideoShow.module.css";
import VideoMenu from "../../VideoMenu/VideoMenu";
import { useNavigate } from "react-router-dom";

export default function VideoShow({ currentVideo, setCurrentVideo }) {
  const navigate = useNavigate();

  const views = currentVideo.views;
  let viewers =
    views > 999 ? (views > 999999 ? (views / 1000000).toFixed(0) + "M" : (views / 1000).toFixed(0) + "K") : views;
  let time = ((Date.now() - new Date(currentVideo.publication_date).getTime()) / 60000).toFixed(0);
  let timeStr =
    time > 60
      ? time > 1140
        ? time > 43200
          ? time > 525600
            ? (time / 525600).toFixed(0) + " years ago"
            : (time / 43200).toFixed(0) + " months ago"
          : (time / 1140).toFixed(0) + " days ago"
        : (time / 60).toFixed(0) + " hours ago"
      : time + " minutes ago";

  const getToUserPage = () => {
    navigate(`/userpage/${currentVideo.user._id}`);
  };

  const goToVideoPage = () => {
    navigate(`/users/${currentVideo.user._id}/videos/${currentVideo._id}`);
  };

  return (
    <div className={styles.videoDetails}>
      <div className={styles.titleWrapper}>
        <p id={styles.title} onClick={goToVideoPage}>
          {currentVideo.title}
        </p>
        <div>
          <span id="user" onClick={() => getToUserPage()}>
            {currentVideo.user.username}
          </span>
          <br></br>
          <span id="views">
            {viewers} views · {timeStr}
          </span>
        </div>
      </div>
      <VideoMenu currentVideo={currentVideo} setCurrentVideo={setCurrentVideo} />
    </div>
  );
}
