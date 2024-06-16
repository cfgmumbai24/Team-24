import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import terracota from "../../assets/terracota.webp";
import axios from "axios";
import config from "../../config/config";
import { redirect } from "react-router-dom/dist";

const Card = ({ card }) => {
  const [show, setShow] = useState(false);
  const [formValues, setFormValues] = useState({
    name: card.title,
    description: card.description,
    category: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = () => {
    console.log("Form values saved:", formValues);
    handleClose();
  };

  const handleDiscard = () => {
    setFormValues({
      name: card.title,
      description: card.description,
      category: "",
    });
    handleClose();
  };

  return (
    <>
      <div className="card" style={{ width: 360, marginTop: 10 }}>
        <img
          src={card.product.imgLink}
          className="card-img-top"
          alt="terracota"
        />
        <div className="card-body">
          <h5 className="card-title">{card.product.title}</h5>
          <p className="card-text">{card.product.description}</p>
          <div className="d-flex justify-content-between">
            <Button
              variant="success"
              onClick={() => {
                axios
                  .get(
                    `${config.BACKEND_URL}/product-request/admin/${card._id}/approve`,
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  )
                  .then(() => {
                    redirect("/admin");
                  });
              }}
            >
              Approve
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                axios
                  .get(
                    `${config.BACKEND_URL}/product-request/admin/${card._id}/reject`,
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  )
                  .then(() => {
                    redirect("/admin");
                  });
              }}
            >
              Reject
            </Button>
            <Button variant="info" onClick={handleShow}>
              Edit
            </Button>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formValues.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={formValues.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDiscard}>
            Discard
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Card;
