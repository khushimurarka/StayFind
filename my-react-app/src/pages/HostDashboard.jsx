import React, { useRef, useState } from 'react';
import Sidebar from '../Component/HostDash/Sidebar';
import Listings from '../Component/HostDash/Listings';
import Bookings from '../Component/HostDash/Bookings';
import Earnings from '../Component/HostDash/Earnings';
import Messages from '../Component/HostDash/Messages';
import Settings from '../Component/HostDash/Settings';
import { Row, Col, Card, Modal, Button, Form } from 'react-bootstrap';

const hostName = "Anjali";

const HostDashboard = () => {
  const dashboardRef = useRef(null);
  const listingsRef = useRef(null);
  const bookingsRef = useRef(null);
  const earningsRef = useRef(null);
  const messagesRef = useRef(null);
  const settingsRef = useRef(null);

  const [listings, setListings] = useState([
    {
      title: 'Cozy Apartment in Bangalore',
      status: 'Active',
      price: 2200,
      image: 'https://source.unsplash.com/150x100/?apartment',
    },
  ]);

  const [bookings] = useState([
    {
      guest: 'Ravi Mehta',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      listing: 'Cozy Apartment in Bangalore',
      checkin: 'Jun 25',
      checkout: 'Jun 28',
      status: 'Confirmed',
    },
  ]);

  const [modalData, setModalData] = useState({ show: false, mode: 'add', index: null });
  const [listingForm, setListingForm] = useState({
    title: '',
    status: 'Active',
    price: '',
    image: '',
  });

  const scrollToSection = (section) => {
    const refs = {
      Dashboard: dashboardRef,
      'My Listings': listingsRef,
      Bookings: bookingsRef,
      Earnings: earningsRef,
      Messages: messagesRef,
      Settings: settingsRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddClick = () => {
    setListingForm({ title: '', status: 'Active', price: '', image: '' });
    setModalData({ show: true, mode: 'add', index: null });
  };

  const handleEditClick = (index) => {
    setListingForm({ ...listings[index] });
    setModalData({ show: true, mode: 'edit', index });
  };

  const handleViewClick = (index) => {
    setListingForm({ ...listings[index] });
    setModalData({ show: true, mode: 'view', index });
  };

  const handleDeleteClick = (index) => {
    setListings(listings.filter((_, i) => i !== index));
  };

  const handleModalSave = () => {
    if (modalData.mode === 'add') {
      setListings([...listings, listingForm]);
    } else if (modalData.mode === 'edit' && modalData.index !== null) {
      const updated = [...listings];
      updated[modalData.index] = listingForm;
      setListings(updated);
    }
    setModalData({ show: false, mode: 'add', index: null });
  };

  return (
    <div className="d-flex min-vh-100">
      <Sidebar onNavigate={scrollToSection} />

      <main className="flex-grow-1 px-4 py-4 bg-white">
        <h4 className="fw-bold mb-3">Welcome, {hostName} 👋</h4>

        <section ref={dashboardRef} className="mb-5">
          <h5 className="fw-bold mb-3">Dashboard</h5>
          <Row className="g-3">
            {[
              { icon: '🏘️', label: 'Total Listings', value: listings.length },
              { icon: '📅', label: 'Upcoming Bookings', value: bookings.length },
              { icon: '💰', label: 'Monthly Earnings', value: '₹24,000' },
              { icon: '📨', label: 'New Messages', value: 2 },
            ].map((stat, idx) => (
              <Col md={6} lg={3} key={idx}>
                <Card className="shadow-sm border-0 rounded-4 hover-shadow">
                  <Card.Body className="d-flex align-items-center gap-3">
                    <div className="bg-danger text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: 40, height: 40 }}>
                      <span>{stat.icon}</span>
                    </div>
                    <div>
                      <h6 className="mb-1">{stat.label}</h6>
                      <h5 className="fw-bold mb-0">{stat.value}</h5>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section ref={listingsRef} className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold">My Listings</h5>
            <Button variant="outline-success" onClick={handleAddClick}>+ Add Listing</Button>
          </div>
          <Listings
            data={listings}
            onDelete={handleDeleteClick}
            onEdit={handleEditClick}
            onView={handleViewClick}
          />
        </section>

        <section ref={bookingsRef} className="mb-5">
          <Bookings data={bookings} />
        </section>

        <section ref={earningsRef} className="mb-5">
          <Earnings />
        </section>

        <section ref={messagesRef} className="mb-5">
          <Messages />
        </section>

        <section ref={settingsRef} className="mb-5">
          <Settings />
        </section>
      </main>

      {/* Add/Edit/View Listing Modal */}
      <Modal show={modalData.show} onHide={() => setModalData({ ...modalData, show: false })} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalData.mode === 'add'
              ? 'Add Listing'
              : modalData.mode === 'edit'
              ? 'Edit Listing'
              : 'Listing Details'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={listingForm.title}
                disabled={modalData.mode === 'view'}
                onChange={(e) => setListingForm({ ...listingForm, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={listingForm.image}
                disabled={modalData.mode === 'view'}
                onChange={(e) => setListingForm({ ...listingForm, image: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={listingForm.price}
                disabled={modalData.mode === 'view'}
                onChange={(e) => setListingForm({ ...listingForm, price: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        {modalData.mode !== 'view' && (
          <Modal.Footer>
            <Button variant="primary" onClick={handleModalSave}>
              Save
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default HostDashboard;

