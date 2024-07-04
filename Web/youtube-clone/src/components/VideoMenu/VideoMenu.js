import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import styles from "./VideoMenu.module.css";
import Dropdown from "react-bootstrap/Dropdown";

import EditVideo from "../UserPage/EditVideo/EditVideo";

export default function VideoMenu({ currentVideo, setCurrentVideo }) {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { currentUser, setVideoList } = useContext(AppContext);

  const deleteVideo = async () => {
    try {
      console.log("Deleting video:", currentVideo._id);
      const address = `/api/users/${currentVideo.user._id}/videos/${currentVideo._id}`;
      const response = await axios.delete(address);
      if (response.status === 200) {
        console.log("Video deleted successfully");
        const currentPath = window.location.pathname;
        const isVideoDisplayPath = /^\/users\/[^/]+\/videos\/[^/]+$/.test(currentPath);
        if (isVideoDisplayPath) {
          navigate("/", { replace: true });
        } else {
          setVideoList((prevList) => prevList.filter((v) => v._id !== currentVideo._id));
        }
      } else {
        console.warn("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const editVideo = () => setIsEditing(true);

  const handleSaveVideo = async (newTitle, newDescription) => {
    try {
      console.log("new title: ", newTitle);
      console.log("newDescription: ", newDescription);
      const response = await axios.patch(`/api/users/${currentVideo.user._id}/videos/${currentVideo._id}`, {
        title: newTitle,
        description: newDescription,
      });

      setVideoList((prevList) =>
        prevList.map((v) => (v._id === currentVideo._id ? { ...v, title: newTitle, description: newDescription } : v))
      );

      setCurrentVideo((prevVideo) => ({
        ...prevVideo,
        title: newTitle,
        description: newDescription,
      }));

      console.log(response.status);

      if (response.status === 200) {
        console.log("Video updated successfully");
      }
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  return (
    <div>
      {currentUser && currentUser._id === currentVideo.user._id && (
        <Dropdown className={styles.ellipsis}>
          {isEditing && (
            <EditVideo
              setEditButton={setIsEditing}
              videoTitle={currentVideo.title}
              videoDescription={currentVideo.description}
              onSave={handleSaveVideo}
            />
          )}
          <Dropdown.Toggle variant="white" id="dropdown-basic" style={{ content: "none" }}>
            <i className="bi bi-three-dots-vertical"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={deleteVideo}>Delete</Dropdown.Item>
            <Dropdown.Item onClick={editVideo}>Edit</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
}
