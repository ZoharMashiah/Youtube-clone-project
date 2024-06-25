import React, { useState, useEffect } from "react";
import styles from "./AddVideoPopup.module.css";
import Dropdown from "react-bootstrap/Dropdown";

export default function AddVideoPopup({ currenUser, setvideos, videos, setfilterdVideos, onClose }) {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState(null);
  const [video, setvideo] = useState(null);
  const [category, setcategory] = useState("");
  const [categories, setCategories] = useState([
    "Music",
    "Mixes",
    "JavaScript",
    "Gaming",
    "Bouldering",
    "Display devices",
    "AI",
    "Computer Hardware",
    "Table News",
    "Inventions",
    "News",
    "Comedy clubs",
    "Skills",
    "3D printing",
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isAdmin = currenUser.username === "admin" && currenUser.password === "admin";

    if (!isAdmin && !isFormValid()) {
      alert("Fill all the fields!");
      return;
    }

    try {
      const newVideo = await createNewVideo();
      const address = `/api/users/${currenUser.id}/video`;
      const res = await fetch(address, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVideo),
      });

      console.log("Response status:", res.status);
      console.log("Response ok:", res.ok);

      if (!res.ok) {
        console.log("Full response:", res);
        console.log("Sending request to:", address);
        throw new Error(`HTTP error. status: ${res.status}`);
      }

      const videoData = await res.json();
      console.log(videoData);
      const videoFromServer = videoData.videoData;
      console.log(videoFromServer);

      resetForm();
      alert("Uploaded is successful.");
    } catch (error) {
      console.error("Error adding video:", error);
      alert("Failed to add video. Please try again.");
    }
  };

  const isFormValid = () => {
    return (
      title.trim() !== "" && description.trim() !== "" && category.trim() !== "" && image !== null && video !== null
    );
  };

  // const parseVideoData = () => ({});

  useEffect(() => {
    if (currenUser.username === "admin" && currenUser.password === "admin") {
      settitle("Admin Default Title");
      setdescription("Admin Default Description");
      setcategory("Admin Default Category");
      setimage("utilites/video1.png");
      setvideo("utilites/video1.mp4");
    }
  }, [currenUser]);

  // const createNewVideo = () => {
  //   const formData = new FormData();
  //   formData.append("id", getMaxId() + 1);
  //   formData.append("title", title);
  //   formData.append("description", description);
  //   formData.append("user", currenUser.username);
  //   formData.append("category", category);
  //   formData.append("publication_date", Date.now());
  //   formData.append("views", "0");
  //   formData.append("like", JSON.stringify([]));
  //   formData.append("dislike", JSON.stringify([]));
  //   formData.append("comments", JSON.stringify([]));
  //   // need to be files
  //   formData.append("icon", image);
  //   formData.append("video", video);
  //   return formData;
  // };

  const createNewVideo = async () => {
    // const imageBase64 = await fileToBase64(image);
    // const videoBase64 = await fileToBase64(video);

    return {
      title: title,
      description: description,
      user: currenUser.username,
      category: category,
      publication_date: Date.now(),
      icon: image,
      video: video,
      views: 0,
      like: [],
      dislike: [],
      comments: [],
    };
  };

  const updateState = (newVideo) => {
    setvideos((prevVideos) => [...prevVideos, newVideo]);
    setfilterdVideos((prevFilteredVideos) => [...prevFilteredVideos, newVideo]);
  };

  const resetForm = () => {
    settitle("");
    setdescription("");
    setimage(null);
    setvideo(null);
    setcategory("");
    onClose();
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className={styles.AddVideoWrapper}>
      <div className={`card ${styles.AddVideoCard}`}>
        <h2 className={styles.h2}>Add New Video</h2>
        <form onSubmit={handleSubmit} className={styles.cardWrapper}>
          <input
            placeholder="Title"
            className={styles.title}
            name="title"
            value={title}
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            name="description"
          />
          <Dropdown className={styles.dropdown}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {category === "" ? "Category" : category}
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.selectCategory}>
              {categories.map((categ) => (
                <Dropdown.Item key={categ} onClick={() => setcategory(categ)}>
                  {categ}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <input
            className={styles.videoUpload}
            type="file"
            alt="Upload Video"
            name="video"
            accept=".mp4"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                try {
                  const dataUrl = await readFileAsDataURL(file);
                  setvideo(dataUrl);
                } catch (error) {
                  console.error("Error reading file:", error);
                }
              }
            }}
          />
          <input
            className={styles.photoUpload}
            type="file"
            alt="Upload Photo"
            accept=".png, .jpeg, .jpg"
            name="thumbnail"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                try {
                  const dataUrl = await readFileAsDataURL(file);
                  setimage(dataUrl);
                } catch (error) {
                  console.error("Error reading file:", error);
                }
              }
            }}
          />
          <div className="btn-group">
            <button class="btn btn-primary" className={styles.cancelBtn} onClick={resetForm}>
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" className={styles.addBtn}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
