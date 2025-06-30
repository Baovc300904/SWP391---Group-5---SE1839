import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/DashboardStaff.css';
import StaffNavbar from './StaffNavbar.jsx'; /**
 * Displays the staff dashboard interface for managing blood donation registrations and events.
 *
 * Provides authentication and role-based access control for staff users. Allows staff to view, approve, or reject blood donation registrations, see upcoming donation events, view basic statistics, and access their personal information.
 */

export default function DashboardStaff() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [registrations, setRegistrations] = useState([
    { id: 1, name: 'Nguyen Van A', bloodType: 'A+', date: '2025-06-15', status: 'Pending' },
    { id: 2, name: 'Tran Thi B', bloodType: 'O-', date: '2025-06-20', status: 'Pending' },
  ]);

  const [events, setEvents] = useState([
    { id: 1, location: 'Trung tâm hiến máu Hà Nội', date: '2025-06-15' },
    { id: 2, location: 'Bệnh viện Từ Dũ', date: '2025-06-20' },
  ]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedUser) {
      alert('Bạn chưa đăng nhập!');
      navigate('/login');
      return;
    }
    if (loggedUser.role !== 'staff') {
      alert('Quyền truy cập bị từ chối! Chỉ nhân viên mới được truy cập.');
      navigate('/login');
      return;
    }
    setUser(loggedUser);
  }, [navigate]);

  const approveRegistration = (id) => {
    setRegistrations((prev) =>
      prev.map((reg) => (reg.id === id ? { ...reg, status: 'Approved' } : reg))
    );
  };

  const rejectRegistration = (id) => {
    setRegistrations((prev) =>
      prev.map((reg) => (reg.id === id ? { ...reg, status: 'Rejected' } : reg))
    );
  };

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <StaffNavbar />
        <div className="dashboard-container">
        <h2>Chào mừng nhân viên: {user?.name || '...'}</h2>

        <section className="dashboard-section">
            <h3>Danh sách đăng ký hiến máu</h3>
            <table className="dashboard-table">
            <thead>
                <tr>
                <th>Họ tên</th>
                <th>Nhóm máu</th>
                <th>Ngày hiến</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {registrations.map((reg) => (
                <tr key={reg.id}>
                    <td>{reg.name}</td>
                    <td>{reg.bloodType}</td>
                    <td>{reg.date}</td>
                    <td>{reg.status}</td>
                    <td>
                    {reg.status === 'Pending' ? (
                        <>
                        <button className="btn-approve" onClick={() => approveRegistration(reg.id)}>
                            Duyệt
                        </button>
                        <button className="btn-reject" onClick={() => rejectRegistration(reg.id)}>
                            Từ chối
                        </button>
                        </>
                    ) : (
                        <em>{reg.status}</em>
                    )}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </section>

        <section className="dashboard-section">
            <h3>Lịch tổ chức hiến máu</h3>
            <ul>
            {events.map((e) => (
                <li key={e.id}>
                {e.date} - {e.location}
                </li>
            ))}
            </ul>
        </section>

        <section className="dashboard-section">
            <h3>Thống kê đơn giản</h3>
            <p>Tổng lượt đăng ký: {registrations.length}</p>
            <p>Số lượt được duyệt: {registrations.filter((r) => r.status === 'Approved').length}</p>
            <p>Số lượt bị từ chối: {registrations.filter((r) => r.status === 'Rejected').length}</p>
        </section>

        <section className="dashboard-section">
            <h3>Thông tin cá nhân</h3>
            <p>Username: {user?.name}</p>
            <p>Role: {user?.role}</p>
        </section>
        </div>
    </div>
    </>
  );
}
