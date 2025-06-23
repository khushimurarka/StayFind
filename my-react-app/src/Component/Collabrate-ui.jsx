import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';

const Collabrate = () => {
  const navigate = useNavigate();

  const handleCreateTripBoard = () => {
    const roomId = Math.random().toString(36).substring(2, 8);
    navigate(`/trip/${roomId}`);
  };

  return (
    <div style={{ backgroundColor: '#004868', padding: '0px 0' }}>
      <Container>
        <Card className="text-center shadow-sm p-1 border-0" style={{ color: '#fff', backgroundColor: 'transparent' }}>
          <Card.Body>
            <FaUsers size={48} className="mb-3 text-light" />
            <Card.Title className="fs-3 fw-semibold">Plan with Your Crew</Card.Title>
            <Card.Text className="text-light">
              Going on a trip with friends or family? Use <strong>TripBoard</strong> to vote on stays and plan together easily.
            </Card.Text>
            <Button variant="light" className="rounded-pill px-4 mt-2" onClick={handleCreateTripBoard}>
              Create a TripBoard
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Collabrate;
