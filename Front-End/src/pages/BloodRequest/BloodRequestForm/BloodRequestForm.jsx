import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRequest } from '../../../api/bloodDonationRequestApi';
import './BloodRequestForm.css'; // Assuming you have a CSS file for styling

export default function BloodRequestForm() {
  const navigate = useNavigate();

  // Assuming the user is already authenticated and their data is available
  const userId = 1; // Replace with actual user ID (from context or auth state)

  const [form, setForm] = useState({
    expectedDonationDate: '',
    donationType: 'Toan_Phan',
    note: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Adding requesterId and constructing the requester object
      await createRequest({
        requesterId: userId,
        expectedDonationDate: form.expectedDonationDate,
        donationType: form.donationType,
        status: 'Dang_Cho', // Default status
        note: form.note,
        requester: {
          id: userId, // Assuming requester has an ID, use dynamic user ID
        },
      });

      alert('✅ Gửi yêu cầu hiến máu thành công!');
      navigate('/profile/donation-request');
    } catch (error) {
      console.error('❌ Gửi yêu cầu thất bại:', error);
      alert('Gửi yêu cầu thất bại! Vui lòng thử lại.');
    }
  };

  return (
    <div className="request-form-container mt-5">
      <h2 className="mb-4">Đăng ký hiến máu</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="expectedDonationDate" className="form-label">Ngày hiến máu dự kiến</label>
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

        <div className="mb-3">
          <label htmlFor="donationType" className="form-label">Loại hiến</label>
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

        <div className="mb-3">
          <label htmlFor="note" className="form-label">Ghi chú (tùy chọn)</label>
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
