import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './adminNavbar';

const samplePosts = [
  { id: 1, title: 'Bai viet 1', author: 'User A', status: 'pending', createdAt: '2025-05-30' },
  { id: 2, title: 'Bai viet 2', author: 'User B', status: 'approved', createdAt: '2025-05-29' },
  { id: 3, title: 'Bai viet 3', author: 'User C', status: 'pending', createdAt: '2025-05-28' },
];

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));

    if (!loggedUser) {
      alert('Ban chua dang nhap!');
      navigate('/login');
      return;
    }

    if (loggedUser.role !== 'admin') {
      alert('Quyen truy cap bi tu choi! Chi admin moi co quyen truy cap.');
      navigate('/login');
      return;
    }

    setUser(loggedUser);
    // Lấy dữ liệu bài viết mới (giả sử từ server hoặc localStorage)
    // Ở đây dùng samplePosts tạm thời
    setPosts(samplePosts);
  }, [navigate]);

  if (!user) return null;

  // Lọc bài viết có trạng thái 'pending' (chờ duyệt)
  const pendingPosts = posts.filter(post => post.status === 'pending');

  // Hàm xử lý duyệt bài
  const handleApprove = (id) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === id ? { ...post, status: 'approved' } : post
      )
    );
    alert('Da duyet bai viet!');
  };

  // Hàm xử lý xóa bài
  const handleDelete = (id) => {
    if (window.confirm('Ban co muon xoa bai viet nay?')) {
      setPosts(prev => prev.filter(post => post.id !== id));
      alert('Da xoa bai viet!');
    }
  };

  return (
    <>  
    <AdminNavbar/>
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <p>Chao mung admin: <strong>{user.email}</strong></p>

      <h2>Thong bao bai viet moi ({pendingPosts.length})</h2>
      {pendingPosts.length === 0 ? (
        <p>Khong co bai viet moi can duyet.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                  <button onClick={() => handleApprove(post.id)}>Duyet</button>{' '}
                  <button onClick={() => handleDelete(post.id)}>Xoa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
    
  );
}
