import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "../../components/UserPage/UserInfo/UserInfo";
import HorizontalVideoCard from "../../components/Feed/VideoShow/HorizontalVideoCard";
import styles from "./UserPage.module.css";
import authAxios from "../../util/authAxios";

export default function UserPage() {
  const { userId } = useParams();
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await authAxios.get(`/api/users/${userId}/videos`);
      setVideoList(data);
    };
    fetchVideos();
  }, []);

  return (
    <div>
      <div className={styles.UserInfo}>
        <UserInfo userId={userId} />
      </div>
      <hr />
      <div>
        {videoList.length > 0 ? (
          <div className={styles.videoGrid}>
            {videoList.map((video) => (
              <HorizontalVideoCard key={video._id} video={video} />
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
