import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './adminNavbar';
import './adminDashboard.css';

// Import chart
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const samplePosts = [
  { id: 1, title: 'Bai viet 1', author: 'User A', status: 'pending', createdAt: '2025-05-30' },
  { id: 2, title: 'Bai viet 2', author: 'User B', status: 'pending', createdAt: '2025-05-29' },
  { id: 3, title: 'Bai viet 3', author: 'User C', status: 'pending', createdAt: '2025-05-28' },
];

const sampleUsers = [
  { id: 1, email: 'admin@example.com', role: 'Quan_Tri_Vien' },
  { id: 2, email: 'user1@example.com', role: 'user' },
  { id: 3, email: 'user2@example.com', role: 'user' },
];

const sampleNotifications = [
  { title: 'He thong cap nhat', message: 'Chuc nang moi da duoc them vao.' },
  { title: 'Nguoi dung moi', message: 'User D da dang ky tai khoan.' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [visitCount, setVisitCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    const storedVisits = parseInt(localStorage.getItem('adminVisitCount')) || 0;
    localStorage.setItem('adminVisitCount', storedVisits + 1);
    setVisitCount(storedVisits + 1);

    if (!loggedUser) {
      alert('Ban chua dang nhap!');
      navigate('/login');
      return;
    }

    if (loggedUser.role !== 'Quan_Tri_Vien') {
      alert('Quyen truy cap bi tu choi! Chi Quan_Tri_Vien moi co quyen truy cap.');
      navigate('/login');
      return;
    }

    setUser(loggedUser);
    setPosts(samplePosts); // Replace with API call later
    setUsers(sampleUsers); // Replace with API call later
    setNotifications(sampleNotifications); // Replace with API call later
  }, [navigate]);

  if (!user) return null;

  const pendingPosts = posts.filter(post => post.status === 'pending');
  const approvedPosts = posts.filter(post => post.status === 'approved');

  const handleApprove = (id) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === id ? { ...post, status: 'approved' } : post
      )
    );
    setLogs(prev => [...prev, `${user.email} da duyet bai viet ID ${id}`]);
    alert('Da duyet bai viet!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Ban co muon xoa bai viet nay?')) {
      setPosts(prev => prev.filter(post => post.id !== id));
      setLogs(prev => [...prev, `${user.email} da xoa bai viet ID ${id}`]);
      alert('Da xoa bai viet!');
    }
  };

  // Dữ liệu cho PieChart
  const chartData = [
    { name: 'Pending', value: pendingPosts.length },
    { name: 'Approved', value: approvedPosts.length }
  ];

  return (
    <>
      <AdminNavbar />
      <div className="admin-dashboard">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <p className="welcome-text">Chao mung Quan_Tri_Vien: <strong>{user.email}</strong></p>

        {/* Container flex chứa stats và chart nằm cạnh nhau */}
        <div className="dashboard-flex-container">

          {/* Thống kê người dùng và thông số khác */}
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Tổng người dùng</h3>
              <p>{users.length}</p>
            </div>
            <div className="stat-card">
              <h3>Bài viết chờ duyệt</h3>
              <p>{pendingPosts.length}</p>
            </div>
            <div className="stat-card">
              <h3>Thông báo mới</h3>
              <p>{notifications.length}</p>
            </div>
            <div className="stat-card">
              <h3>Lượt truy cập</h3>
              <p>{visitCount}</p>
            </div>
          </div>

          {/* Pie Chart hiển thị trạng thái bài viết */}
          <div className="dashboard-chart">
            <h3>Tình trạng bài viết</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Thống kê lượt truy cập */}
        <div className="stats-section">
          <h2 className="section-title">Thong ke truy cap</h2>
          <p>So lan ban da vao dashboard: <strong>{visitCount}</strong></p>
        </div>

        {/* Bài viết chờ duyệt */}
        <h2 className="section-title">Thong bao bai viet moi ({pendingPosts.length})</h2>
        {pendingPosts.length === 0 ? (
          <p className="no-posts-text">Khong co bai viet moi can duyet.</p>
        ) : (
          <table className="posts-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tieu de</th>
                <th>Tac gia</th>
                <th>Ngay tao</th>
                <th>Hanh dong</th>
              </tr>
            </thead>
            <tbody>
              {pendingPosts.map(post => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.author}</td>
                  <td>{post.createdAt}</td>
                  <td>
                    <button className="approve-btn" onClick={() => handleApprove(post.id)}>Duyet</button>
                    <button className="delete-btn" onClick={() => handleDelete(post.id)}>Xoa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Log hành động */}
        <div className="stats-section">
          <h2 className="section-title">Nhat ky hanh dong</h2>
          {logs.length === 0 ? (
            <p className="no-posts-text">Chua co hanh dong nao.</p>
          ) : (
            <ul className="log-list">
              {logs.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
