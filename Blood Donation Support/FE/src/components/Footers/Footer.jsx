import React from 'react';
import './Footer.css';

// Import icon từ react-icons
import { FaFacebookF, FaInstagram, FaGithub, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            The Blood Donation Support System is a platform that connects blood donors, volunteers, and hospitals to help save more lives every day.
          </p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/donate">Donate Blood</a></li>
            <li><a href="/campaigns">Campaigns</a></li>
            <li><a href="/volunteer">Volunteer</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: support@blooddonation.org</p>
          <p>Hotline: 1900 123 456</p>
          <p>Address: 123 Medical Street, District 1, Ho Chi Minh City</p>

          {/* Thêm phần social icons */}
          <div className="footer-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://github.com/AnhKhoaa157" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Blood Donation Support System. Share to save lives.</p>
      </div>
    </footer>
  );
}
