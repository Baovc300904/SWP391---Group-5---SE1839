import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { createRequest } from "../../../../services/api/bloodDonationRequest";
import { FaUser, FaCalendarAlt, FaCheck, FaSpinner, FaExclamationTriangle, FaHeart } from "react-icons/fa";
import { Input, Button } from "../../../../components/ui";
import "./BloodRequestForm.css";

// Constants
const BLOOD_TYPES = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"];
const DONATION_TYPES = [
  { value: "Toan_Phan", label: "Toàn phần" },
  { value: "Hong_Cau", label: "Hồng cầu" },
  { value: "Huyet_Tuong", label: "Huyết tương" },
  { value: "Tieu_Cau", label: "Tiểu cầu" }
];

const FORM_STEPS = {
  PERSONAL: 1,
  MEDICAL: 2,
  CONTACT: 3
};

const INITIAL_FORM = {
  expectedDonationDate: "",
  donationType: "Toan_Phan",
  note: "",
  cccd: "",
  bloodType: "A+",
  weight: "",
  medicalHistory: "",
  allergies: "",
  phoneNumber: "",
  address: "",
  emergencyContact: "",
  emergencyPhone: "",
};

/**
 * Renders a multi-step blood donation request form with validation, local persistence, and asynchronous submission.
 *
 * The form guides users through personal information, medical history, and emergency contact details, validating required fields at each step. Form data is auto-saved to localStorage and restored on reload. On successful submission, the request is sent to the backend and the user is redirected to their donation request profile.
 */
export default function BloodRequestForm() {
  const navigate = useNavigate();
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")) || {}, []);
  const userId = user.id || 1;

  const [form, setForm] = useState(INITIAL_FORM);
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Auto-save form data to localStorage
  useEffect(() => {
    const savedForm = localStorage.getItem("bloodRequestForm");
    if (savedForm) {
      setForm(JSON.parse(savedForm));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bloodRequestForm", JSON.stringify(form));
  }, [form]);

  // Validation rules
  const validateField = useCallback((name, value) => {
    switch (name) {
      case "cccd":
        if (!value) return "Số CCCD/CMND là bắt buộc";
        if (!/^\d{9}$|^\d{12}$/.test(value)) return "CCCD phải có 9 hoặc 12 số";
        return "";
      case "weight":
        if (!value) return "Cân nặng là bắt buộc";
        if (value < 45) return "Cân nặng tối thiểu là 45kg để hiến máu";
        if (value > 200) return "Vui lòng nhập cân nặng hợp lệ";
        return "";
      case "phoneNumber":
      case "emergencyPhone":
        if (!value) return "Số điện thoại là bắt buộc";
        if (!/^(0[3|5|7|8|9])+([0-9]{8})$/.test(value)) return "Số điện thoại không hợp lệ";
        return "";
      case "address":
        if (!value) return "Địa chỉ là bắt buộc";
        if (value.length < 10) return "Địa chỉ quá ngắn";
        return "";
      case "emergencyContact":
        if (!value) return "Người liên hệ khẩn cấp là bắt buộc";
        if (value.length < 2) return "Tên quá ngắn";
        return "";
      case "expectedDonationDate":
        if (!value) return "Ngày hiến máu dự kiến là bắt buộc";
        const selectedDate = new Date(value);
        const today = new Date();
        const minDate = new Date(today.getTime() + 24 * 60 * 60 * 1000); // Tomorrow
        if (selectedDate < minDate) return "Ngày hiến máu phải từ ngày mai trở đi";
        return "";
      default:
        return "";
    }
  }, []);

  const validateStep = useCallback((step) => {
    const stepErrors = {};
    
    if (step === 1) {
      const fields = ["cccd", "weight", "expectedDonationDate"];
      fields.forEach(field => {
        const error = validateField(field, form[field]);
        if (error) stepErrors[field] = error;
      });
    } else if (step === 3) {
      const fields = ["phoneNumber", "address", "emergencyContact", "emergencyPhone"];
      fields.forEach(field => {
        const error = validateField(field, form[field]);
        if (error) stepErrors[field] = error;
      });
    }
    
    return stepErrors;
  }, [validateField, form]);

  const formatCCCD = useCallback((value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 9) {
      return numbers;
    }
    return numbers.slice(0, 12);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format specific fields
    if (name === "phoneNumber" || name === "emergencyPhone") {
      formattedValue = value.replace(/\D/g, '').slice(0, 10);
    } else if (name === "cccd") {
      formattedValue = formatCCCD(value);
    }

    setForm((prev) => ({ ...prev, [name]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  }, [errors, formatCCCD]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField]);

  const handleNext = useCallback(() => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      setTouched(prev => {
        const newTouched = { ...prev };
        Object.keys(stepErrors).forEach(key => {
          newTouched[key] = true;
        });
        return newTouched;
      });
      return;
    }
    setCurrentStep((prev) => prev + 1);
  }, [currentStep, validateStep]);

  const handlePrevious = useCallback(() => setCurrentStep(prev => prev - 1), []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Validate all steps
    const allErrors = { ...validateStep(1), ...validateStep(3) };
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setTouched(prev => {
        const newTouched = { ...prev };
        Object.keys(allErrors).forEach(key => {
          newTouched[key] = true;
        });
        return newTouched;
      });
      return;
    }

    setShowConfirmModal(true);
  }, [validateStep]);

  const confirmSubmit = useCallback(async () => {
    setShowConfirmModal(false);
    setIsLoading(true);
    
    try {
      await createRequest({ ...form, requesterId: userId, status: "Dang_Cho" });
      localStorage.removeItem("bloodRequestForm"); // Clear saved form
      alert("✅ Gửi yêu cầu hiến máu thành công!");
      navigate("/profile/donation-request");
    } catch (error) {
      alert("❌ Gửi thất bại! Vui lòng thử lại.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [form, userId, navigate]);

  const getStepIcon = useCallback((step) => {
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
  }, []);

  return (
    <div className="request-form-container">
      {/* Cancel Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h5>Bạn chắc chắn muốn hủy bỏ?</h5>
            <p className="modal-description">Mọi thông tin bạn đã nhập sẽ bị mất.</p>
            <div className="modal-buttons">
              <button onClick={() => {
                localStorage.removeItem("bloodRequestForm");
                navigate("/services/donation-request");
              }} className="btn-danger">
                Đồng ý
              </button>
              <button onClick={() => setShowModal(false)} className="btn-secondary">
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Submit Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h5>Xác nhận gửi yêu cầu</h5>
            <p className="modal-description">Vui lòng kiểm tra lại thông tin trước khi gửi.</p>
            <div className="modal-buttons">
              <button onClick={confirmSubmit} className="btn-primary" disabled={isLoading}>
                {isLoading ? <><FaSpinner className="spinner" /> Đang xử lý...</> : 'Xác nhận'}
              </button>
              <button onClick={() => setShowConfirmModal(false)} className="btn-secondary" disabled={isLoading}>
                Kiểm tra lại
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="form-header">
        <FaHeart className="form-icon" />
        <h2 className="card-title">Đăng ký hiến máu</h2>
      </div>

      {/* Tiến trình */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-step" style={{ width: `${(currentStep / 3) * 100}%` }} />
        </div>
        <div className="progress-icons">
          {[1, 2, 3].map((step) => (
            <div key={step} className={`step-icon ${currentStep >= step ? "active" : ""}`}>
              {getStepIcon(step)}
            </div>
          ))}
        </div>
      </div>
      <div className="step-description">
        {currentStep === 1 && "Thông tin cá nhân của bạn"}
        {currentStep === 2 && "Thông tin y tế và hiến máu"}
        {currentStep === 3 && "Thông tin liên lạc khẩn cấp"}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className={isLoading ? 'form-loading' : ''}>
        {currentStep === 1 && (
          <div className="form-grid">
            <div className="col-6">
              <div className="input-container">
                <label>Họ và tên</label>
                <input value={user?.name || ""} disabled />
              </div>
              <div className="input-container">
                <label>Email</label>
                <input value={user?.email || ""} disabled />
              </div>
              <div className="input-container">
                <label className="required">Ngày hiến máu dự kiến</label>
                <Input
                  type="date"
                  name="expectedDonationDate"
                  value={form.expectedDonationDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.expectedDonationDate && errors.expectedDonationDate}
                  required
                />
                {touched.expectedDonationDate && errors.expectedDonationDate && (
                  <div className="error-message">
                    <FaExclamationTriangle />
                    {errors.expectedDonationDate}
                  </div>
                )}
              </div>
              <div className="input-container">
                <label className="required">Số CCCD/CMND</label>
                <Input 
                  name="cccd" 
                  value={form.cccd} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.cccd && errors.cccd}
                  required
                  placeholder="Nhập số CCCD/CMND"
                />
                {touched.cccd && errors.cccd && (
                  <div className="error-message">
                    <FaExclamationTriangle />
                    {errors.cccd}
                  </div>
                )}
              </div>
              <div className="input-container">
                <label className="required">Nhóm máu</label>
                <select 
                  name="bloodType" 
                  value={form.bloodType} 
                  onChange={handleChange}
                  required
                >
                  {BLOOD_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-6">
              <div className="input-container">
                <label>Loại hiến</label>
                <select name="donationType" value={form.donationType} onChange={handleChange}>
                  {DONATION_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div className="input-container">
                <label className="required">Cân nặng (kg)</label>
                <Input 
                  name="weight" 
                  type="number" 
                  value={form.weight} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.weight && errors.weight}
                  required
                  placeholder="Nhập cân nặng (kg)"
                />
                {touched.weight && errors.weight && (
                  <div className="error-message">
                    <FaExclamationTriangle />
                    {errors.weight}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="form-grid">
            <div className="col-6">
              <div className="input-container">
                <label>Tiền sử bệnh lý</label>
                <textarea 
                  name="medicalHistory" 
                  value={form.medicalHistory} 
                  onChange={handleChange}
                  placeholder="Vui lòng liệt kê các bệnh lý (nếu có)"
                />
              </div>
              <div className="input-container">
                <label>Dị ứng</label>
                <textarea 
                  name="allergies" 
                  value={form.allergies} 
                  onChange={handleChange}
                  placeholder="Vui lòng liệt kê các dị ứng (nếu có)"
                />
              </div>
            </div>
            <div className="col-6"></div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="form-grid">
            <div className="col-6">
              <div className="input-container">
                <label className="required">Số điện thoại</label>
                <Input 
                  name="phoneNumber" 
                  value={form.phoneNumber} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phoneNumber && errors.phoneNumber}
                  required
                  placeholder="VD: 0912345678"
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <div className="error-message">
                    <FaExclamationTriangle />
                    {errors.phoneNumber}
                  </div>
                )}
              </div>
              <div className="input-container">
                <label className="required">Địa chỉ</label>
                <Input 
                  name="address" 
                  value={form.address} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.address && errors.address}
                  required
                  placeholder="Vui lòng nhập địa chỉ đầy đủ"
                />
                {touched.address && errors.address && (
                  <div className="error-message">
                    <FaExclamationTriangle />
                    {errors.address}
                  </div>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="input-container">
                <label className="required">Người liên hệ khẩn cấp</label>
                <Input 
                  name="emergencyContact" 
                  value={form.emergencyContact} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.emergencyContact && errors.emergencyContact}
                  required
                  placeholder="Họ tên người liên hệ"
                />
                {touched.emergencyContact && errors.emergencyContact && (
                  <div className="error-message">
                    <FaExclamationTriangle />
                    {errors.emergencyContact}
                  </div>
                )}
              </div>
              <div className="input-container">
                <label className="required">Số điện thoại khẩn cấp</label>
                <Input 
                  name="emergencyPhone" 
                  value={form.emergencyPhone} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.emergencyPhone && errors.emergencyPhone}
                  required
                  placeholder="VD: 0912345678"
                />
                {touched.emergencyPhone && errors.emergencyPhone && (
                  <div className="error-message">
                    <FaExclamationTriangle />
                    {errors.emergencyPhone}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Nút điều hướng */}
        <div className="form-navigation">
          {currentStep > 1 && (
            <Button 
              type="button" 
              variant="secondary" 
              onClick={handlePrevious}
            >
              Quay lại
            </Button>
          )}
          {currentStep < 3 && (
            <Button 
              type="button" 
              variant="primary" 
              onClick={handleNext}
            >
              Tiếp theo
            </Button>
          )}
          {currentStep === 3 && (
            <Button 
              type="submit" 
              variant="primary"
              loading={isLoading}
            >
              Gửi yêu cầu
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
