import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function EditVideo({ setEditButton, videoTitle, videoDescription, onSave }) {
  const [title, setTitle] = useState(videoTitle);
  const [description, setDescription] = useState(videoDescription);

  useEffect(() => {
    setTitle(videoTitle);
    setDescription(videoDescription);
  }, [videoTitle, videoDescription]);

  const handleClose = () => setEditButton(false);

  const handleSave = () => {
    onSave(title, description);
    handleClose();
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "black" }}>Edit Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="videoTitle">
            <Form.Label style={{ color: "black" }}>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="videoDescription">
            <Form.Label style={{ color: "black" }}>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
