import React from 'react';
import { FaHeartbeat } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './About.css';


import AppLayout from '../../Layouts/AppLayout';
import Footer from '../Footers/Footer';

export default function About() {
  return (
    <>
      <AppLayout />

      <div className="about-section">
        <div className="about-wrapper">
          <div className="about-content">
            <h1><FaHeartbeat className="heartbeat-icon" /> About Us</h1>

            <p className="about-quote">
              "Every drop counts. Your donation can give someone another chance at life."
            </p>

            <p>
              We are a non-profit organization dedicated to encouraging and supporting voluntary blood donations to save lives across the country.
            </p>
            <p>
              Our mission is to ensure a stable, safe, and timely blood supply for hospitals and patients in need. We organize blood drives, raise awareness, and provide support for donors at every step of the way.
            </p>
            <p>
              Join our community of heroes and help save lives — one drop at a time.
            </p>

            <div className="about-contact-section">
              <button className="join-btn" onClick={() => alert('Thank you for your interest!')}>
                Become a Donor
              </button>

              <Link to="/contact" className="contact-link">
              Contact us
              </Link>
            </div>
          </div>

          <div className="about-image-container">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
              alt="Blood Donation"
              className="about-image"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
