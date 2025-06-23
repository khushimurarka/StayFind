import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookForm from '../../pages/BookForm'; // Adjust path if needed

const Bookings = () => {
  const { id: listingId } = useParams(); // Expects route: /host/dashboard/:id

  const [listing, setListing] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingError, setBookingError] = useState(null);

  const fetchListing = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/listing/${listingId}/`);
      if (!res.data || Object.keys(res.data).length === 0) {
        setError('Listing not found.');
      } else {
        setListing(res.data);
      }
    } catch (err) {
      console.error('Error fetching listing:', err);
      setError('Could not load the listing. Please try again later.');
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/bookings/listing/${listingId}/`);
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setBookingError('Could not load bookings.');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (!listingId) {
        setError('No listing ID provided in URL.');
        setLoading(false);
        return;
      }

      setLoading(true);
      await fetchListing();
      await fetchBookings();
      setLoading(false);
    };

    loadData();
  }, [listingId]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
        <p className="mt-2">Loading listing details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        {/* Listing Details */}
        <Col md={6} className="mb-4">
          <Card className="shadow-sm border-0">
            <Card.Img
              variant="top"
              src={listing.image || '/default-listing.jpg'}
              alt={listing.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-listing.jpg';
              }}
            />
            <Card.Body>
              <Card.Title>{listing.title}</Card.Title>
              <Card.Text>{listing.description}</Card.Text>
              <Card.Text><strong>Location:</strong> {listing.location}</Card.Text>
              <Card.Text><strong>Price:</strong> ₹{listing.price} / night</Card.Text>
              <Card.Text><strong>Rating:</strong> ⭐ {listing.rating}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Booking Form & Existing Bookings */}
        <Col md={6}>
          <BookForm listingId={listingId} />

          {bookingError && <Alert variant="warning" className="mt-3">{bookingError}</Alert>}

          {bookings.length === 0 ? (
            <Card className="mt-4 shadow-sm">
              <Card.Body>
                <Card.Title>No Bookings Yet</Card.Title>
                <Card.Text>This listing hasn’t been booked yet.</Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <Card className="mt-4 shadow-sm">
              <Card.Body>
                <Card.Title>Previous Bookings</Card.Title>
                <ul className="list-unstyled">
                  {bookings.map((b, index) => (
                    <li key={index}>
                      <strong>{b.name}</strong> booked from{' '}
                      {new Date(b.check_in).toLocaleDateString()} to{' '}
                      {new Date(b.check_out).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Bookings;

