import React from 'react';
import '../style/About.css';

export default function About() {
  return (
    <div className="about-background">
      <div className="about-container">
        <h1>About Us</h1>

        <img
          src="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
          alt="Blood Donation"
          className="about-image"
        />

        <p className="quote">
          "Every drop counts. Your donation can give someone another chance at life."
        </p>

        <p>
          We are a non-profit organization committed to promoting and supporting voluntary blood donation to save lives across the country.
        </p>
        <p>
          Donating blood is not only a humanitarian act but also helps maintain a safe and timely blood supply for hospitals and medical centers. We organize blood donation campaigns, raise public awareness, and support donors throughout the process.
        </p>
        <p>
          Join us to spread love and save lives.
        </p>

        <div className="social-icons" aria-label="Social media links">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
        </div>

        <button className="join-btn" onClick={() => alert('Thank you for your interest!')}>
          Join Us
        </button>
      </div>
    </div>
  );
}
