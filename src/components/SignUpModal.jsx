import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SignUpModal = (props) => {
  const [showModal, setShowModal] = useState(props.showSignUp);

  useEffect(() => {
    setShowModal(props.showSignUp);
  }, [props.showSignUp])


  return (
    <Modal id="signup-modal" show={showModal}>
          <ModalHeader
            closeButton
            onHide={() => {
              setShowModal(false);
            }}
          />
          <ModalBody>
            <Form>
              <Form.Group></Form.Group>
              <Form.Group>
                <Form.Control
                  size="sm"
                  id="username"
                  type="text"
                  placeholder="Username"
                  onChange={props.onUsernameInput}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  size="sm"
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={props.onPasswordInput}
                />
              </Form.Group>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              id="create-user"
              variant="outline-dark"
              style={{ marginTop: 20 + "px" }}
              onClick={props.onCreateUser}
            >
              Create a new User
            </Button>
          </ModalFooter>
        </Modal>
  )
}

export default SignUpModal;