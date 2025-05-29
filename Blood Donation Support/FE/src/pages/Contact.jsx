import React, { useState } from 'react';
import '../style/Contact.css'; // remember to create this file using the suggested styles below

export default function Contact() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Handle form submission here, e.g., API call...
    setSubmitted(true);
  }

  return (
    <div className="background-wrapper">
      <div className="content-wrapper">
        <h2 className="title">Blood Donation Support</h2>
        <p className="description">
          Share love, save lives in need.<br />
          Please leave your contact information so we can reach out to you!
        </p>

        {!submitted ? (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="fullname">Full Name</label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullname}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{9,15}"
              title="Phone number should contain 9 to 15 digits only"
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="What would you like to share?"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn-submit">
              Submit
            </button>
          </form>
        ) : (
          <div className="thank-you-message">
            <h3>Thank you for reaching out!</h3>
            <p>We will contact you as soon as possible.</p>
          </div>
        )}
      </div>
    </div>
  );
}
