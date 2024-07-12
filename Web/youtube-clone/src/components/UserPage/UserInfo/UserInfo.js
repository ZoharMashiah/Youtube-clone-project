import React from "react";
import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import { Image } from "react-bootstrap";
import { AppContext } from "../../../AppContext";
import { useNavigate } from "react-router-dom";

export default function UserInfo({ userId }) {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({});
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const handleDelete = async () => {
    const res = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      await sleep(2000);
      setCurrentUser(null);
      setShow(false);
      localStorage.removeItem("token");
      navigate("/", { replace: true });
      window.location.reload();
    } else {
      alert("Error deleting the user!");
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();
      setUserData(data);
    };
    fetchVideos();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <Image src={userData.photo} width="100px" height="100px" roundedCircle alt="User profile" />
      <h4>{userData.username}</h4>
      <div>
        <>
          <p style={{ textDecoration: "underline" }} onClick={handleShow}>
            Details
          </p>

          <div show={show} onHide={handleClose}>
            <p style={{ "word-wrap": "break-word" }}>First Name: {userData.firstName}</p>
            <p style={{ "word-wrap": "break-word" }}>Last Name: {userData.lastName}</p>
            <p style={{ "word-wrap": "break-word" }}>
              Birthdate: {new Date(userData.birthdate).getDay()}/{new Date(userData.birthdate).getMonth()}/
              {new Date(userData.birthdate).getFullYear()}
            </p>
            {currentUser && currentUser._id === userId && (
              <Button variant="danger" onClick={handleDelete}>
                Delete User
              </Button>
            )}
          </div>
        </>
      </div>
    </div>
  );
}
