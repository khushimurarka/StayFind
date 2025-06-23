import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import {
  FaLeaf,
  FaDog,
  FaLaptopHouse,
  FaLandmark,
  FaHotel,
  FaSpa
} from 'react-icons/fa';

const categories = [
  { label: 'Nature Escapes', icon: <FaLeaf size={28} />, value: 'nature' },
  { label: 'Luxury Villas', icon: <FaSpa size={28} />, value: 'luxury' },
  { label: 'Pet Friendly', icon: <FaDog size={28} />, value: 'pet' },
  { label: 'Work from Mountains', icon: <FaLaptopHouse size={28} />, value: 'remote' },
  { label: 'Historical Homes', icon: <FaLandmark size={28} />, value: 'heritage' },
  { label: 'Resorts & Hotels', icon: <FaHotel size={28} />, value: 'resort' },
];

const ExploreByCategory = ({ onSelectCategory }) => {
  return (
    <Container className="my-5">
      <h4 className="mb-4 fw-bold">🔎 Explore by Category</h4>
      <Row>
        {categories.map((cat) => (
          <Col key={cat.value} xs={6} sm={4} md={3} lg={2} className="mb-4">
            <Card
              className="text-center shadow-sm border-0 p-3 h-100 hover-effect"
              style={{ cursor: 'pointer' }}
              onClick={() => onSelectCategory?.(cat.value)}
            >
              <div className="mb-2 text-primary">{cat.icon}</div>
              <div className="fw-semibold">{cat.label}</div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExploreByCategory;
