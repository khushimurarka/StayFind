


import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Component/Header';
import HomePage from './pages/HomePage';
import LoginPage from './Component/LoginPage';
import RegisterPage from './Component/RegisterPage';
import ListingDetails from './pages/ListingDetails';
import Bookings from './Component/HostDash/Bookings'; // Booking UI for a specific listing (Host dashboard)
import HostDashboard from './pages/HostDashboard';
import BookForm from './pages/BookForm';
// import Footer from './Component/Footer'; // Optional
// import NotFound from './pages/NotFound'; // Optional 404 page

const App = () => {
  return (
    <>
      {/* Global Header */}
     

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Listing Details (Customer view) */}
        <Route path="/listing/:id" element={<ListingDetails />} />

        {/* Booking Form - optional standalone use */}
        <Route path="/book/:id" element={<BookForm />} />

        {/* Host Dashboard */}
         <Route path="/host/dashboard/:id" element={<Bookings />} />
        <Route path="/host/dashboard" element={<HostDashboard/>} />

        {/* Host Booking view for a specific listing */}
       

        {/* Optional catch-all 404 route */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      {/* <Footer /> */}
    </>
  );
};

export default App;
