import React, { useState, useContext } from "react";
import styles from "./Metadata.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import EditVideo from "../../UserPage/EditVideo/EditVideo";
import { AppContext } from "../../../AppContext";
import { useNavigate } from "react-router-dom";
import Buttons from "../Buttons/Buttons";

export default function Metadata({ currentVideo }) {
  const [editButton, setEditButton] = useState(false);
  const { currentUser } = useContext(AppContext);
  const navigate = useNavigate();

  console.log("*****************", currentVideo);

  const editVideo = () => setEditButton(true);

  const deleteVideo = () => {};

  const getToUserPage = () => {
    navigate(`/userpage/${currentVideo.user._id}`, { replace: true });
  };

  return (
    <div className={styles.videoDetails}>
      {editButton && (
        <EditVideo
          setEditButton={setEditButton}
          videoTitle={currentVideo.title}
          videoDescription={currentVideo.description}
        />
      )}
      <div className={styles.titleWrapper}>
        <p id={styles.title}>{currentVideo.title}</p>
        <div>
          <span id={styles.user} onClick={() => getToUserPage()}>
            {currentVideo.user.username}
          </span>
        </div>
        <div>
          <Buttons currentVideo={currentVideo} />
        </div>
      </div>
      {currentUser && currentUser._id == currentVideo.user._id && (
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
  );
}
