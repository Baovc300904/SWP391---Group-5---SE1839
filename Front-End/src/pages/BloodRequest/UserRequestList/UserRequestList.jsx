import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import { getAllRequests } from '../../../api/bloodDonationRequestApi';
import AppLayout from '../../../layouts/AppLayout';
import Footer from '../../../components/common/Footers/Footer';

export default function UserRequestList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();  // Initialize useNavigate hook

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await getAllRequests();
        const all = res.data;

        const filtered = all.filter(r => r.requesterId?.id === user?.id);
        setRequests(filtered);
      } catch (err) {
        console.error('Lỗi khi tải danh sách:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user?.id]);

  const handleCreateRequest = () => {
    navigate('/servicesdonation-request/request-form');  // Navigate to BloodRequestForm page
  };

  return (
    <>
        <AppLayout/>
        <div className="container mt-5">
        <h2 className="mb-4">Danh sách yêu cầu hiến máu của bạn</h2>
        
        {/* Button to create new request */}
        <button 
          onClick={handleCreateRequest} 
          className="btn btn-primary mb-4"
        >
          Tạo yêu cầu mới
        </button>

        {loading ? (
            <p>Đang tải...</p>
        ) : requests.length === 0 ? (
            <p>Chưa có yêu cầu nào được gửi.</p>
        ) : (
            <div className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead className="table-light">
                <tr>
                    <th>#</th>
                    <th>Ngày đăng ký</th>
                    <th>Ngày dự kiến</th>
                    <th>Loại hiến</th>
                    <th>Trạng thái</th>
                    <th>Ghi chú</th>
                </tr>
                </thead>
                <tbody>
                {requests.map((req, idx) => (
                    <tr key={req.id}>
                    <td>{idx + 1}</td>
                    <td>{new Date(req.registrationDate).toLocaleString()}</td>
                    <td>{req.expectedDonationDate}</td>
                    <td>{req.donationType}</td>
                    <td>{req.status}</td>
                    <td>{req.note || '-'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        </div>
        <Footer />
    </>
  );
}
