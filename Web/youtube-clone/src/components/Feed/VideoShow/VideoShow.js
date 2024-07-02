import React from "react";
import { Image } from "react-bootstrap";
import styles from "./VideoShow.module.css";

export default function VideoShow({
  icon,
  user,
  title,
  description,
  publication_date,
  video,
  views,
  user_image,
  onClick,
}) {
  let viewers =
    views > 999 ? (views > 999999 ? (views / 1000000).toFixed(0) + "M" : (views / 1000).toFixed(0) + "K") : views;
  let time = ((Date.now() - publication_date) / 60000).toFixed(0);
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
    <div className={styles.videoCard}>
      <img src={icon} id={styles.videoImage} onClick={onClick} alt="Video thumbnail" />
      <div className={styles.metaData}>
        <Image src={user_image} width="40px" height="40px" roundedCircle />
        <div className={styles.titleWrapper}>
          <p id={styles.title} onClick={onClick}>
            {title}
          </p>
          <p id={styles.user}>{user}</p>
          <div>
            <p id={styles.views}>
              {viewers} views · {timeStr}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
