import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { FaPen, FaTrash, FaEye } from 'react-icons/fa';

const Listings = ({ data, onDelete, onEdit, onView }) => (
  <Row className="g-3">
    {data.map((listing, idx) => (
      <Col md={6} key={idx}>
        <Card className="shadow-sm border-0 h-100 rounded-4">
          <Row className="g-0">
            <Col xs={4}>
              <img
                src={listing.image}
                alt={listing.title}
                className="img-fluid h-100 object-fit-cover rounded-start"
              />
            </Col>
            <Col xs={8}>
              <Card.Body>
                <Card.Title className="fs-6">{listing.title}</Card.Title>
                <Card.Text className="mb-1"><strong>Status:</strong> {listing.status}</Card.Text>
                <Card.Text><strong>Price:</strong> ₹{listing.price} / night</Card.Text>
                <div className="d-flex gap-2 mt-2">
                  <Button size="sm" variant="outline-primary" onClick={() => onEdit(idx)}>
                    <FaPen />
                  </Button>
                  <Button size="sm" variant="outline-danger" onClick={() => onDelete(idx)}>
                    <FaTrash />
                  </Button>
                  <Button size="sm" variant="outline-secondary" onClick={() => onView(idx)}>
                    <FaEye />
                  </Button>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Col>
    ))}
  </Row>
);

export default Listings;
