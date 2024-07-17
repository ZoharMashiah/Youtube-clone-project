import React from "react";
import { useState, useEffect, useContext } from "react";
import { Image } from "react-bootstrap";
import { AppContext } from "../../../AppContext";
import { useNavigate } from "react-router-dom";
import authAxios from "../../../util/authAxios";
import "./UserInfo.css";

export default function UserInfo({ userId }) {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({});
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [editableData, setEditableData] = useState({
    firstName: "",
    lastName: "",
  });

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const handleEdit = () => {
    setIsEditing(true);
    setEditableData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      birthdate: userData.birthdate,
    });
  };

  const handleSave = async () => {
    try {
      const response = await authAxios.patch(`/api/users/${userId}`, editableData);
      setUserData(response.data);
      setIsEditing(false);
    } catch (error) {
      alert("Error updating user information!");
    }
  };

  const handleDelete = async () => {
    try {
      await authAxios.delete(`/api/users/${userId}`);
      await sleep(2000);
      setCurrentUser(null);
      setShow(false);
      localStorage.removeItem("token");
      navigate("/", { replace: true });
      window.location.reload();
    } catch (error) {
      alert("Error deleting the user!");
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await authAxios.get(`/api/users/${userId}`);
      setUserData(data);
    };
    fetchVideos();
  }, []);

  return (
    <div className="userInfo">
      <Image src={userData.photo} width="100px" height="100px" roundedCircle alt="User profile" />
      <h4>{userData.username}</h4>
      {isEditing ? (
        <div className="editSection">
          <input
            type="text"
            className="form-control mb-3 input-field no-padding"
            value={editableData.firstName}
            onChange={(e) => setEditableData({ ...editableData, firstName: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2 input-field no-padding"
            value={editableData.lastName}
            onChange={(e) => setEditableData({ ...editableData, lastName: e.target.value })}
          />
          <div className="userPageBtns">
            <button className="submit-button userBtn" onClick={handleSave}>
              Save
            </button>
            <button className="btn btn-secondary userBtn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p>First Name: {userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          {currentUser && currentUser._id === userId && (
            <div className="userPageBtns">
              <button className="submit-button userBtn" onClick={handleEdit}>
                Edit User
              </button>
              <button className="btn btn-danger userBtn" onClick={() => handleDelete}>
                Delete User
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
