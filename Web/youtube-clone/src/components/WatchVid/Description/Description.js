import React from "react";
import styles from "./Description.module.css";

export default function Description({ currentVideo }) {
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

  return (
    <div className={styles.descriptionWrapper}>
      <p className={styles.views}>
        {viewers} views · {timeStr}
      </p>

      <p className={styles.description}>{currentVideo.description}</p>
    </div>
  );
}
