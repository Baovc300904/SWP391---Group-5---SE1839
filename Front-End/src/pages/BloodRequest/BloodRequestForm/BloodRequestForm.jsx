import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createRequest } from '../../../api/bloodDonationRequestApi';
import './BloodRequestForm.css';

export default function BloodRequestForm() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id || 1;
  const userName = user?.name || 'Người dùng';
  const userEmail = user?.email || 'email@example.com';

  const [form, setForm] = useState({
    expectedDonationDate: '',
    donationType: 'Toan_Phan', // Default to "Toàn phần"
    note: '',
  });

  const [showModal, setShowModal] = useState(false);  // To control the modal visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRequest({
        requesterId: userId,
        expectedDonationDate: form.expectedDonationDate,
        donationType: form.donationType,
        status: 'Dang_Cho', // Default status
        note: form.note,
        requester: {
          id: userId,
        },
      });

      alert('✅ Gửi yêu cầu hiến máu thành công!');
      navigate('/profile/donation-request'); // Redirect after submission
    } catch (error) {
      console.error('❌ Gửi yêu cầu thất bại:', error);
      alert('Gửi yêu cầu thất bại! Vui lòng thử lại.');
    }
  };

  // Open the confirmation modal
  const openModal = () => {
    setShowModal(true);
  };

  // Close the confirmation modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Cancel the request and navigate back
  const confirmCancel = () => {
    setShowModal(false);
    navigate('/services/donation-request');  // Redirect to the list of donation requests
  };

  return (
    <div className="request-form-container mt-5">
      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h5 className="modal-title">Bạn chắn chắn muốn hủy bỏ yêu cầu?</h5>
            <div className="modal-buttons">
              <button onClick={confirmCancel} className="btn btn-danger">Đồng ý</button>
              <button onClick={closeModal} className="btn btn-secondary">Hủy bỏ</button>
            </div>
          </div>
        </div>
      )}

      {/* Back button */}
      <div className="request-back-button">
        <button onClick={openModal} className="btn btn-warning">Trở về</button>
      </div>

      <h2 className="card-title">Đăng ký hiến máu</h2>

      {/* User info */}
      <div className="user-info mb-4">
        <div className="input-container">
          <label htmlFor="userName" className="request-form-label">Tên người dùng</label>
          <input
            type="text"
            id="userName"
            className="form-control"
            value={userName}
            readOnly
          />
        </div>
        <div className="input-container">
          <label htmlFor="userEmail" className="request-form-label">Email</label>
          <input
            type="email"
            id="userEmail"
            className="form-control"
            value={userEmail}
            readOnly
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="expectedDonationDate" className="request-form-label">Ngày hiến máu dự kiến</label>
          <input
            type="date"
            className="form-control"
            id="expectedDonationDate"
            name="expectedDonationDate"
            required
            value={form.expectedDonationDate}
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <label htmlFor="donationType" className="request-form-label">Loại hiến</label>
          <select
            className="form-select"
            id="donationType"
            name="donationType"
            value={form.donationType}
            onChange={handleChange}
          >
            <option value="Toan_Phan">Toàn phần</option>
            <option value="Hong_Cau">Hồng cầu</option>
            <option value="Huyet_Tuong">Huyết tương</option>
            <option value="Tieu_Cau">Tiểu cầu</option>
          </select>
        </div>

        <div className="input-container">
          <label htmlFor="note" className="request-form-label">Ghi chú (tùy chọn)</label>
          <textarea
            className="form-control"
            id="note"
            name="note"
            rows="3"
            value={form.note}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Gửi yêu cầu</button>
      </form>
    </div>
  );
}
