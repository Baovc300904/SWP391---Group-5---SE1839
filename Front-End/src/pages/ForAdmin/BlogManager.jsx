import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter } from 'react-icons/fa';
import { 
  getAllBlogs, 
  createBlog, 
  updateBlog, 
  deleteBlog 
} from '../../services/api/blogService';
import { getAllCategoriesForAdmin } from '../../services/api/blogCategoryService';
import { safeFormatDateTimeVietnamese } from '../../utils/dateUtils';

export default function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [formData, setFormData] = useState({
    tieuDe: '',
    noiDung: '',
    danhMucId: '',
    anh: null
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [blogsData, categoriesData] = await Promise.all([
        getAllBlogs(),
        getAllCategoriesForAdmin()
      ]);
      setBlogs(blogsData);
      setCategories(categoriesData.filter(cat => cat.trangThai === 1)); // Only active categories for blog creation
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
      setError('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      submitData.append('tieuDe', formData.tieuDe);
      submitData.append('noiDung', formData.noiDung);
      submitData.append('danhMucId', formData.danhMucId);
      if (formData.anh) {
        submitData.append('anh', formData.anh);
      }

      if (editingBlog) {
        await updateBlog(editingBlog.id, submitData);
      } else {
        await createBlog(submitData);
      }
      setShowModal(false);
      setEditingBlog(null);
      setFormData({ tieuDe: '', noiDung: '', danhMucId: '', anh: null });
      fetchData();
    } catch (error) {
      console.error('Lỗi khi lưu blog:', error);
      setError('Không thể lưu blog');
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      tieuDe: blog.tieuDe,
      noiDung: blog.noiDung,
      danhMucId: blog.danhMuc?.id || '',
      anh: null
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa blog này?')) {
      try {
        await deleteBlog(id);
        fetchData();
      } catch (error) {
        console.error('Lỗi khi xóa blog:', error);
        setError('Không thể xóa blog');
      }
    }
  };

  const openCreateModal = () => {
    setEditingBlog(null);
    setFormData({ tieuDe: '', noiDung: '', danhMucId: '', anh: null });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBlog(null);
    setFormData({ tieuDe: '', noiDung: '', danhMucId: '', anh: null });
  };

  const getStatusBadge = (trangThai) => {
    if (trangThai === 1) {
      return <span className="badge bg-success">Hoạt động</span>;
    } else {
      return <span className="badge bg-secondary">Không hoạt động</span>;
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.tieuDe.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || blog.danhMuc?.tieuDe === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">📝 Quản Lý Blog</h2>
        <button 
          className="btn btn-primary" 
          onClick={openCreateModal}
        >
          <FaPlus className="me-2" />
          Thêm Blog
        </button>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}

      {/* Search and Filter */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm blog..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <FaFilter />
                </span>
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="Tất cả">Tất cả danh mục</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.tieuDe}>
                      {cat.tieuDe}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Ảnh</th>
                  <th>Tiêu Đề</th>
                  <th>Danh Mục</th>
                  <th>Lượt Xem</th>
                  <th>Trạng Thái</th>
                  <th>Ngày Tạo</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.map(blog => (
                  <tr key={blog.id} className={blog.trangThai === 0 ? 'table-secondary' : ''}>
                    <td>{blog.id}</td>
                    <td>
                      <img 
                        src={blog.anh || '/default-blog-image.jpg'} 
                        alt={blog.tieuDe}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                        onError={(e) => {
                          e.target.src = '/default-blog-image.jpg';
                        }}
                      />
                    </td>
                    <td>
                      <strong>{blog.tieuDe}</strong>
                      <br />
                      <small className="text-muted">
                        {blog.noiDung && blog.noiDung.length > 50 
                          ? blog.noiDung.substring(0, 50) + '...' 
                          : blog.noiDung || 'Không có nội dung'
                        }
                      </small>
                    </td>
                    <td>
                      <span className="badge bg-info">
                        {blog.danhMuc?.tieuDe || 'Không phân loại'}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-primary">{blog.luotXem || 0}</span>
                    </td>
                    <td>
                      {getStatusBadge(blog.trangThai)}
                    </td>
                    <td>{safeFormatDateTimeVietnamese(blog.ngayTao)}</td>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(blog)}
                          title="Chỉnh sửa"
                          disabled={blog.trangThai === 0}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(blog.id)}
                          title="Xóa"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted">
                {searchTerm || selectedCategory !== 'Tất cả' 
                  ? 'Không tìm thấy blog nào phù hợp với bộ lọc.' 
                  : 'Không có blog nào.'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingBlog ? 'Chỉnh Sửa Blog' : 'Thêm Blog Mới'}
                </h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="mb-3">
                        <label className="form-label">
                          Tiêu đề <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.tieuDe}
                          onChange={(e) => setFormData({...formData, tieuDe: e.target.value})}
                          required
                          placeholder="Nhập tiêu đề blog"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Nội dung <span className="text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          rows="8"
                          value={formData.noiDung}
                          onChange={(e) => setFormData({...formData, noiDung: e.target.value})}
                          required
                          placeholder="Nhập nội dung blog"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label className="form-label">
                          Danh mục <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select"
                          value={formData.danhMucId}
                          onChange={(e) => setFormData({...formData, danhMucId: e.target.value})}
                          required
                        >
                          <option value="">Chọn danh mục</option>
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                              {cat.tieuDe}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Ảnh {!editingBlog && <span className="text-danger">*</span>}
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={(e) => setFormData({...formData, anh: e.target.files[0]})}
                          required={!editingBlog}
                        />
                        <small className="text-muted">
                          Chỉ chọn file ảnh (JPG, PNG, GIF)
                        </small>
                      </div>
                      {editingBlog && editingBlog.anh && (
                        <div className="mb-3">
                          <label className="form-label">Ảnh hiện tại:</label>
                          <img 
                            src={editingBlog.anh} 
                            alt="Current"
                            className="img-fluid rounded"
                            style={{ maxHeight: '150px' }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Hủy
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingBlog ? 'Cập nhật' : 'Thêm'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal backdrop */}
      {showModal && (
        <div className="modal-backdrop fade show"></div>
      )}
    </div>
  );
}
