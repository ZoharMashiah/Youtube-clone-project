import React, { useState, useContext } from "react";
import styles from "./VideoShow.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import EditVideo from "../../UserPage/EditVideo/EditVideo";
import Ellipsis from "../../Ellipsis/Ellipsis";
import { AppContext } from "../../../AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function VideoShow({ video }) {
  const [editButton, setEditButton] = useState(false);
  const { currentUser } = useContext(AppContext);
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

  // const editVideo = () => setEditButton(true);

  // const deleteVideo = async () => {
  //   try {
  //     console.log("Deleting video:", video._id);
  //     const address = `/api/users/${video.user._id}/videos/${video._id}`;
  //     const response = await axios.delete(address);
  //     if (response.status === 200) {
  //       console.log("Video deleted successfully");
  //       getToFeed();
  //     } else {
  //       console.warn("Unexpected response status:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting video:", error);
  //   }
  // };

  // const getToFeed = () => {
  //   navigate("/", { replace: true });
  // };

  const getToUserPage = () => {
    navigate(`/userpage/${video.user._id}`);
  };

  return (
    <div className={styles.videoDetails}>
      {editButton && (
        <EditVideo setEditButton={setEditButton} videoTitle={video.title} videoDescription={video.description} />
      )}
      <div className={styles.titleWrapper}>
        <p id={styles.title}>{video.title}</p>
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
      <Ellipsis video={video} />
    </div>
  );
}
