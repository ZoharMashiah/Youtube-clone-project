import React, { useContext } from "react";
import { AppContext } from "../../AppContext";
import styles from "./Feed.module.css";
import AddVideoPopup from "../../components/AddVideo/AddVideoPopup";
import Categories from "../../components/Feed/Categories/Categories";
import VerticalVideoCard from "../../components/Feed/VideoShow/VerticalVideoCard";
import LeftMenu from "../../components/Feed/LeftMenu/LeftMenu";
import { useOutletContext } from "react-router-dom";

export default function Feed() {
  const { trigger, setTrigger } = useOutletContext();
  const { videoList, isFiltered, filteredVideoList } = useContext(AppContext);

  return (
    <div className={styles.Home}>
      <div className={styles.LeftMenu}>
        <LeftMenu />
      </div>
      <div className={styles.FeedContainer}>
        <div className={styles.categories}>
          <Categories />
        </div>
        <div>
          {videoList.length > 0 ? (
            <div className={styles.videoGrid}>
              {!isFiltered
                ? videoList.map((video) => <VerticalVideoCard key={video._id} video={video} />)
                : filteredVideoList.map((video) => <VerticalVideoCard key={video._id} video={video} />)}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
      {trigger ? <AddVideoPopup onClose={() => setTrigger(false)} /> : ""}
    </div>
  );
}
