import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./VideoDisplay.module.css";
import axios from "axios";
import { AppContext } from "../../../AppContext";
import HorizontalVideoCard from "../../Feed/VideoShow/HorizontalVideoCard";
import Buttons from "../Buttons/Buttons";
import VideoShow from "../../Feed/VideoShow/VideoShow";

export default function VideoDisplay() {
  const { userId, videoId } = useParams();
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const { videoList } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      const address = `/api/users/${userId}/videos/${videoId}`;
      console.log(address);
      const response = await axios.get(address);
      console.log(response.data);

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

  const getToUserPage = () => {
    navigate(`/userpage/${currentVideo.user._id}`, { replace: true });
  };

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
        <div>
          {/* <img
            src={currentVideo.user.photo}
            width="40px"
            height="40px"
            style="border-radius: 50%;"
            onclick="getToUserPage()"
          /> */}

          {/* <VideoShow video={currentVideo} onClick={goToVideoPage} /> */}
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
