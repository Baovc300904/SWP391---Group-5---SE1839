import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRequest } from '../../../api/bloodDonationRequestApi';
import { FaUser, FaCalendarAlt, FaCheck } from 'react-icons/fa';
import './BloodRequestForm.css';

export default function BloodRequestForm() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id || 1;
  const userName = user?.name || 'Người dùng';
  const userEmail = user?.email || 'email@example.com';

  const [form, setForm] = useState({
    expectedDonationDate: '',
    donationType: 'Toan_Phan',
    note: '',
    cccd: '',
    medicalHistory: '',
    allergies: '',
    phoneNumber: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRequest({
        requesterId: userId,
        expectedDonationDate: form.expectedDonationDate,
        donationType: form.donationType,
        status: 'Dang_Cho',
        note: form.note,
        requester: { id: userId },
        cccd: form.cccd,
        medicalHistory: form.medicalHistory,
        allergies: form.allergies,
        phoneNumber: form.phoneNumber,
        address: form.address,
        emergencyContact: form.emergencyContact,
        emergencyPhone: form.emergencyPhone,
      });

      alert('✅ Gửi yêu cầu hiến máu thành công!');
      navigate('/profile/donation-request');
    } catch (error) {
      console.error('❌ Gửi yêu cầu thất bại:', error);
      alert('Gửi yêu cầu thất bại! Vui lòng thử lại.');
    }
  };

  const getStepIcon = (step) => {
    switch (step) {
      case 1:
        return <FaUser />;
      case 2:
        return <FaCalendarAlt />;
      case 3:
        return <FaCheck />;
      default:
        return null;
    }
  };

  return (
    <div className="request-form-container mt-5">
      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h5 className="modal-title">Bạn chắc chắn muốn hủy bỏ yêu cầu?</h5>
            <div className="modal-buttons">
              <button onClick={() => navigate('/services/donation-request')} className="btn btn-danger">Đồng ý</button>
              <button onClick={() => setShowModal(false)} className="btn btn-secondary">Hủy bỏ</button>
            </div>
          </div>
        </div>
      )}

      {/* Back button */}
      <div className="request-back-button">
        <button onClick={() => setShowModal(true)} className="back-list-btn btn-warning">Trở về</button>
      </div>

      <h2 className="card-title">Đăng ký hiến máu</h2>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-icons">
          <div className={`step-icon ${currentStep >= 1 ? 'active' : ''}`}>
            {getStepIcon(1)}
          </div>
          <div className="progress-labels">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>Thông tin người dùng</div>
          </div>
          <div className={`step-icon ${currentStep >= 2 ? 'active' : ''}`}>
            {getStepIcon(2)}
          </div>
          <div className="progress-labels">
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>Thông tin hiến máu</div>
          </div>
          <div className={`step-icon ${currentStep === 3 ? 'active' : ''}`}>
            {getStepIcon(3)}
          </div>
          <div className="progress-labels">
            <div className={`step ${currentStep === 3 ? 'active' : ''}`}>Thông tin liên hệ</div>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-step" style={{ width: `${(currentStep / 3) * 100}%` }}></div>
        </div>
      </div>

      {/* Step Description Below Progress Bar */}
      <div className="step-description">
        {currentStep === 1 && <p>Thông tin cá nhân: Cung cấp thông tin cá nhân của bạn như họ tên, ngày sinh, CMND.</p>}
        {currentStep === 2 && <p>Thông tin hiến máu: Cung cấp các thông tin về loại hiến máu và sức khỏe của bạn.</p>}
        {currentStep === 3 && <p>Thông tin liên hệ: Nhập thông tin liên hệ khẩn cấp để chúng tôi có thể liên lạc với bạn khi cần.</p>}
      </div>

      {/* Multi-step form */}
      <form onSubmit={handleSubmit}>
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="form-grid">
            <div className="col-6">
              <div className="input-container">
                <label htmlFor="userName" className="request-form-label">Họ và tên</label>
                <input type="text" id="userName" className="form-control" value={userName} readOnly />
              </div>
              <div className="input-container">
                <label htmlFor="userEmail" className="request-form-label">Email</label>
                <input type="email" id="userEmail" className="form-control" value={userEmail} readOnly />
              </div>
              <div className="input-container">
                <label htmlFor="expectedDonationDate" className="request-form-label">Ngày sinh</label>
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
                <label htmlFor="cccd" className="request-form-label">Số CCCD/CMND</label>
                <input
                  type="text"
                  id="cccd"
                  className="form-control"
                  name="cccd"
                  value={form.cccd}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="bloodType" className="request-form-label">Nhóm máu</label>
                <select
                  id="bloodType"
                  className="form-select"
                  name="bloodType"
                  value={form.bloodType}
                  onChange={handleChange}
                  required
                >
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="O+">O+</option>
                  <option value="AB+">AB+</option>
                  <option value="A-">A-</option>
                  <option value="B-">B-</option>
                  <option value="O-">O-</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            <div className="col-6">
              <div className="row-12">
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
                  <label htmlFor="weight" className="request-form-label">Cân nặng (kg)</label>
                  <input
                    type="number"
                    id="weight"
                    className="form-control"
                    name="weight"
                    value={form.weight}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Medical Information */}
        {currentStep === 2 && (
          <div className="form-grid">
            <div className="col-6">
              <div className="input-container">
                <label htmlFor="medicalHistory" className="request-form-label">Tiền sử bệnh lý</label>
                <textarea
                  className="form-control"
                  id="medicalHistory"
                  name="medicalHistory"
                  rows="3"
                  value={form.medicalHistory}
                  onChange={handleChange}
                />
              </div>
              <div className="input-container">
                <label htmlFor="allergies" className="request-form-label">Dị ứng</label>
                <textarea
                  className="form-control"
                  id="allergies"
                  name="allergies"
                  rows="3"
                  value={form.allergies}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-6">
              {/* You can add additional fields for this section if needed */}
            </div>
          </div>
        )}

        {/* Step 3: Contact Information */}
        {currentStep === 3 && (
          <div className="form-grid">
            <div className="col-6">
              <div className="input-container">
                <label htmlFor="phoneNumber" className="request-form-label">Số điện thoại</label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="address" className="request-form-label">Địa chỉ</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-6">
              <div className="input-container">
                <label htmlFor="emergencyContact" className="request-form-label">Tên người liên hệ khẩn cấp</label>
                <input
                  type="text"
                  className="form-control"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={form.emergencyContact}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="emergencyPhone" className="request-form-label">Số điện thoại khẩn cấp</label>
                <input
                  type="text"
                  className="form-control"
                  id="emergencyPhone"
                  name="emergencyPhone"
                  value={form.emergencyPhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="form-navigation">
          {currentStep > 1 && (
            <button type="button" onClick={handlePrevious} className="back-form-btn btn-secondary">
              Quay lại
            </button>
          )}
          {currentStep < 3 && (
            <button type="button" onClick={handleNext} className="next-form-btn btn-primary">
              Tiếp theo
            </button>
          )}
          {currentStep === 3 && (
            <button type="submit" className="form-submit-btn btn-success">Gửi yêu cầu</button>
          )}
        </div>
      </form>
    </div>
  );
}
