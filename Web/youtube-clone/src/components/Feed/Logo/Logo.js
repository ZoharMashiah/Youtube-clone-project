import React, { useContext } from "react";
import styles from "./Logo.module.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../AppContext";

export default function Logo() {
  const navigate = useNavigate();
  const { stopFilter, setSelectedCategory } = useContext(AppContext);

  const handleClick = () => {
    stopFilter();
    setSelectedCategory("All");
    navigate("/");
  };

  return (
    <div className={styles.imgContainer}>
      <button onClick={handleClick} className={styles.imageButton}>
        <img
          src="/utilites/Image.png"
          alt="Logo"
          style={{ width: "120px", objectFit: "contain", borderRadius: "4px" }}
        />
      </button>
    </div>
  );
}
