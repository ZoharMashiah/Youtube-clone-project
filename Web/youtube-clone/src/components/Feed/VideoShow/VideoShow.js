import React, { useState, useContext } from "react";
import { Image } from "react-bootstrap";
import styles from "./VideoShow.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import EditVideo from "../../UserPage/EditVideo/EditVideo";
import { AppContext } from "../../../AppContext";

export default function VideoShow({ icon, title, description, publication_date, views, user, onClick }) {
  const [editButton, setEditButton] = useState(false);
  const { currentUser } = useContext(AppContext);
  let viewers =
    views > 999 ? (views > 999999 ? (views / 1000000).toFixed(0) + "M" : (views / 1000).toFixed(0) + "K") : views;
  let time = ((Date.now() - new Date(publication_date).getTime()) / 60000).toFixed(0);
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

  const editVideo = () => setEditButton(true);

  const deleteVideo = () => {};

  return (
    <div className={styles.videoCard}>
      {editButton && <EditVideo setEditButton={setEditButton} videoTitle={title} videoDescription={description} />}
      <img src={icon} id={styles.videoImage} onClick={onClick} alt="Video thumbnail" />
      <div className={styles.videoDetails}>
        <div className={styles.metaData}>
          <Image src={user.photo} width="40px" height="40px" roundedCircle />
          <div className={styles.titleWrapper}>
            <p id={styles.title} onClick={onClick}>
              {title}
            </p>
            <div>
              <span id={styles.user}>{user.username}</span>
              <br></br>
              <span id={styles.views}>
                {viewers} views · {timeStr}
              </span>
            </div>
          </div>
        </div>
        {currentUser && currentUser._id == user._id && (
          <Dropdown className={styles.ellipsis}>
            <Dropdown.Toggle variant="white" id="dropdown-basic" style={{ content: "none" }}>
              <i class="bi bi-three-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item key={1} onClick={deleteVideo}>
                Delete
              </Dropdown.Item>
              <Dropdown.Item key={2} onClick={editVideo}>
                Edit
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </div>
  );
}
