import React, { useState, useContext } from "react";
import styles from "./Search.module.css";
import { Button, InputGroup, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../../../AppContext";

export default function Search() {
  const { filterVideos } = useContext(AppContext);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const newSearchText = e.target.value;
    setText(newSearchText);
  };

  const handleButtonClick = async () => {
    await filterVideos(true, text);
    console.log("search pressed");
    navigate("/", { replace: true });
  };

  return (
    <InputGroup className="mb-3" id={styles.input}>
      <Form.Control
        placeholder="Search"
        aria-label="Search"
        aria-describedby="basic-addon2"
        id={styles.form}
        value={text}
        onChange={handleInputChange}
      />
      <Button variant="outline-secondary" id={styles.button_addon2} onClick={handleButtonClick}>
        <i className="bi bi-search" id={styles.icon} />
      </Button>
    </InputGroup>
  );
}
