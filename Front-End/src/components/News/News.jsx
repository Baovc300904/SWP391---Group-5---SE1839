import React, { useContext, useState } from 'react';
import './News.css';

import AppLayout from '../../layouts/AppLayout';
import Footer from "../common/Footers/Footer";
import { AuthContext } from "../../contexts/AuthContext";
import initialNews from '../../data/initialNews'; // đường dẫn phù hợp

import NewImage1 from '../../assets/images/initialNews/news1.webp'; // hình ảnh mặc định

export default function News() {
    const { user, logout } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [newImageURL, setNewImageURL] = useState("");
    const [newImageFile, setNewImageFile] = useState(null);
    const [newsItems, setNewsItems] = useState(initialNews);

    let imageSrc = NewImage1; // default image

    if (newImageFile) {
        imageSrc = URL.createObjectURL(newImageFile);
    }

    const getImageForPost = () => {
        if (newImageFile) {
          // Nếu upload file ảnh thì dùng ảnh từ file (blob URL)
          return URL.createObjectURL(newImageFile);
        } else if (newImageURL.trim()) {
          // Nếu có nhập URL thì dùng URL
          return newImageURL.trim();
        } else {
          // Không có file, không có URL thì dùng ảnh mặc định
          return NewImage1;
        }
    };
    // Phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 10;

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = newsItems.slice(indexOfFirstNews, indexOfLastNews);

    const totalPages = Math.ceil(newsItems.length / newsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleLoginToggle = () => {
        if (user) {
            logout();
            setMessage("🚪 Đã đăng xuất!");
        }
        setTimeout(() => setMessage(""), 3000);
    };

    const handleAddPost = () => setShowForm(!showForm);

    const handleSubmitPost = () => {
        if (!newTitle.trim() || !newDesc.trim()) {
          setMessage("❗ Vui lòng nhập đủ tiêu đề và mô tả!");
          setTimeout(() => setMessage(""), 3000);
          return;
        }
      
        const imageForPost = getImageForPost();
      
        const newPost = {
          image: imageForPost,
          title: newTitle,
          description: newDesc,
          date: new Date().toISOString().slice(0, 10),
        };
      
        setNewsItems([newPost, ...newsItems]);
        setNewTitle("");
        setNewDesc("");
        setNewImageURL("");
        setNewImageFile(null);
        setShowForm(false);
        setMessage("✅ Đã đăng bài thành công!");
        setTimeout(() => setMessage(""), 3000);
        setCurrentPage(1);
      };
      


    return (
        <>
            <AppLayout />
            <div className="news-container">
                <div className="news-header">
                    <h1 className="news-title">📰 Tin Tức</h1>
                    {user ? (
                        <button onClick={handleLoginToggle} className="btn-logout">
                            Đăng xuất ({user.name})
                        </button>
                    ) : (
                        <div className="alert">⚠️ Bạn cần đăng nhập để đăng bài!</div>
                    )}
                </div>

                {message && <div className="message">{message}</div>}

                {user && (
                    <div className="form-section">
                        <button className="btn-create" onClick={handleAddPost}>
                            ➕ Tạo bài viết mới
                        </button>

                        {showForm && (
                            <div className="popup-overlay" onClick={() => setShowForm(false)}>
                                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                                    <h3>📝 Tạo bài viết mới</h3>
                                    <input
                                        type="text"
                                        placeholder="Tiêu đề bài viết"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                    />
                                    <textarea
                                        placeholder="Nội dung tóm tắt"
                                        value={newDesc}
                                        onChange={(e) => setNewDesc(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="URL hình ảnh"
                                        value={newImageURL}
                                        onChange={(e) => setNewImageURL(e.target.value)}
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setNewImageFile(e.target.files[0])}
                                    />

                                    {(newImageFile || newImageURL) && (
                                        <div style={{ margin: '1rem 0' }}>
                                            <img
                                                src={newImageFile ? URL.createObjectURL(newImageFile) : newImageURL}
                                                alt="Preview"
                                                style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
                                            />
                                        </div>
                                    )}

                                    <button className="btn-submit" onClick={handleSubmitPost}>
                                        ✅ Đăng bài
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="news-grid">
                    {currentNews.map((item, index) => (
                        <div key={index} className="news-card">
                            <img src={item.image} alt={item.title} className="card-image" />
                            <h2 className="card-title">{item.title}</h2>
                            <p className="card-desc">{item.description}</p>
                            <p className="card-date"><small>🗓 {item.date}</small></p>
                        </div>
                    ))}
                </div>

                {/* Pagination buttons */}
                <div className="pagination">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        ◀️ Trước
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={currentPage === i + 1 ? 'active' : ''}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Tiếp ▶️
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}
