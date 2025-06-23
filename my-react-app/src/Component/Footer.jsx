import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-light text-muted border-top pt-5 pb-3 mt-auto">
      <Container>
        <Row className="mb-4">
          {/* Branding + Description */}
          <Col md={4} sm={12} className="mb-4">
            <h5 className="text-danger fw-bold">StayFinder</h5>
            <p className="small">
              Discover unique stays across India. Book unforgettable experiences with StayFinder.
            </p>

            {/* Social Icons */}
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-reset"><FaFacebook size={20} /></a>
              <a href="#" className="text-reset"><FaInstagram size={20} /></a>
              <a href="#" className="text-reset"><FaTwitter size={20} /></a>
              <a href="#" className="text-reset"><FaYoutube size={20} /></a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col md={2} sm={6} className="mb-4">
            <h6 className="fw-semibold">Explore</h6>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-reset text-decoration-none">About</Link></li>
              <li><Link to="/contact" className="text-reset text-decoration-none">Contact</Link></li>
              <li><Link to="/help" className="text-reset text-decoration-none">Help Center</Link></li>
              <li><Link to="/terms" className="text-reset text-decoration-none">Terms</Link></li>
            </ul>
          </Col>

          {/* Hosting */}
          <Col md={3} sm={6} className="mb-4">
            <h6 className="fw-semibold">Hosting</h6>
            <ul className="list-unstyled">
              <li><Link to="/host" className="text-reset text-decoration-none">Become a Host</Link></li>
              <li><Link to="/host/dashboard" className="text-reset text-decoration-none">Host Dashboard</Link></li>
              <li><Link to="/privacy" className="text-reset text-decoration-none">Privacy Policy</Link></li>
            </ul>
          </Col>

          {/* Newsletter */}
          <Col md={3} sm={12}>
            <h6 className="fw-semibold">Stay Updated</h6>
            <Form className="d-flex flex-column">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                className="rounded-pill mb-2"
              />
              <Button variant="danger" className="rounded-pill">Subscribe</Button>
            </Form>
          </Col>
        </Row>

        <hr />
        <div className="text-center small">
          © {new Date().getFullYear()} StayFinder. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;





