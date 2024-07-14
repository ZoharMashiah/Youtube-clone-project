import React, { useState } from "react";
import styles from "./VideoShow.module.css";
import VideoShow from "./VideoShow";
import { useNavigate } from "react-router-dom";

export default function HorizontalVideoCard({ video }) {
  const navigate = useNavigate();
  const [currentVideo, setCurrentVideo] = useState(video);

  const goToVideoPage = () => {
    navigate(`/users/${video.user._id}/videos/${video._id}`);
  };

  return (
    <div className={styles.sideListVideoCard}>
      <img src={video.icon} id={styles.videoImage} onClick={() => goToVideoPage()} alt="Video thumbnail" />
      <div className={styles.metaData}>
        <VideoShow currentVideo={currentVideo} setCurrentVideo={setCurrentVideo} />
      </div>
    </div>
  );
}
