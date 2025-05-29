import React, { useState } from 'react';
import '../style/Signup.css';  // Correct path to your CSS file

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Validate & send signup data
    if (formData.password !== formData.confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }
    alert("Signup successful!");
  };

  return (
    <div className="signupUnique-wrapper">
      <form className="signupUnique-form" onSubmit={handleSubmit}>
        <h2 className="signupUnique-title">Sign Up</h2>

        <label className="signupUnique-label" htmlFor="username">Username</label>
        <input
          className="signupUnique-input"
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          required
          autoComplete="username"
        />

        <label className="signupUnique-label" htmlFor="email">Email</label>
        <input
          className="signupUnique-input"
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />

        <label className="signupUnique-label" htmlFor="password">Password</label>
        <input
          className="signupUnique-input"
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />

        <label className="signupUnique-label" htmlFor="confirmPassword">Confirm Password</label>
        <input
          className="signupUnique-input"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Re-enter your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />

        <button className="signupUnique-submit" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
