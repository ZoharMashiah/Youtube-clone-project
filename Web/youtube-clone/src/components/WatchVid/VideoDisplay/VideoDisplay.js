import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./VideoDisplay.module.css";
import SuggestedVideos from "../SuggestedVideos/SuggestedVideos";
import UpperVideo from "../UpperVideo--/UpperVideo";
import axios from "axios";
import Buttons from "../Buttons/Buttons";
import Description from "../Description/Description";

export default function VideoDisplay({ context }) {
  const { creatorId, videoId } = useParams();
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    fetchVideo();
  }, [creatorId, videoId]);

  const fetchVideo = async (creatorId, videoId) => {
    try {
      const response = await axios.get(`/api/users/${creatorId}/videos/${videoId}`);
      setCurrentVideo(response.data);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  return (
    <div className={styles.VideoDisplayWrapper}>
      <div className={styles.LeftVideoShowWrapper}>
        <div className={styles.UpperVideoWrapper}>
          <div class="embed-responsive embed-responsive-1by1  w-100" className={styles.videoPlayerWrapper}>
            <iframe
              class="embed-responsive-item"
              src={currentVideo.video}
              allowfullscreen
              className={styles.videoPlayer}
            ></iframe>
          </div>
          <div className={styles.textWrapper}>
            <h2>{currentVideo.title}</h2>
            <Buttons currentVideo={currentVideo} deleteVideo={videoId} context={context} />
            <Description currentVideo={currentVideo} />
          </div>
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
