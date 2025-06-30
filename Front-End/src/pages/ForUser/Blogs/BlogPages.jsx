import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaCommentDots, FaShareAlt, FaEye } from 'react-icons/fa';
import { SearchInput } from '../../../components/ui';
import { getAllBlogs } from '../../../services/api/blogService';
import { getAllCategories } from '../../../services/api/blogCategoryService';
import { sanitizeImageUrl } from '../../../utils/security';
import { safeFormatDateVietnamese } from '../../../utils/dateUtils';

export default function BlogPages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [categories, setCategories] = useState(['Tất cả']);
  const [blogData, setBlogData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const postsPerPage = 9;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getAllCategories();
        // Map từ tieuDe của BlogCategory và kiểm tra dữ liệu
        if (data && data.length > 0) {
          setCategories(['Tất cả', ...data.map(cat => cat.tieuDe)]);
        } else {
          setCategories(['Tất cả']);
          console.warn('Không có danh mục blog nào hoạt động');
        }
      } catch (error) {
        console.error('Lỗi khi tải danh sách thể loại:', error);
        setError('Không thể tải danh sách thể loại');
        setCategories(['Tất cả']); // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await getAllBlogs();
        // Đảm bảo blogData luôn là array
        if (Array.isArray(data)) {
          setBlogData(data);
        } else if (data && Array.isArray(data.content)) {
          setBlogData(data.content);
        } else {
          setBlogData([]);
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu blog:', error);
        setError('Không thể tải dữ liệu blog');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = Array.isArray(blogData)
    ? blogData.filter(
        blog =>
          (selectedCategory === 'Tất cả' || blog.danhMuc?.tieuDe === selectedCategory) &&
          blog.tieuDe.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="blog-page container py-5">
        <h2 className="text-center fw-bold mb-4">📚 Bài Viết Blog</h2>

        <div className="search-filter d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-4">
          <div className="search-bar position-relative w-100 w-md-50">
            <SearchInput
              placeholder="Tìm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

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

        {currentPosts.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">Không tìm thấy bài viết nào phù hợp.</p>
          </div>
        ) : (
          <div className="row">
            {currentPosts.map(blog => (
              <div className="col-md-6 col-lg-4 mb-4" key={blog.id}>
                <div className="card blog-card h-100 shadow-sm">
                  <img 
                    src={sanitizeImageUrl(blog.anh) || '/default-blog-image.jpg'} 
                    className="card-img-top" 
                    alt={blog.tieuDe || 'Blog image'}
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = '/default-blog-image.jpg';
                      e.target.alt = 'Default blog image';
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{blog.tieuDe}</h5>
                    <p className="text-muted small mb-1">
                      🗓 {safeFormatDateVietnamese(blog.ngayTao)} | 🏷 {blog.danhMuc?.tieuDe || 'Không phân loại'}
                    </p>
                    <p className="card-text">
                      {blog.noiDung ? blog.noiDung.slice(0, 80) + '...' : 'Không có nội dung'}
                    </p>
                    <button className="btn btn-sm btn-outline-secondary mt-2">Xem chi tiết</button>
                  </div>

                  <div className="card-footer bg-white">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <FaEye />
                        <span className="text-muted">{blog.luotXem || 0} Lượt xem</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <FaCommentDots />
                        <span className="text-muted">0 Comments</span>
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
        )}

        {filteredBlogs.length > postsPerPage && (
          <div className="pagination d-flex justify-content-center mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-outline-primary me-2"
            >
              Trước
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
              Sau
            </button>
          </div>
        )}
      </div>
    </>
  );
}
