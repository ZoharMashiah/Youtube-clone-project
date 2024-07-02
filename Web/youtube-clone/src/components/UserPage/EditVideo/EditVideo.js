import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function EditVideo({setEditButton, videoTitle, videoDescription}) {
    const [show, setShow] = useState(true);
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState(videoTitle)
    const [description, setDescription] = useState(videoDescription)
    const [editedTitle, setEditedTitle] = useState("")
    const [editedDescription, setEditedDescription] = useState("")

    const handleClose = () => {
      setEditButton(false)
    }
    const handleShow = () => {
        setShow(true);
    }
    const handleEdit = () => {
        setEditedTitle(title)
        setEditedDescription(description)
        setEdit(true);
    }
    const handleSave = () => {
        setTitle(editedTitle)
        setDescription(editedDescription)
      setEdit(false);
      // add edit of the video in the server
    }
    const handleCancle = () => setEdit(false);


  return (
      <div>
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Video</Modal.Title>
        </Modal.Header>
        
        {edit ? <><Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} 
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancle}>
            Cancle
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer> 
        </>
        : <>
        <Modal.Body>
        <h4>{title}</h4>
        <p style={{"word-wrap": "break-word"}}>
          {description}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleEdit}>Edit</Button>
      </Modal.Footer>
      </>}
      </Modal>
    </div>
  )
}
