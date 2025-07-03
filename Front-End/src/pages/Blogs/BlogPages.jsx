import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaThumbsUp, FaCommentDots, FaShareAlt } from 'react-icons/fa'; // Thêm icon tìm kiếm và bộ lọc
import AppLayout from '../../layouts/AppLayout';
import Footer from '../../components/common/Footers/Footer';

const categories = ['Tất cả', 'Sức khỏe', 'Cộng đồng'];

export default function BlogPages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [blogData, setBlogData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const postsPerPage = 9; // Số bài mỗi trang

  // Lấy dữ liệu từ MockAPI khi component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://68498d5345f4c0f5ee71f756.mockapi.io/api/blog/blogs');
        setBlogData(response.data); // Lưu dữ liệu blog vào state
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu blog:', error);
      }
    };

    fetchBlogs();
  }, []);

  // Lọc theo tìm kiếm và thể loại
  const filteredBlogs = blogData.filter(
    blog =>
      (selectedCategory === 'Tất cả' || blog.category === selectedCategory) &&
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán chỉ số bắt đầu và kết thúc cho mỗi trang
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);

  // Thay đổi trang khi người dùng nhấn nút chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          {currentPosts.map(blog => (
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

        {/* Pagination */}
        <div className="pagination d-flex justify-content-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-outline-primary me-2"
          >
            Prev
          </button>
          {[...Array(Math.ceil(filteredBlogs.length / postsPerPage))].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`btn btn-outline-primary me-2 ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredBlogs.length / postsPerPage)}
            className="btn btn-outline-primary ms-2"
          >
            Next
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
