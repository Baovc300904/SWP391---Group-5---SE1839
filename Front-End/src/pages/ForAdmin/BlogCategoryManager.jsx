import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import { 
  getAllCategoriesForAdmin, 
  createBlogCategory, 
  updateBlogCategory, 
  deleteBlogCategory 
} from '../../services/api/blogCategoryService';
import { safeFormatDateTimeVietnamese } from '../../utils/dateUtils';

export default function BlogCategoryManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    tieude: '',
    noidung: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getAllCategoriesForAdmin();
      setCategories(data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách danh mục:', error);
      setError('Không thể tải danh sách danh mục');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await updateBlogCategory(editingCategory.id, formData);
      } else {
        await createBlogCategory(formData);
      }
      setShowModal(false);
      setEditingCategory(null);
      setFormData({ tieude: '', noidung: '' });
      fetchCategories();
    } catch (error) {
      console.error('Lỗi khi lưu danh mục:', error);
      setError('Không thể lưu danh mục');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      tieude: category.tieuDe,
      noidung: category.noidung
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      try {
        await deleteBlogCategory(id);
        fetchCategories();
      } catch (error) {
        console.error('Lỗi khi xóa danh mục:', error);
        setError('Không thể xóa danh mục');
      }
    }
  };

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({ tieude: '', noidung: '' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ tieude: '', noidung: '' });
  };

  const getStatusBadge = (trangThai) => {
    if (trangThai === 1) {
      return <span className="badge bg-success">Hoạt động</span>;
    } else {
      return <span className="badge bg-secondary">Không hoạt động</span>;
    }
  };

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
        <h2 className="mb-0">📚 Quản Lý Danh Mục Blog</h2>
        <button 
          className="btn btn-primary" 
          onClick={openCreateModal}
        >
          <FaPlus className="me-2" />
          Thêm Danh Mục
        </button>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Tiêu Đề</th>
                  <th>Nội Dung</th>
                  <th>Trạng Thái</th>
                  <th>Ngày Tạo</th>
                  <th>Ngày Cập Nhật</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(category => (
                  <tr key={category.id} className={category.trangThai === 0 ? 'table-secondary' : ''}>
                    <td>{category.id}</td>
                    <td>
                      <strong>{category.tieuDe}</strong>
                    </td>
                    <td>
                      {category.noidung && category.noidung.length > 50 
                        ? category.noidung.substring(0, 50) + '...' 
                        : category.noidung || 'Không có nội dung'
                      }
                    </td>
                    <td>
                      {getStatusBadge(category.trangThai)}
                    </td>
                    <td>{safeFormatDateTimeVietnamese(category.ngayTao)}</td>
                    <td>{safeFormatDateTimeVietnamese(category.ngayCapNhat)}</td>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(category)}
                          title="Chỉnh sửa"
                          disabled={category.trangThai === 0}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(category.id)}
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

          {categories.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted">Không có danh mục nào.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingCategory ? 'Chỉnh Sửa Danh Mục' : 'Thêm Danh Mục Mới'}
                </h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">
                      Tiêu đề <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.tieude}
                      onChange={(e) => setFormData({...formData, tieude: e.target.value})}
                      required
                      placeholder="Nhập tiêu đề danh mục"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Nội dung <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={formData.noidung}
                      onChange={(e) => setFormData({...formData, noidung: e.target.value})}
                      required
                      placeholder="Nhập mô tả danh mục"
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Hủy
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingCategory ? 'Cập nhật' : 'Thêm'}
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