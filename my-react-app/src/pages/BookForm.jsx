import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const BookForm = () => {
  const { id: listingId } = useParams();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    checkIn: null,
    checkOut: null,
    guests: 1,
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phone, checkIn, checkOut, guests } = form;

    if (!name || !phone || !checkIn || !checkOut) {
      return setMessage({ type: 'danger', text: 'Please fill in all required fields.' });
    }

    if (checkOut <= checkIn) {
      return setMessage({ type: 'danger', text: 'Check-out must be after check-in.' });
    }

    const payload = {
      listingId,
      name,
      phone,
      guests,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
    };

    console.log('📦 Payload:', payload);

    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/bookings/`, payload, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (response.status === 201) {
        setMessage({ type: 'success', text: '✅ Booking successful!' });
        setForm({ name: '', phone: '', checkIn: null, checkOut: null, guests: 1 });
      } else {
        setMessage({ type: 'danger', text: 'Booking failed. Please try again.' });
      }
    } catch (err) {
      console.error("❌ Booking error:", err.response?.data || err.message);
      const msg = err?.response?.data?.error || 'Something went wrong. Please try again.';
      setMessage({ type: 'danger', text: msg });
    }

    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center mt-4 mb-5">
      <Card className="p-4 shadow rounded" style={{ maxWidth: '600px', width: '100%' }}>
        <h4 className="fw-bold mb-4 text-center text-primary">🛏️ Book Your Stay</h4>

        {message && (
          <Alert variant={message.type} dismissible onClose={() => setMessage(null)}>
            {message.text}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Full Name</Form.Label>
            <Form.Control
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter your name"
              className="rounded-pill px-3"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Phone Number</Form.Label>
            <Form.Control
              type="tel"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="Enter your phone"
              className="rounded-pill px-3"
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Label className="fw-semibold">Check-In</Form.Label>
              <DatePicker
                selected={form.checkIn}
                onChange={(date) => handleChange('checkIn', date)}
                className="form-control rounded-pill px-3"
                minDate={new Date()}
                placeholderText="Check-in date"
              />
            </Col>
            <Col>
              <Form.Label className="fw-semibold">Check-Out</Form.Label>
              <DatePicker
                selected={form.checkOut}
                onChange={(date) => handleChange('checkOut', date)}
                className="form-control rounded-pill px-3"
                minDate={form.checkIn || new Date()}
                placeholderText="Check-out date"
              />
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Guests</Form.Label>
            <Form.Select
              className="rounded-pill px-3"
              value={form.guests}
              onChange={(e) => handleChange('guests', parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((g) => (
                <option key={g} value={g}>
                  {g} Guest{g > 1 ? 's' : ''}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 rounded-pill py-2 fw-bold"
            disabled={loading}
          >
            {loading ? 'Booking...' : 'Book Now'}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default BookForm;
