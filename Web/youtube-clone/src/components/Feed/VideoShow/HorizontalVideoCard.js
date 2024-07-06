import React from "react";
import styles from "./VideoShow.module.css";
import VideoShow from "./VideoShow";
import { useNavigate } from "react-router-dom";

export default function HorizontalVideoCard({ video }) {
  const navigate = useNavigate();

  const goToVideoPage = () => {
    navigate(`/users/${video.user._id}/videos/${video._id}`);
  };

  return (
    <div className={styles.sideListVideoCard}>
      <img src={video.icon} id={styles.videoImage} onClick={() => goToVideoPage()} alt="Video thumbnail" />
      <div className={styles.metaData}>
        <VideoShow video={video} />
      </div>
    </div>
  );
}
