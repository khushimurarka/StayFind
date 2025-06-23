import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Carousel, Button, Badge, Card, Modal, Form,
} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import RatingStars from '../Component/RatingStars';
import DatePicker from 'react-datepicker';
import {
  FaWifi, FaSnowflake, FaTv, FaSwimmer, FaDog, FaKey,
  FaCoffee, FaHeadset, FaLaptopHouse,
} from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '../Component/Header';
import axios from 'axios';

const iconMap = {
  'Free Wi-Fi': <FaWifi />,
  'Air Conditioning': <FaSnowflake />,
  'Smart TV': <FaTv />,
  'Private Pool': <FaSwimmer />,
  'Pet Friendly': <FaDog />,
  'Self Check-in': <FaKey />,
  'Breakfast included': <FaCoffee />,
  '24/7 Support': <FaHeadset />,
  'Workspace': <FaLaptopHouse />,
};

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showAllOffers, setShowAllOffers] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const [newReview, setNewReview] = useState({
    user: '',
    rating: 5,
    comment: '',
    date: '',
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
      const res = await axios.get(`http://localhost:8000/api/listing/${id}/`);
        const data = res.data;

        // Safe fallbacks
        data.reviews = data.reviews || [];
        data.amenities = data.amenities || [];
        data.images = data.images || [data.image];
        data.offers = data.offers || {};

        // Attach icons
        Object.keys(data.offers).forEach((group) => {
          data.offers[group] = data.offers[group].map((item) => ({
            ...item,
            icon: iconMap[item.label] || <FaWifi />,
          }));
        });

        setListing(data);
      } catch (err) {
        console.error('Error fetching listing:', err);
        setError('Could not load listing details.');
      }
    };

    fetchListing();
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const today = new Date();
    const formattedDate = today.toLocaleString('default', { month: 'short', year: 'numeric' });

    const review = {
      ...newReview,
      date: formattedDate,
    };

    setListing((prev) => ({
      ...prev,
      reviews: [...prev.reviews, review],
    }));

    setNewReview({ user: '', rating: 5, comment: '', date: '' });
    setShowModal(false);
  };

  const handleBookNow = () => {
    navigate(`/book/${id}`);
  };

  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;
  if (!listing) return <p className="text-center mt-5">Loading listing details...</p>;

  return (
    <>
      <Header />
      <Container className="py-5">
        <Row className="g-5">
          <Col lg={7}>
            <Carousel fade>
              {listing.images.map((img, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100 rounded"
                    src={img}
                    alt={`Slide ${index + 1}`}
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>

          <Col lg={5}>
            <h3 className="fw-bold">{listing.title}</h3>
            <p className="text-muted">{listing.location}</p>
            <div className="d-flex align-items-center gap-2 mb-3">
              <RatingStars rating={listing.rating} />
              <span className="text-muted">({listing.rating})</span>
            </div>

            <h4 className="text-danger fw-semibold mb-3">₹{listing.price} / night</h4>
            <p className="mb-3">{listing.description}</p>

            <h6>Amenities</h6>
            <div className="d-flex flex-wrap gap-2 mb-3">
              {listing.amenities.map((a, i) => (
                <Badge pill bg="light" text="dark" className="shadow-sm" key={i}>
                  {a}
                </Badge>
              ))}
            </div>

            <h6>Booking Date</h6>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="form-control mb-3"
            />

            <Button variant="danger" className="rounded-pill w-100" onClick={handleBookNow}>
              Book Now
            </Button>
          </Col>
        </Row>

        {/* What this place offers */}
        <Row className="mt-5">
          <Col>
            <h5 className="mb-4">🛎️ What this place offers</h5>
            {Object.entries(listing.offers)
              .slice(0, showAllOffers ? undefined : 2)
              .map(([group, features]) => (
                <div key={group} className="mb-4">
                  <h6 className="fw-bold">{group}</h6>
                  <div className="d-flex flex-wrap gap-3 mt-2">
                    {features.map((item, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center gap-2 bg-light border px-3 py-2 rounded-pill shadow-sm"
                      >
                        <span className="text-primary">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            {Object.keys(listing.offers).length > 2 && (
              <Button
                variant="link"
                className="px-0 mt-2"
                onClick={() => setShowAllOffers(!showAllOffers)}
              >
                {showAllOffers ? 'Show Less' : 'Show More'}
              </Button>
            )}
          </Col>
        </Row>

        {/* Reviews */}
        <Row className="mt-5">
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5>⭐ Guest Reviews</h5>
              <Button variant="outline-primary" onClick={() => setShowModal(true)}>
                Write a Review
              </Button>
            </div>

            {listing.reviews.length === 0 ? (
              <p>No reviews yet. Be the first to leave one!</p>
            ) : (
              listing.reviews
                .slice(0, showAllReviews ? undefined : 2)
                .map((review, idx) => (
                  <Card key={idx} className="mb-4 shadow-sm border-0">
                    <Card.Body>
                      <div className="d-flex justify-content-between">
                        <strong>{review.user}</strong>
                        <div className="text-warning">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span key={i}>
                              {i < review.rating ? '★' : <span className="text-muted">★</span>}
                            </span>
                          ))}
                        </div>
                      </div>
                      <small className="text-muted">{review.date}</small>
                      <p className="mt-2 mb-0">{review.comment}</p>
                    </Card.Body>
                  </Card>
                ))
            )}

            {listing.reviews.length > 2 && (
              <Button
                variant="link"
                className="px-0"
                onClick={() => setShowAllReviews(!showAllReviews)}
              >
                {showAllReviews ? 'Show Less' : 'Show More'}
              </Button>
            )}
          </Col>
        </Row>

        {/* Review Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Write a Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleReviewSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newReview.user}
                  required
                  onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                >
                  {[5, 4, 3, 2, 1].map((num) => (
                    <option key={num} value={num}>
                      {num} Star{num > 1 && 's'}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newReview.comment}
                  required
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Submit Review
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default ListingDetails;
