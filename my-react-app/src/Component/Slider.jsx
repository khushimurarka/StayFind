// src/components/Slider.jsx
import React from 'react';
import { Carousel } from 'react-bootstrap';

const Slider = () => {
  return (
    <Carousel fade interval={2000}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.gettyimages.com/id/1254871777/photo/modern-minimalist-family-villa.jpg?s=612x612&w=0&k=20&c=IFWrSPJVEajIvY0fkcTDYf93fJvn2oISiiZY6B5GlCI="
          alt="First slide"
          style={{ height: '60vh', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>Explore Beachfront Villas</h3>
          <p>Book your stay by the sea</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.gettyimages.com/id/1322138245/photo/modern-family-villa.jpg?s=612x612&w=0&k=20&c=tdIUHLnyJrkACJKeIEcpwONjAJhsSwbt_LAzuk8uPH4="
          alt="Second slide"
          style={{ height: '60vh', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>Escape to the Hills</h3>
          <p>Find peaceful mountain retreats</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.gettyimages.com/id/1516938157/photo/3d-rendering-of-forest-house-during-sunset.jpg?s=612x612&w=0&k=20&c=OsRK3E77S3n1WlJCYtuGCZJEx7s9KK9PD69em2vGKsQ="
          alt="Third slide"
          style={{ height: '60vh', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>Stay in Urban Comfort</h3>
          <p>Modern apartments in bustling cities</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
