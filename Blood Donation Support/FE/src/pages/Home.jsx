import React, { useState, useRef, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import { DateRange } from 'react-date-range';
import Slider from 'react-slick';
import '../style/Home.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { FaCalendarAlt } from 'react-icons/fa';

import slide1 from '../assets/demologo.png';
import slide2 from '../assets/demologo.png';
import slide3 from '../assets/demologo.png';
import post1 from '../assets/demologo.png';
import post2 from '../assets/demologo.png';

function PostNotification({ newPosts, onClose }) {
  if (newPosts.length === 0) return null;

  return (
    <div className="post-notification">
      <h4>Có {newPosts.length} bài viết mới!</h4>
      <ul>
        {newPosts.map((post, idx) => (
          <li key={idx}>{post.title}</li>
        ))}
      </ul>
      <button onClick={onClose}>Đóng</button>
    </div>
  );
}

function PostCard({ post }) {
  return (
    <div className="post-card">
      {post.image && <img src={post.image} alt={post.title} />}
      <div className="post-content">
        <h3>{post.title}</h3>
        {post.summary && <p>{post.summary}</p>}
      </div>
    </div>
  );
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Hành trình hiến máu cứu người",
      summary: "Những hình ảnh đẹp tại Ngày hội Hiến máu tình nguyện \"Giọt hồng - Giọt yêu thương\" năm 2025",
      image: post1,
    },
    {
      id: 2,
      title: "Lợi ích của việc hiến máu định kỳ",
      summary: "Những hình ảnh đẹp trong Ngày Toàn dân hiến máu tình nguyện 7/4",
      image: post2,
    },
    {
      id: 3,
      title: "Sự an toàn trong quá trình hiến máu",
      summary: "Mọi thắc mắc về quy trình, an toàn và các bước để bạn yên tâm hiến máu.",
      image: slide1,
    },
    {
      id: 4,
      title: "Sự trỗi dậy của khủng long Bình Dương",
      summary: "Mọi thắc mắc về quy trình, an toàn và các bước để bạn yên tâm hiến máu.",
      image: slide3,
    },
  ]);
  
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection'
    }
  ]);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef(null);

  const [newPostIds, setNewPostIds] = useState([]);
  const [message, setMessage] = useState("");

  // Đóng popup calendar khi click ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddPost = () => {
    if (!isLoggedIn) {
      alert("⚠️ Bạn cần đăng nhập để tạo bài viết.");
      return;
    }

  const newId = posts.length + 1;
  const newPost = {
      id: newId,
      title: `Bài viết mới số ${newId}`,
      summary: "Nội dung tóm tắt cho bài viết mới",
    };
    setPosts([...posts, newPost]);
    setNewPostIds([...newPostIds, newId]);

    setMessage("✅ Bài viết đã được tạo thành công!");
    setTimeout(() => setMessage(""), 3000);
  };

  // const handleLoginToggle = () => {
  //   setIsLoggedIn(!isLoggedIn);
  //   setMessage(isLoggedIn ? "🚪 Đã đăng xuất!" : "🔓 Đăng nhập thành công!");
  //   setTimeout(() => setMessage(""), 3000);
  // };

  const newPosts = posts.filter(post => newPostIds.includes(post.id));
  const handleCloseNotification = () => setNewPostIds([]);

  useEffect(() => {
    if (newPostIds.length > 0) {
      const timer = setTimeout(() => {
        setNewPostIds([]);
      }, 5000); // Tự ẩn sau 5s
      return () => clearTimeout(timer);
    }
  }, [newPostIds]);
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
  };

  // Format ngày cho hiển thị input
  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("vi-VN");
  };

  const handleSearchBooking = () => {
    if (!dateRange[0].startDate || !dateRange[0].endDate) {
      alert("⚠️ Vui lòng chọn đầy đủ từ ngày - đến ngày.");
      return;
    }

    alert(`🔍 Bạn đã tìm kiếm lịch đặt từ ${formatDate(dateRange[0].startDate)} đến ${formatDate(dateRange[0].endDate)}!`);
  };

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
    setCalendarOpen(false);
  };

  const bloodDonationStats = [
    { month: 'Jan', donations: 120 },
    { month: 'Feb', donations: 98 },
    { month: 'Mar', donations: 150 },
    { month: 'Apr', donations: 170 },
    { month: 'May', donations: 200 },
    { month: 'Jun', donations: 180 },
  ];

  return (
    <div className="home-wrapper">

      {message && (
        <div style={{
          backgroundColor: "#e0f3ff",
          color: "#004085",
          padding: "10px",
          margin: "10px",
          border: "1px solid #b8daff",
          borderRadius: "5px",
          textAlign: "center"
        }}>
          {message}
        </div>
      )}

      {/* <div style={{ textAlign: 'right', padding: '10px 20px' }}>
        <button onClick={handleLoginToggle} className="btn-primary">
          {isLoggedIn ? "Đăng xuất" : "Đăng nhập"}
        </button>
      </div> */}

      <PostNotification newPosts={newPosts} onClose={handleCloseNotification} />

      <div className="hero">
        <div className="content">
          <h1>
            Welcome to the <br />
            <span>Blood Donation Support System</span>
          </h1>
          <p>Give Blood. Save Lives. Connect with Those in Need.</p>
        </div>

      <div className="search-bar">
        <div className="search-overlay">

        <div className="date-range-wrapper" ref={calendarRef}>
          <div className="date-range-title">
            <FaCalendarAlt className="calendar-icon-title"/>
            <h6>Bạn cần đặt lịch vào thời gian nào?</h6>
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              readOnly
              value={
                dateRange[0].startDate && dateRange[0].endDate
                  ? `${formatDate(dateRange[0].startDate)} - ${formatDate(dateRange[0].endDate)}`
                  : ""
              }
              placeholder="Từ Ngày - Đến Ngày"
              onClick={() => setCalendarOpen(!calendarOpen)}
              style={{ cursor: 'pointer', padding: '8px', width: '700px', marginBottom: '10px', position: 'relative' }}
            />
              <FaCalendarAlt className="calendar-icon"/>
            {calendarOpen && (
              <>
                <div className="calendar-overlay" onClick={() => setCalendarOpen(false)}></div>
                <div className="calendar-popup">
                  <DateRange
                    editableDateInputs={true}
                    onChange={handleSelect}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange}
                    maxDate={new Date()}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        {/* Thêm tìm kiếm giờ vào (nếu cần thiết)*/}
        {/* <div className="time-picker-wrapper">
          <label htmlFor="searchTime">Chọn giờ:</label>
          <input
            type="time"
            id="searchTime"
            value={searchTime}
            onChange={e => setSearchTime(e.target.value)}
          />
        </div> */}
        </div>
        <button className="search-button" onClick={handleSearchBooking}>
          Tìm kiếm
        </button>
        </div>
      </div>

      <div className="slider-section">
        <Slider {...settings}>
          <div><img src={slide1} alt="Blood Donation Slide 1" /></div>
          <div><img src={slide2} alt="Blood Donation Slide 2" /></div>
          <div><img src={slide3} alt="Blood Donation Slide 3" /></div>
        </Slider>
      </div>
      
      <section className="container posts-section">
        <h2>Blood donation activities</h2>

        {isLoggedIn && (
          <button className="btn-primary" onClick={handleAddPost}>
            ➕ Tạo bài viết mới
          </button>
        )}

        <div className="post-card-container">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
      
      <section className="container chart-section">
        <h2>Thống kê số lượt hiến máu theo tháng</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bloodDonationStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="donations" fill="#ff4d4f" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section className="container about">
        <h2>About Our Mission</h2>
        <p>
          We are on a mission to ensure that every patient in need of blood has timely access to safe and screened blood supplies. 
          Through our platform, donors, volunteers, and medical centers come together to make a life-saving impact.
        </p>
      </section>

      <section className="container features">
        <h2>Key Features</h2>
        <ul>
          <li><strong>Key Feature 1:</strong> content</li>
          <li><strong>Key Feature 2:</strong> content</li>
          <li><strong>Key Feature 3:</strong> content</li>
          <li><strong>Key Feature 4:</strong> content</li>
        </ul>
      </section>
      
      {/*Lựa chọn 1*/}
      {/* <section className="container stats">
        <h2>Impact in Numbers</h2>
        <div className="stat-grid">
          <div className="stat-card"><h3>number</h3><p>content</p></div>
          <div className="stat-card"><h3>number</h3><p>content</p></div>
          <div className="stat-card"><h3>number</h3><p>content</p></div>
          <div className="stat-card"><h3>number</h3><p>content</p></div>
        </div>
      </section> */}
      
      <section className="container stats">
        <h2>Impact in Numbers</h2>
        <table className="stats-table">
          <thead>
            <tr>
              <th>Chỉ số</th>
              <th>Giá trị</th>
              <th>Mô tả</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Số lượng người hiến máu</td>
              <td>1,200</td>
              <td>Hiến máu trong 2025</td>
            </tr>
            <tr>
              <td>Đơn vị máu thu được</td>
              <td>950</td>
              <td>Đã phân phối cho các bệnh viện</td>
            </tr>
            <tr>
              <td>Chiến dịch tổ chức</td>
              <td>15</td>
              <td>Trong năm nay</td>
            </tr>
            <tr>
              <td>Tình nguyện viên tham gia</td>
              <td>200+</td>
              <td>Góp sức điều phối và tuyên truyền</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="container cta">
        <h2>Call to Action</h2>
        <p>Join us to make a difference!</p>
        <button className="btn-primary">Get Started</button>
      </section>
    </div>
  );
}
