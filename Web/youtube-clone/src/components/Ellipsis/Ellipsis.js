import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import styles from "./Ellipsis.module.css";
import Dropdown from "react-bootstrap/Dropdown";

import EditVideo from "../UserPage/EditVideo/EditVideo";

export default function Ellipsis({ video }) {
  const [editButton, setEditButton] = useState(false);

  const navigate = useNavigate();
  const { currentUser } = useContext(AppContext);

  const deleteVideo = async () => {
    try {
      console.log("Deleting video:", video._id);
      const address = `/api/users/${video.user._id}/videos/${video._id}`;
      const response = await axios.delete(address);
      if (response.status === 200) {
        console.log("Video deleted successfully");
        getToFeed();
      } else {
        console.warn("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };
  const editVideo = () => setEditButton(true);

  const getToFeed = () => {
    const currentPath = window.location.pathname;
    const isVideoDisplayPath = /^\/users\/[^/]+\/videos\/[^/]+$/.test(currentPath);

    if (isVideoDisplayPath) {
      navigate("/", { replace: true });
    } else {
      window.location.reload();
    }
  };

  return (
    <div>
      {currentUser && currentUser._id == video.user._id && (
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
