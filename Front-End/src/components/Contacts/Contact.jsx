import React, { useState } from 'react';
import './Contact.css';
import AppLayout from '../../layouts/AppLayout';
import Footer from '../Footers/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullname.trim()) newErrors.fullname = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format.";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^[0-9]{9,15}$/.test(formData.phone)) newErrors.phone = "Phone must be 9-15 digits.";

    if (!formData.subject.trim()) newErrors.subject = "Please select a subject.";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Replace with API call here
      setSubmitted(true);
    }
  };

  const handleNewMessage = () => {
    setFormData({
      fullname: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <>
      <AppLayout />
      <div className="contact-container">
        <div className="contact-content">
          <h2 className="contact-title">Blood Donation Support</h2>
          <p className="contact-description">
            Share love, save lives.<br />
            Leave your contact and message. We’ll reach out to you!
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
              />
              {errors.fullname && <span className="error">{errors.fullname}</span>}

              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}

              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}

              <label htmlFor="subject">Subject</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="">-- Select a subject --</option>
                <option value="donation">I want to donate blood</option>
                <option value="request">I need blood</option>
                <option value="volunteer">I want to volunteer</option>
                <option value="feedback">Feedback / Other</option>
              </select>
              {errors.subject && <span className="error">{errors.subject}</span>}

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="What would you like to share?"
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && <span className="error">{errors.message}</span>}

              <button type="submit" className="contact-btn">Submit</button>
            </form>
          ) : (
            <div className="contact-thank-you">
              <h3>Thank you for reaching out!</h3>
              <p>We will contact you as soon as possible.</p>
              <button onClick={handleNewMessage} className="contact-btn">Send another message</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
