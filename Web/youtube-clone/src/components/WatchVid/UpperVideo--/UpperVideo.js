// import React from "react";
// import styles from "./UpperVideo.module.css";
// import Buttons from "../Buttons/Buttons";
// import Description from "../Description/Description";

// export default function UpperVideo({ context, currentVideo }) {
//   useEffect(() => {
//     fetchVideo();
//   }, [userId, videoId]);

//   const fetchVideo = async () => {
//     try {
//       const response = await axios.get(`/api/users/${userId}/videos/${videoId}`);
//       setCurrentVideo(response.data);
//     } catch (error) {
//       console.error("Error fetching video:", error);
//     }
//   };
//   return (
//     <div>
//       <div class="embed-responsive embed-responsive-1by1  w-100" className={styles.videoPlayerWrapper}>
//         <iframe
//           class="embed-responsive-item"
//           src={currentVideo.video}
//           allowfullscreen
//           className={styles.videoPlayer}
//         ></iframe>
//       </div>
//       <div className={styles.textWrapper}>
//         <h2>{currentVideo.title}</h2>
//         <Buttons currentVideo={currentVideo} deleteVideo={deleteVideo} context={context} />
//         <Description currentVideo={currentVideo} />
//       </div>
//     </div>
//   );
// }
