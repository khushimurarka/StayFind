import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import ListingCard from '../Component/ListingCard';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import Slider from '../Component/Slider';
import Collabrate from '../Component/Collabrate-ui';
import ExploreByCategory from '../Component/ExploreByCategory';

const HomePage = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // ✅ Safe usage of houses array
  const locations = Array.isArray(houses)
    ? [...new Set(houses.map((house) => house.location))]
    : [];

  const filteredListings = Array.isArray(houses)
    ? houses.filter((house) => {
        const locationMatch = selectedLocation
          ? house.location === selectedLocation
          : true;
        const priceMatch = maxPrice
          ? house.price <= parseInt(maxPrice)
          : true;
        return locationMatch && priceMatch;
      })
    : [];

  useEffect(() => {
    fetch('http://localhost:8000/api/houses/')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.houses)) {
          setHouses(data.houses);
        } else {
          console.error('Invalid API response format:', data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching house data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <Slider />
      <Container className="my-4">
        <h2 className="mb-3 fw-bold">Explore Nearby Stays</h2>

        {/* Filter Section */}
        <Form className="m-4">
          <Row className="gy-2 gx-3 align-items-center">
            <Col xs={12} sm={6} md={4}>
              <Form.Select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map((loc, i) => (
                  <option key={i} value={loc}>
                    {loc}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <Form.Control
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </Col>
          </Row>
        </Form>

        {/* Listings Grid */}
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {loading ? (
            <Col>
              <p>Loading listings...</p>
            </Col>
          ) : filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <Col key={listing._id}>
                <ListingCard listing={listing} />
              </Col>
            ))
          ) : (
            <Col>
              <p>No listings match your filter criteria.</p>
            </Col>
          )}
        </Row>
      </Container>

      <Collabrate />
      <ExploreByCategory />
      <Footer />
    </>
  );
};

export default HomePage;
