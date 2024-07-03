import React from 'react'
import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { AppContext } from '../../../AppContext';
import { useNavigate, useLocation } from 'react-router-dom';


export default function UserInfo({userId}) {
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({})
  const { currentUser, setCurrentUser, videoList, setVideoList } = useContext(AppContext)
  const navigate = useNavigate()
  const location = useLocation();

  const handleClose = () => {
      setShow(false);
  }
  const handleShow = () => {
      setShow(true);
  }

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  
  const handleDelete = async() => {
    const res = await fetch(`/api/users/${userId}`, {
      method: "DELETE"
    })
    if (res.ok) {
      await sleep(2000)
      setCurrentUser(null)
      setShow(false);
      // const newList = videoList.filter((video) => video.user._id != userId)
      localStorage.removeItem("token")
      navigate("/", { replace: true })
      window.location.reload()
    } else {
      alert("Error deleting the user!")
    }
  }
  
  useEffect(() => {
    const fetchVideos = async () => {
        const res = await fetch(`/api/users/${userId}`)
      const data = await res.json()
      console.log(data.photo)
        setUserData(data)
    }
    fetchVideos()
},[])


  return (
      <div style={{textAlign:"center"}}>
          <img src={userData.photo != null? userData.photo :'utilites/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png'} style={{width: "100px", height:"100px", borderRadius:"50px"}}/>
          <h4>{userData.username}</h4>
          <div>
          <>
      <p style={{borderWidth: "0px", color: "blue", backgroundColor: "transparent"}} onClick={handleShow}>
        Details
      </p>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p style={{"word-wrap": "break-word"}}>
          Username: {userData.username}
        </p>
        <p style={{"word-wrap": "break-word"}}>
          First Name: {userData.firstName}
        </p>
        <p style={{"word-wrap": "break-word"}}>
          Last Name: {userData.lastName}
        </p>
        <p style={{"word-wrap": "break-word"}}>
          Birthdate: {(new Date(userData.birthdate)).getDay()}/{(new Date(userData.birthdate)).getMonth()}/{(new Date(userData.birthdate)).getFullYear()}
        </p>
      </Modal.Body>
          <Modal.Footer>
            {currentUser&& currentUser._id === userId &&
              <Button variant="danger" onClick={handleDelete}>Delete User</Button>
            }
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
          </div>
    </div>
  )
}
