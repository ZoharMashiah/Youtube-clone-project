import React, { useState, useContext } from "react";
import styles from "./AddVideoPopup.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import { AppContext } from "../../AppContext";
import axios from "axios";

export default function AddVideoPopup({ onClose }) {
  const { currentUser, videoList, setVideoList } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [category, setCategory] = useState("");
  const categories = [
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
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormValid =
      title.trim() !== "" && description.trim() !== "" && category.trim() !== "" && image !== null && video !== null;
    if (!isFormValid) {
      alert("Fill all of the fields!");
      return;
    }

    try {
      const newVideo = await createNewVideo();
      const address = `/api/users/${currentUser._id}/videos`;
      console.log("Sending request to:", address);

      const res = await axios.post(address, newVideo);
      setVideoList([...videoList, res.body]);

      alert("Upload is successful!");
    } catch (error) {
      console.error("Error adding video:", error);
      if (error.response) {
        console.log("Full response:", error.response);
        console.log("Error data:", error.response.data);
        console.log("Error status:", error.response.status);
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error message:", error.message);
      }
      alert("Failed to add video. Please try again.");
    } finally {
      resetForm();
    }
  };

  const createNewVideo = async () => {
    return {
      user_id: currentUser._id,
      title: title,
      description: description,
      category: category,
      video: video,
      icon: image,
    };
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImage(null);
    setVideo(null);
    setCategory("");
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
              setTitle(e.target.value);
            }}
          />
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
          />
          <Dropdown className={styles.dropdown}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {category === "" ? "Category" : category}
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.selectCategory}>
              {categories.map((categ) => (
                <Dropdown.Item key={categ} onClick={() => setCategory(categ)}>
                  {categ}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <div className="mb-3">
            <label>Upload Video</label>
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
                    setVideo(dataUrl);
                  } catch (error) {
                    console.error("Error reading file:", error);
                  }
                }
              }}
            />
          </div>

          <div className="mb-3">
            <label>Upload Thumbnail</label>
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
                    setImage(dataUrl);
                  } catch (error) {
                    console.error("Error reading file:", error);
                  }
                }
              }}
            />
          </div>
          <div className="btn-group">
            <button class="btn btn-primary" className={styles.cancelBtn} onClick={onClose}>
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
