import React from 'react'
import introPost from "../../../assets/images/posts/introPost.jpg";
import './IntroSection.css'; // Import your CSS file for styling
export default function IntroSection() {
  return (
    <div className="intro-container my-5 gap-4">
        <div className="row align-items-center p-4">
        {/* Text Section */}
        <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="intro-title mb-3">Chào mừng đến với Website của chúng tôi</h2>
            <p className="intro-description">
            Đây là nền tảng giúp bạn khám phá, tìm kiếm và kết nối với những thông tin mới nhất về các sự kiện, địa điểm
            và cộng đồng. Giao diện thân thiện, dễ sử dụng và luôn cập nhật dữ liệu một cách nhanh chóng và chính xác.
            Hãy cùng trải nghiệm và khám phá ngay hôm nay!
            </p>
        </div>

        {/* Image Section */}
        <div className="col-md-6 text-center" style={{ width: '600px', height: '400px' }}>
            <img
            src={introPost}
            alt="Giới thiệu website"
            className="img-fluid rounded shadow"
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            />
        </div>
        </div>
    </div>
  )
}
