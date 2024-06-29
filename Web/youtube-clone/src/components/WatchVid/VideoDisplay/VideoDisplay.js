import React from "react";
import styles from "./VideoDisplay.module.css";
import SugestedVideos from "../SugestedVideos/SugestedVideos";
import LeftVideoShow from "../LeftVideoShow/LeftVideoShow";

export default function VideoDisplay({
  currentVideo,
  editVideo,
  videos,
  setcurrentVideo,
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
        <SugestedVideos videos={videos} currentVideo={currentVideo} setcurrentVideo={setcurrentVideo} />
      </div>
    </div>
  );
}
