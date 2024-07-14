import React, { useState } from "react";
import styles from "./VideoShow.module.css";
import { Image } from "react-bootstrap";
import VideoShow from "./VideoShow";
import { useNavigate } from "react-router-dom";

export default function VerticalVideoCard({ video }) {
  const navigate = useNavigate();
  const [currentVideo, setCurrentVideo] = useState(video);

  const goToVideoPage = () => {
    navigate(`/users/${video.user._id}/videos/${video._id}`);
  };

  const getToUserPage = () => {
    navigate(`/userpage/${video.user._id}`, { replace: true });
  };

  return (
    <div className={styles.feedVideoCard}>
      <img src={video.icon} id={styles.videoImage} onClick={() => goToVideoPage()} alt="Video thumbnail" />
      <div className={styles.metaData}>
        <Image
          src={video.user.photo}
          width="40px"
          height="40px"
          roundedCircle
          alt="User profile"
          id={styles.profileImage}
          onClick={() => getToUserPage()}
        />
        <VideoShow currentVideo={currentVideo} setCurrentVideo={setCurrentVideo} />
      </div>
    </div>
  );
}
