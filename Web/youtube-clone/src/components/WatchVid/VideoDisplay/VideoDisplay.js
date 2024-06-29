import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./VideoDisplay.module.css";
import SuggestedVideos from "../SuggestedVideos/SuggestedVideos";
import UpperVideo from "../UpperVideo/UpperVideo";
import axios from "axios";

export default function VideoDisplay({ context }) {
  const { userId, videoId } = useParams();
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    fetchVideo();
  }, [userId, videoId]);

  const fetchVideo = async () => {
    try {
      const response = await axios.get(`/api/users/${userId}/videos/${videoId}`);
      setCurrentVideo(response.data);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  return (
    <div className={styles.VideoDisplayWrapper}>
      <div className={styles.LeftVideoShowWrapper}>
        <div className={styles.UpperVideoWrapper}>
          <UpperVideo context={context} currentVideo={currentVideo} />
        </div>
        <div className={styles.CommentsWrapper}>
          {/* <Comments
              currentVideo={currentVideo}
              editVideo={editVideo}
              videos={videos}
              currentUser={currentUser}
              editComment={editComment}
              deleteComment={deleteComment}
            /> */}
        </div>
      </div>
      <div className={styles.SugestedVideosWrapper}>
        <SuggestedVideos context={context} currentVideo={currentVideo} setCurrentVideo={setCurrentVideo} />
      </div>
    </div>
  );
}
