import React from 'react';
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaGlobe } from 'react-icons/fa';

const Header = () => {
  return (
    <Navbar expand="lg" bg="light" variant="light" className="shadow-sm sticky-top py-2">
      <Container fluid>
        {/* Brand Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bold text-danger fs-4">
          StayFinder
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          {/* Center Search Bar */}
          <Form className="d-flex mx-auto my-3 my-lg-0" style={{ maxWidth: '500px', width: '100%' }}>
            <FormControl
              type="search"
              placeholder="Search destinations"
              className="me-2 rounded-pill"
              aria-label="Search"
            />
            <Button variant="danger" className="rounded-pill px-4">Search</Button>
          </Form>

          {/* Right Section */}
          <Nav className="ms-auto align-items-center gap-2">
            {/* Host Button */}
            <Nav.Link as={Link} to="/host/dashboard" className="fw-medium">
              Become a Host
            </Nav.Link>

            {/* Language/Currency */}
            <NavDropdown title={<FaGlobe size={18} />} id="language-dropdown">
              <NavDropdown.Item>INR - ₹</NavDropdown.Item>
              <NavDropdown.Item>USD - $</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>English</NavDropdown.Item>
              <NavDropdown.Item>हिंदी</NavDropdown.Item>
            </NavDropdown>

            {/* User/Profile */}
            <NavDropdown
              title={<FaUserCircle size={22} />}
              id="user-dropdown"
              align="end"
              className="fw-medium"
            >
              <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/host/dashboard">Host Dashboard</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

