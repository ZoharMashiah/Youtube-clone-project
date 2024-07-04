import React from "react";
import styles from "./Logo.module.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
      setTimeout(() => window.location.reload(), 50);
    }
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
