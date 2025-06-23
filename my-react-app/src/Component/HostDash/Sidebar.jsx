import React from 'react';
import {
  FaHome,
  FaListUl,
  FaCalendarCheck,
  FaMoneyBill,
  FaEnvelope,
  FaUserCog,
} from 'react-icons/fa';

const navItems = [
  { icon: <FaHome />, label: 'Dashboard' },
  { icon: <FaListUl />, label: 'My Listings' },
  { icon: <FaCalendarCheck />, label: 'Bookings' },
  { icon: <FaMoneyBill />, label: 'Earnings' },
  { icon: <FaEnvelope />, label: 'Messages' },
  { icon: <FaUserCog />, label: 'Settings' },
];

const Sidebar = ({ onNavigate }) => (
  <aside className="bg-light border-end d-none d-md-flex flex-column p-4" style={{ width: '250px' }}>
    <h4 className="text-danger fw-bold mb-4">StayFinder</h4>
    <nav className="nav flex-column">
      {navItems.map((item, index) => (
        <button
          key={index}
          onClick={() => onNavigate(item.label)}
          className="btn text-start nav-link d-flex align-items-center mb-2 text-dark"
          style={{ background: 'none', border: 'none' }}
        >
          <span className="me-2">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
