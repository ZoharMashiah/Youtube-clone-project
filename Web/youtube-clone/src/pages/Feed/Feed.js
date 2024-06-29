import React, { useEffect, useState } from "react";
import styles from "./Feed.module.css";
import UpBar from "../../components/Feed/UpBar/UpBar";
import LowerFeed from "../../components/Feed/LowerFeed/LowerFeed";
import VideoDisplay from "../../components/WatchVid/VideoDisplay/VideoDisplay";
import AddVideoPopup from "../../components/AddVideo/AddVideoPopup";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function Feed({ context, setContext }) {
  const [searchText, setsearchText] = useState("");
  const [currentVideo, setcurrentVideo] = useState(0);
  const [trigger, settrigger] = useState(false);

  return (
    <div className={styles.Feed}>
      <div className={styles.Up}>
        <UpBar context={context} setSearchText={setsearchText} setTrigger={settrigger} />
      </div>
      <div className={styles.Low}>
        {currentVideo === 0 ? (
          <div className={styles.displayVideoLowerFeed}>
            <LowerFeed setcurrentVideo={setcurrentVideo} />
          </div>
        ) : (
          <VideoDisplay setcurrentVideo={setcurrentVideo} currentUser={context} />
        )}
      </div>
      {trigger && context != null ? (
        <AddVideoPopup
          currenUser={context} // eventually gets user id
          onClose={() => settrigger(false)}
        />
      ) : (
        trigger && context == null && <Navigate to="/login" />
      )}
    </div>
  );
}
