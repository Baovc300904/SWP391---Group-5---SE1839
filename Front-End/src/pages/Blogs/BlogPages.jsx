import React, { useState } from "react";
import { FaSearch, FaFilter, FaThumbsUp, FaCommentDots, FaShareAlt  } from "react-icons/fa"; // Thêm icon tìm kiếm và bộ lọc
import AppLayout from "../../layouts/AppLayout";
import Footer from "../../components/common/Footers/Footer";

const blogData = [
  {
    id: 1,
    title: 'Hiến máu nhân đạo – Hành động nhỏ, ý nghĩa lớn',
    category: 'Sức khỏe',
    date: '10/06/2025',
    image: 'https://via.placeholder.com/600x300',
    content: 'Câu chuyện của những người tình nguyện hiến máu định kỳ...',
    comments: 10,
    likes: 15,
  },
  {
    id: 2,
    title: 'Nhật ký chuyến đi thiện nguyện Tây Bắc',
    category: 'Cộng đồng',
    date: '05/06/2025',
    image: 'https://cdn.pixabay.com/photo/2020/06/22/20/25/blood-donation-5330817_960_720.jpg',
    content: 'Hành trình đến với vùng cao đầy cảm xúc và tình người...',
    comments: 5,
    likes: 8,
  },
  {
    id: 3,
    title: 'Các bước chuẩn bị trước khi hiến máu',
    category: 'Sức khỏe',
    date: '01/06/2025',
    image: 'https://via.placeholder.com/600x300',
    content: 'Cần làm gì trước khi hiến máu để đảm bảo sức khỏe tốt nhất...',
    comments: 2,
    likes: 3,
  },
];

const categories = ['Tất cả', 'Sức khỏe', 'Cộng đồng'];

export default function BlogPages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  // Lọc theo tìm kiếm và thể loại
  const filteredBlogs = blogData.filter(
    blog =>
      (selectedCategory === 'Tất cả' || blog.category === selectedCategory) &&
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AppLayout />
      <div className="blog-page container py-5">
        <h2 className="text-center fw-bold mb-4">📚 Bài Viết Blog</h2>

        {/* Tìm kiếm và lọc thể loại */}
        <div className="search-filter d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-4">
          <div className="search-bar position-relative w-100 w-md-50">
            <input
              type="text"
              className="form-control ps-4"
              placeholder="Tìm bài viết..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>

          {/* Thanh thể loại ở bên phải */}
          <div className="category-filter">
            {categories.map(cat => (
              <button
                key={cat}
                className={`btn btn-sm me-2 mb-1 ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Danh sách bài viết */}
        <div className="row">
          {filteredBlogs.map(blog => (
            <div className="col-md-6 col-lg-4 mb-4" key={blog.id}>
              <div className="card blog-card h-100 shadow-sm">
                <img src={blog.image} className="card-img-top" alt={blog.title} />
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="text-muted small mb-1">🗓 {blog.date} | 🏷 {blog.category}</p>
                  <p className="card-text">{blog.content.slice(0, 80)}...</p>
                  <button className="btn btn-sm btn-outline-secondary mt-2">Xem chi tiết</button>
                </div>

                {/* Đoạn footer với comment và like */}
                <div className="card-footer bg-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <FaThumbsUp />
                      <span className="text-muted">{blog.likes} Likes</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <FaCommentDots />
                      <span className="text-muted">{blog.comments} Comments</span>
                    </div>
                    <div>
                      <FaShareAlt className="text-muted" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}