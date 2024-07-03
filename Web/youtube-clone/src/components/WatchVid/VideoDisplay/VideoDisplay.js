import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./VideoDisplay.module.css";
import axios from "axios";
import Buttons from "../Buttons/Buttons";
import Metadata from "../Metadata/Metadata";
import { AppContext } from "../../../AppContext";
import HorizontalVideoCard from "../../Feed/VideoShow/HorizontalVideoCard";

export default function VideoDisplay() {
  const { userId, videoId } = useParams();
  const [currentVideo, setCurrentVideo] = useState(null);
  const { videoList } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId && videoId) {
      fetchVideo(userId, videoId);
    } else {
      console.log("userId or videoId is missing");
    }
  }, [userId, videoId]);

  const fetchVideo = async (userId, videoId) => {
    try {
      setLoading(true);
      console.log("Fetching video for creator:", userId, "video:", videoId);
      const response = await axios.get(`/users/${userId}/videos/${videoId}`);
      setCurrentVideo(response.data);
    } catch (error) {
      console.error("Error fetching video:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentVideo) {
    return <div>Error loading video. Please try again.</div>;
  }

  return (
    <div className={styles.VideoDisplay}>
      <div className={styles.content}>
        <div className={styles.videoPlayerContainer}>
          {!currentVideo ? (
            <div>Loading...</div>
          ) : (
            <video className={styles.videoWrapper} src={currentVideo.video} controls></video>
          )}
        </div>

        {/* <div className={styles.textWrapper}>
        <h2>{currentVideo.title}</h2>
        {/* <Buttons currentVideo={currentVideo} deleteVideo={currentVideo._id} /> */}
        {/* <Description currentVideo={currentVideo} /> 
      </div> */}
        {/* <div className={styles.CommentsWrapper}>
          <Comments
            currentVideo={currentVideo}
            editVideo={editVideo}
            videos={videos}
            currentUser={currentUser}
            editComment={editComment}
            deleteComment={deleteComment}
          />
        </div> */}
        <div className={styles.sideList}>
          {videoList.map((video) => (
            <HorizontalVideoCard key={video._id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}
