import React, { useState } from 'react';
import './News.css';

import AppLayout from '../../Layouts/AppLayout';
import Footer from '../Footers/Footer';

export default function News() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [message, setMessage] = useState("");

    const newsItems = [
        {
            title: "Tin tức 1",
            description: "Đây là nội dung tóm tắt của tin tức số 1.",
            date: "2025-05-23"
        },
        {
            title: "Tin tức 2",
            description: "Đây là nội dung tóm tắt của tin tức số 2.",
            date: "2025-05-22"
        },
        {
            title: "Tin tức 3",
            description: "Đây là nội dung tóm tắt của tin tức số 3.",
            date: "2025-05-21"
        },
        // ...các tin khác giữ nguyên
    ];

    const handleLoginToggle = () => {
        setIsLoggedIn(!isLoggedIn);
        setMessage(isLoggedIn ? "🚪 Đã đăng xuất!" : "🔓 Đăng nhập thành công!");
        setTimeout(() => setMessage(""), 3000);
    };

    const handleAddPost = () => {
        alert("Tính năng thêm bài viết sẽ được cập nhật sau.");
    };

    return (
        <>
        <AppLayout />
        <div className="news-container">
            <h1 className="news-title">Tin Tức</h1>
            <button onClick={handleLoginToggle} className="btn-toggle-login">
                {isLoggedIn ? "Đăng xuất" : "Đăng nhập"}
            </button>
            {message && <div className="message">{message}</div>}

            <div className="news-grid">
                {isLoggedIn && (
                    <button className="btn-primary" onClick={handleAddPost}>
                        ➕ Tạo bài viết mới
                    </button>
                )}
                {newsItems.map((item, index) => (
                    <div key={index} className="news-card">
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <p><small>{item.date}</small></p>
                    </div>
                ))}
            </div>
        </div>
        <Footer />
        </>
        
    );
}
