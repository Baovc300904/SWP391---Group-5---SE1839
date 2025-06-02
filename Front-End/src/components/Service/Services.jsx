import React from 'react';
import './Services.css'; // nhớ tạo CSS nếu muốn style đẹp hơn

import AppLayout from '../../layouts/AppLayout';
import Footer from '../Footers/Footer';

export default function Services() {
  return (
    <>
    <AppLayout />
    <div className="services-container">
      <h1>Our Blood Donation Support Services</h1>
      <p className="intro">
        We provide a variety of services to support voluntary blood donation and community health.
      </p>

      <div className="service-list">
        <div className="service-card">
          <h3>🩸 Blood Donation Events</h3>
          <p>
            We organize regular blood donation campaigns across the country in collaboration with hospitals and local authorities.
          </p>
        </div>

        <div className="service-card">
          <h3>📞 Donor Support Hotline</h3>
          <p>
            Our 24/7 hotline is available to answer any questions and provide guidance for first-time or returning donors.
          </p>
        </div>

        <div className="service-card">
          <h3>🎓 Education & Awareness</h3>
          <p>
            We conduct workshops and seminars to raise awareness about the importance of blood donation in saving lives.
          </p>
        </div>

        <div className="service-card">
          <h3>💳 Donor Recognition</h3>
          <p>
            Donors receive digital certificates and small gifts as appreciation for their contribution to the community.
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
