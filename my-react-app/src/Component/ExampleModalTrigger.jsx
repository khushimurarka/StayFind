import React, { useState } from 'react';
import CustomModal from './Modal';
import { Button } from 'react-bootstrap';

const ExampleModalTrigger = () => {
  const [show, setShow] = useState(false);

  const handleConfirm = () => {
    alert("Confirmed!");
    setShow(false);
  };

  return (
    <>
      <Button onClick={() => setShow(true)} className="rounded-pill" variant="danger">
        Open Modal
      </Button>

      <CustomModal
        show={show}
        onHide={() => setShow(false)}
        title="Confirm Booking"
        body="Are you sure you want to book this stay?"
        confirmText="Yes, Book It"
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default ExampleModalTrigger;
