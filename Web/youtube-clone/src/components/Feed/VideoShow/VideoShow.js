import React, { useState, useContext } from "react";
import styles from "./VideoShow.module.css";
import EditVideo from "../../UserPage/EditVideo/EditVideo";
import VideoMenu from "../../VideoMenu/VideoMenu";
import { useNavigate } from "react-router-dom";

export default function VideoShow({ video }) {
  const [editButton, setEditButton] = useState(false);
  const [videoTitle, setTitle] = useState(video.title);
  const [videoDescription, setDescription] = useState(video.title);

  const navigate = useNavigate();

  const views = video.views;
  let viewers =
    views > 999 ? (views > 999999 ? (views / 1000000).toFixed(0) + "M" : (views / 1000).toFixed(0) + "K") : views;
  let time = ((Date.now() - new Date(video.publication_date).getTime()) / 60000).toFixed(0);
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
    navigate(`/userpage/${video.user._id}`);
  };

  return (
    <div className={styles.videoDetails}>
      {editButton && (
        <EditVideo setEditButton={setEditButton} videoTitle={videoTitle} videoDescription={videoDescription} />
      )}
      <div className={styles.titleWrapper}>
        <p id={styles.title}>{videoTitle}</p>
        <div>
          <span id={styles.user} onClick={() => getToUserPage()}>
            {video.user.username}
          </span>
          <br></br>
          <span id={styles.views}>
            {viewers} views · {timeStr}
          </span>
        </div>
      </div>
      <VideoMenu currentVideo={video} setTitle={setTitle} setDescription={setDescription} />
    </div>
  );
}
