import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container-fluid">
        {/* Company Name - Agriwise */}
        <Link className="navbar-brand fs-4 fw-bold text-success" to="/">
          <img src="src/assets/Logo.png" alt="Agriwise Logo" style={{ height: '70px' }} />
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-dark fs-5" to="/chatbot">
                Chatbot
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fs-5" to="/open-market">
                Open Market
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fs-5" to="/user-form">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fs-5" to="/price-prediction">
                Price Prediction
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
