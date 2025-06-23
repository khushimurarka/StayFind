// ListingCard.js
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars'; // Optional component

const ListingCard = ({ listing }) => {
  const getImageSrc = () => {
    if (!listing.image) return '/no-image.jpg';
    return listing.image.startsWith('http') ? listing.image : `/uploads/${listing.image}`;
  };

  return (
    <Card className="shadow-sm border-0 h-100">
      <Link to={`/listing/${listing._id}`}>
        <Card.Img
          variant="top"
          src={getImageSrc()}
          alt={listing.title}
          loading="lazy"
          style={{ height: '200px', objectFit: 'cover' }}
          onError={(e) => (e.target.src = '/no-image.jpg')}
        />
      </Link>

      <Card.Body>
        <Card.Title className="fs-6 fw-bold mb-1">{listing.title}</Card.Title>
        <Card.Text className="text-muted mb-1">{listing.location}</Card.Text>
        <Card.Text className="text-danger fw-semibold mb-2">
          ₹{listing.price} / night
        </Card.Text>

        <div style={{ fontSize: '0.9rem' }}>
          <RatingStars rating={listing.rating} totalStars={5} size={16} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ListingCard;
