import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./VideoDisplay.module.css";
import { AppContext } from "../../AppContext";
import HorizontalVideoCard from "../../components/Feed/VideoShow/HorizontalVideoCard";
import Description from "../../components/WatchVid/Description/Description";
import Metadata from "../../components/WatchVid/Metadata/Metadata";
import { Image } from "react-bootstrap";
import Comments from "../../components/WatchVid/Comments/Comments";
import authAxios from "../../util/authAxios";

export default function VideoDisplay() {
  const { userId, videoId } = useParams();
  const [currentVideo, setCurrentVideo] = useState(null);
  const { videoList, setVideoList } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId && videoId) {
      fetchVideo(userId, videoId);
    } else {
      console.log("userId or videoId is missing");
      setLoading(false);
    }
    if (videoList.length === 0) {
      fetchFeed();
    }
  }, [userId, videoId]);

  const fetchVideo = async (userId, videoId) => {
    try {
      setLoading(true);
      console.log("Fetching video for creator:", userId, "video:", videoId);
      const address = `/api/users/${userId}/videos/${videoId}`;
      const response = await authAxios.get(address);
      setCurrentVideo(response.data.video);
      setSuggestedVideos(response.data.suggestedVideos);
      setVideoList((prevVideoList) =>
        prevVideoList.map((video) =>
          video._id === response.data._id ? { ...video, views: response.data.views } : video
        )
      );
    } catch (error) {
      console.error("Error fetching video:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeed = async () => {
    try {
      const res = await authAxios.get("/api/videos");
      const videoList = res.data;
      console.log("video list: ", videoList);
      setVideoList(videoList);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const getToUserPage = () => {
    if (currentVideo && currentVideo.user) {
      navigate(`/userpage/${currentVideo.user._id}`);
    }
  };

  if (loading) {
    return <img src="/utilites/loading.svg" className={styles.loading} alt="Loading..." />;
  }

  if (!currentVideo) {
    return <div>Error loading video. Please try again.</div>;
  }

  return (
    <div className={styles.VideoDisplay}>
      {currentVideo === null || loading ? (
        <img src="/utilites/loading.svg" className={styles.loading} alt="Loading..." />
      ) : (
        <div className={styles.content}>
          <div className={styles.videoPlayerContainer}>
            <video className={styles.videoWrapper} src={currentVideo.video} controls></video>
            <h2 id={styles.title}>{currentVideo.title}</h2>
            <div className={styles.metaData}>
              <Image
                src={currentVideo.user.photo}
                alt="User Profile"
                width="40px"
                height="40px"
                roundedCircle
                onClick={getToUserPage}
              />
              <Metadata currentVideo={currentVideo} setCurrentVideo={setCurrentVideo} />
            </div>
            <div className={styles.decriptionWrapper}>
              <Description currentVideo={currentVideo} />
            </div>
            <Comments currentVideo={currentVideo} />
          </div>
        </div>
      )}
      <div className={styles.sideList}>
        {suggestedVideos
          .map((video) => (
            <HorizontalVideoCard key={video._id} video={video} />
          ))}
      </div>
    </div>
  );
}
