import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './News.css';
import { AuthContext } from "../../../contexts/AuthContext";
import initialNews from '../../../data/initialNews';
import NewImage1 from '../../../assets/images/initialNews/news1.webp';
import { sanitizeImageUrl } from '../../../utils/security';

export default function News() {
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [newImageURL, setNewImageURL] = useState("");
    const [newImageFile, setNewImageFile] = useState(null);
    const [newsItems, setNewsItems] = useState(initialNews);

    const getImageForPost = () => {
        if (newImageFile) return URL.createObjectURL(newImageFile);
        else if (newImageURL.trim()) {
            const sanitizedUrl = sanitizeImageUrl(newImageURL.trim());
            return sanitizedUrl || NewImage1;
        }
        else return NewImage1;
    };

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 6;

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = newsItems.slice(indexOfFirstNews, indexOfLastNews);
    const totalPages = Math.ceil(newsItems.length / newsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const getPageNumbers = () => {
        const delta = 4; // số trang hiển thị xung quanh trang hiện tại
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push("...");
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    useEffect(() => {
        // Reset pagination when news items change
        setCurrentPage(1);
    }, [user]);

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
            title: newTitle.trim(),
            description: newDesc.trim(),
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
            <div className="news-container">
                <div className="news-header">
                    <h1 className="news-title">📰 Tin Tức</h1>
                    {user ? (
                        <button className="btn-create" onClick={handleAddPost}>
                            ➕ Tạo bài viết mới
                        </button>
                    ) : (
                        <div className="alert">⚠️ Đăng nhập để có thể tạo bài viết</div>
                    )}
                </div>

                {message && <div className="message">{message}</div>}

                {user && showForm && (
                    <div className="popup-overlay" onClick={() => setShowForm(false)}>
                        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                            <h3>📝 Tạo bài viết mới</h3>
                            <input
                                type="text"
                                placeholder="Tiêu đề bài viết"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                maxLength={100}
                            />
                            <textarea
                                placeholder="Nội dung tóm tắt"
                                value={newDesc}
                                onChange={(e) => setNewDesc(e.target.value)}
                                maxLength={500}
                            />
                            <input
                                type="text"
                                placeholder="URL hình ảnh (https://...)"
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
                                        src={newImageFile ? URL.createObjectURL(newImageFile) : sanitizeImageUrl(newImageURL)}
                                        alt="Preview"
                                        style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
                                        onError={(e) => {
                                            e.target.src = NewImage1;
                                            e.target.alt = 'Default image';
                                        }}
                                    />
                                </div>
                            )}

                            <button className="btn-submit" onClick={handleSubmitPost}>
                                ✅ Đăng bài
                            </button>
                        </div>
                    </div>
                )}

                <div className="news-grid">
                    {currentNews.map((item, index) => (
                        <Link key={index} to={`/new/${index}`} className="news-card">
                            <img 
                                src={sanitizeImageUrl(item.image) || NewImage1} 
                                alt={item.title || 'News image'} 
                                className="card-image"
                                onError={(e) => {
                                    e.target.src = NewImage1;
                                    e.target.alt = 'Default image';
                                }}
                            />
                            <div className="card-content">
                                <h2 className="card-title">{item.title}</h2>
                                <p className="card-desc">{item.description}</p>
                                <p className="card-date"><small>🗓 {item.date}</small></p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="pagination">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Trước
                    </button>
                    {getPageNumbers().map((page, index) =>
                        page === "..." ? (
                        <span key={index} className="dots">
                            ...
                        </span>
                        ) : (
                        <button
                            key={index}
                            onClick={() => handlePageChange(page)}
                            className={currentPage === page ? "active" : ""}
                        >
                            {page}
                        </button>
                        )
                    )}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Tiếp
                    </button>
                </div>
            </div>
        </>
    );
}
