import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // ✅ Send cookies for session authentication
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/'); // Redirect to dashboard on success
      } else {
        setErrorMessage(data.error || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', display: 'flex', alignItems: 'center' }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={6} lg={5}>
            <Card className="shadow-lg border-0 rounded-4 p-4">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-danger">Welcome Back</h2>
                <p className="text-muted">Please login to your account</p>
              </div>

              <Form onSubmit={handleSubmit}>
                {errorMessage && (
                  <div className="text-danger text-center mb-3">{errorMessage}</div>
                )}

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="rounded-3"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className="rounded-start-3"
                    />
                    <Button
                      variant="outline-secondary"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="rounded-end-3"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                </Form.Group>

                <Button
                  type="submit"
                  variant="danger"
                  className="w-100 rounded-3 py-2 fw-semibold"
                  disabled={loading}
                >
                  {loading ? <Spinner size="sm" animation="border" /> : 'Login'}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <small className="text-muted">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-decoration-none text-danger fw-semibold">
                    Sign Up
                  </Link>
                </small>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;

