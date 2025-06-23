import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomModal = ({ show, onHide, title, body, footer, confirmText = "OK", onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide} centered className="rounded">
      <Modal.Header closeButton>
        <Modal.Title className="fw-semibold">{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {typeof body === 'string' ? <p>{body}</p> : body}
      </Modal.Body>

      <Modal.Footer>
        {footer ? (
          footer
        ) : (
          <>
            <Button variant="secondary" onClick={onHide} className="rounded-pill">
              Close
            </Button>
            <Button variant="danger" onClick={onConfirm} className="rounded-pill">
              {confirmText}
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
