import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import styles from "./Ellipsis.module.css";
import Dropdown from "react-bootstrap/Dropdown";

import EditVideo from "../UserPage/EditVideo/EditVideo";

export default function Ellipsis({ video, setTitle, setDescription }) {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { currentUser, videoList, setVideoList } = useContext(AppContext);

  const deleteVideo = async () => {
    try {
      console.log("Deleting video:", video._id);
      const address = `/api/users/${video.user._id}/videos/${video._id}`;
      const response = await axios.delete(address);
      if (response.status === 200) {
        console.log("Video deleted successfully");
        const currentPath = window.location.pathname;
        const isVideoDisplayPath = /^\/users\/[^/]+\/videos\/[^/]+$/.test(currentPath);
        if (isVideoDisplayPath) {
          navigate("/", { replace: true });
        } else {
          setVideoList((prevList) => prevList.filter((v) => v._id !== video._id));
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
      const response = await axios.patch(`/api/users/${video.user._id}/videos/${video._id}`, {
        title: newTitle,
        description: newDescription,
      });

      setTitle(newTitle);
      setDescription(newDescription);
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
      {currentUser && currentUser._id === video.user._id && (
        <Dropdown className={styles.ellipsis}>
          {isEditing && (
            <EditVideo
              setEditButton={setIsEditing}
              videoTitle={video.title}
              videoDescription={video.description}
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
