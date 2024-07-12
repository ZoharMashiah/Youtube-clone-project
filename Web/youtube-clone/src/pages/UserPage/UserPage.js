import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "../../components/UserPage/UserInfo/UserInfo";
import HorizontalVideoCard from "../../components/Feed/VideoShow/HorizontalVideoCard";
import styles from "./UserPage.module.css";

export default function UserPage() {
  const { userId } = useParams();
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch(`/api/users/${userId}/videos`);
      const data = await res.json();
      setVideoList(data);
    };
    fetchVideos();
  }, []);

  return (
    <div>
      <div>
        <UserInfo userId={userId} />
      </div>
      <hr />
      <div className={styles.container}>
        <div className={styles.videoGrid}>
          {videoList.map((video) => (
            <HorizontalVideoCard key={video._id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}
