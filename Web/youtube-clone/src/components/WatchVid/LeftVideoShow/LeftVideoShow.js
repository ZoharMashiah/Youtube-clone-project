import React from "react";
import styles from "./LeftVideoShow.module.css";
import UpperVideo from "../UpperVideo/UpperVideo";
import Comments from "../Comments/Comments";

export default function LeftVideoShow({ currentVideo: fe, videos, currentUser, editComment, deleteComment }) {
  const [currentVideo, setCurrentVideo] = useState(null);

  const editVideo = () => {
    console.log("NOT WORKING");
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  const fetchVideo = async () => {
    const response = await axios.get(`/api/users/${userId}/videos/${videoId}`);

    setCurrentVideo(response.body);
  };

  return (
    <div className={styles.LeftVideoShowWrapper}>
      <div className={styles.UpperVideoWrapper}>
        <UpperVideo currentVideo={currentVideo} currentUser={currentUser} />
      </div>
      <div className={styles.CommentsWrapper}>
        <Comments
          currentVideo={currentVideo}
          editVideo={editVideo}
          videos={videos}
          currentUser={currentUser}
          editComment={editComment}
          deleteComment={deleteComment}
        />
      </div>
    </div>
  );
}
