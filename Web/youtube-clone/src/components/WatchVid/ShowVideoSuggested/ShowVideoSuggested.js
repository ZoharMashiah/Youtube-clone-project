import React from "react";
import styles from "./ShowVideoSuggested.module.css";

export default function ShowVideoSuggested({ video, setCurrentVideo }) {
  let viewers =
    video.views > 999
      ? video.views > 999999
        ? (video.views / 1000000).toFixed(0) + "M"
        : (video.views / 1000).toFixed(0) + "K"
      : video.views;
  console.log(Date.now());
  let time = ((Date.now() - video.publication_date) / 60000).toFixed(0);
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

  return (
    <div className={styles.videoWrapper}>
      <img src={video.icon} className={styles.videoImage} onClick={() => setCurrentVideo(video.id)} />
      <div className={styles.textWrapper}>
        <p className={styles.title} onClick={() => setCurrentVideo(video.id)}>
          {video.title}
        </p>
        <p className={styles.user}>{video.user}</p>
        <p className={styles.views}>
          {viewers} views · {timeStr}
        </p>
      </div>
    </div>
  );
}
