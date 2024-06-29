import React from "react";
import styles from "./VideoDisplay.module.css";
import SuggestedVideos from "../SuggestedVideos/SuggestedVideos";
import LeftVideoShow from "../LeftVideoShow/LeftVideoShow";

export default function VideoDisplay({
  currentVideo,
  editVideo,
  videos,
  setCurrentVideo,
  currentUser,
  editComment,
  deleteComment,
}) {
  return (
    <div className={styles.VideoDisplayWrapper}>
      <div className={styles.LeftVideoShowWrapper}>
        <LeftVideoShow
          currentVideo={currentVideo}
          videos={videos}
          currentUser={currentUser}
          editComment={editComment}
          deleteComment={deleteComment}
        />
      </div>
      <div className={styles.SugestedVideosWrapper}>
        <SuggestedVideos videos={videos} currentVideo={currentVideo} setcurrentVideo={setCurrentVideo} />
      </div>
    </div>
  );
}
