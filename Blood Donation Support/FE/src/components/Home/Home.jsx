import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Bell, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import AppLayout from "../../Layouts/AppLayout";
import Footer from "../Footers/Footer";
{/* Import DateRangePicker */}
import MyDateRangePicker from "./HomeSearchs/MyDateRangePicker";

/* Import image cho slider */
import slideshow1 from "../../assets/images/slideshows/slideshow1.png";

const Home = () => {
  // State quản lý khoảng ngày được chọn (startDate, endDate)
  const [dateRange, setDateRange] = useState(null);

  // Dữ liệu bài viết gốc
  const [posts, setPosts] = useState([]);

  // Bài viết sau khi lọc theo tìm kiếm
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Hiện thông báo
  const [showNotification, setShowNotification] = useState(false);

  // Giá trị nhập địa điểm tìm kiếm
  const [searchLocation, setSearchLocation] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const [results, setResults] = useState([]);


  useEffect(() => {
    const mockPosts = [
      {
        id: 1,
        title: "Hành trình hiến máu đầy cảm xúc",
        image: "/images/post1.jpg",
        content:
          "Cảm ơn các bạn đã tham gia ngày hội hiến máu tại TP. HCM, góp phần cứu sống nhiều bệnh nhân.",
        date: "2025-05-01",
        location: "TP. HCM",
      },
      {
        id: 2,
        title: "Kỷ niệm 100 đơn vị máu đầu tiên",
        image: "/images/post2.jpg",
        content:
          "Chúng tôi đã tiếp nhận hơn 100 đơn vị máu trong chiến dịch vừa qua, rất cảm động và đáng tự hào.",
        date: "2025-05-15",
        location: "Hà Nội",
      },
    ];
    setPosts(mockPosts);
    setFilteredPosts(mockPosts);
    setShowNotification(true);
  }, []);

  // Hàm xử lý khi bấm nút Tìm kiếm
  const handleSearch = () => {
    let results = posts;
  
    if (dateRange && dateRange.startDate && dateRange.endDate) {
      const fromDate = new Date(dateRange.startDate);
      const toDate = new Date(dateRange.endDate);
      results = results.filter((post) => {
        const postDate = new Date(post.date);
        return postDate >= fromDate && postDate <= toDate;
      });
    }
  
    if (searchLocation.trim() !== "") {
      const keyword = searchLocation.toLowerCase();
      results = results.filter(
        (post) =>
          post.title.toLowerCase().includes(keyword) ||
          post.content.toLowerCase().includes(keyword) ||
          (post.location && post.location.toLowerCase().includes(keyword))
      );
    }
  
    setFilteredPosts(results);
    setResults(results); // ⚠️ BẠN ĐÃ THIẾU DÒNG NÀY
    setSubmitted(true);  // ⚠️ Cập nhật để hiển thị thông báo kết quả
  
    alert(
      `Tìm lịch đặt từ ${
        dateRange?.startDate
          ? format(new Date(dateRange.startDate), "dd/MM/yyyy")
          : "..."
      } đến ${
        dateRange?.endDate
          ? format(new Date(dateRange.endDate), "dd/MM/yyyy")
          : "..."
      }\nTìm được ${results.length} bài viết phù hợp.`
    );
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <>
      <AppLayout />
      <div className="container">
        {/* Notification */}
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="notification"
          >
            <Bell />
            Có bài viết mới từ cộng đồng hiến máu!
          </motion.div>
        )}

        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hero-section"
        >
          <h1 className="hero-title">
            Chào mừng đến với Hệ thống Hỗ trợ Hiến Máu
          </h1>
          <p className="hero-subtitle">
            Cùng nhau lan tỏa yêu thương, sẻ chia sự sống.
          </p>
          <p className="hero-description">
            Website Hỗ trợ Hiến Máu là nền tảng kết nối giữa những tấm lòng nhân ái với các trung tâm y tế trên toàn quốc. 
            Chúng tôi cung cấp thông tin minh bạch, cập nhật về các sự kiện hiến máu, giúp bạn dễ dàng đăng ký, tìm kiếm lịch hiến máu phù hợp, 
            cũng như chia sẻ câu chuyện đầy cảm xúc từ cộng đồng. Cùng nhau, chúng ta lan tỏa sự sống và nhân văn đến từng nhịp tim.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="slider-wrapper">
          <Slider {...sliderSettings}>
            <img src={slideshow1} alt="banner1" className="slider-image" />
            <img src="/images/banner2.jpg" alt="banner2" className="slider-image" />
          </Slider>
        </div>

        {/* Info boxes */}
        <div className="info-boxes">
          <Card className="card mission">
            <CardContent>
              <h3 className="card-title">Sứ mệnh của chúng tôi</h3>
              <p>
                Hỗ trợ kết nối người hiến máu với các trung tâm y tế, lan tỏa
                giá trị nhân văn.
              </p>
            </CardContent>
          </Card>

          <Card className="card benefit">
            <CardContent>
              <h3 className="card-title">Lợi ích khi tham gia</h3>
              <p>
                Nhận thông báo nhanh, theo dõi lịch hiến máu, và góp phần cứu
                sống nhiều người.
              </p>
            </CardContent>
          </Card>

          <Card className="card activities">
            <CardContent>
              <h3 className="card-title">Các hoạt động nổi bật</h3>
              <p>
                Ngày hội hiến máu, chia sẻ câu chuyện, và các chương trình
                khuyến khích cộng đồng.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Video Section */}
        <section className="video-section">
          <h2 className="section-title">Video truyền cảm hứng</h2>
          <div className="video-wrapper">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/bxjZ511ChKY"
              title="Video kêu gọi hiến máu"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Search section */}
        <div className="p-6">
          <Card className="search-card">
            <CardContent>
              <h2 className="text-xl font-semibold mb-4">Tìm kiếm lịch đặt</h2>
              <div className="flex flex-col gap-4">
                <MyDateRangePicker onChange={(range) => setDateRange(range)} />

                <Input
                  placeholder="Nhập tên địa điểm hoặc từ khóa..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="search-input"
                />

                <Button onClick={handleSearch} className="search-button">
                  Tìm kiếm
                </Button>

                {/* THÔNG BÁO */}
                {submitted && (
                  <div
                    className={`mt-2 p-3 rounded text-sm ${
                      results.length > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {results.length > 0
                      ? `🔍 Đã tìm thấy ${results.length} lịch đặt phù hợp.`
                      : "❌ Không tìm thấy lịch đặt nào phù hợp."}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          {/* KẾT QUẢ HIỂN THỊ */}
          <div className="results-section">
            {results.map((item) => (
              <Card key={item.id} className="result-card">
                <CardContent>
                  <h3 className="result-title">{item.title}</h3>
                  <p className="result-location">Địa điểm: {item.location}</p>
                  <p className="result-date">
                    Ngày: {format(new Date(item.date), "dd/MM/yyyy")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2 className="section-title">Câu hỏi thường gặp</h2>
          <div className="faq-item">
            <h4 className="faq-question">Ai có thể tham gia hiến máu?</h4>
            <p className="faq-answer">
              Bất kỳ ai từ 18 đến 60 tuổi, có sức khỏe tốt và không mắc các bệnh truyền nhiễm đều có thể tham gia hiến máu.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">Tôi có được nhận giấy chứng nhận không?</h4>
            <p className="faq-answer">
              Có. Sau khi hiến máu, bạn sẽ được cấp giấy chứng nhận hiến máu tình nguyện.
            </p>
          </div>
        </section>

        {/* Quick Stats Section */}
        <div className="quick-stats">
          <Card className="stat-card">
            <CardContent>
              <h3 className="stat-value">1,254+</h3>
              <p className="stat-label">Người tham gia</p>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardContent>
              <h3 className="stat-value">3,785</h3>
              <p className="stat-label">Đơn vị máu tiếp nhận</p>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardContent>
              <h3 className="stat-value">52</h3>
              <p className="stat-label">Trung tâm y tế liên kết</p>
            </CardContent>
          </Card>
        </div>

        {/* Blood Donor Stories */}
        <section className="donor-stories">
          <h2 className="section-title">Câu chuyện người hiến máu</h2>
          <Slider {...sliderSettings}>
            <div className="story-slide">
              <p>"Tôi từng cần máu để cứu sống người thân. Giờ đây tôi muốn đền đáp lại."</p>
              <strong>- Nguyễn Văn Minh</strong>
            </div>
            <div className="story-slide">
              <p>"Mỗi lần hiến máu là một lần tôi cảm thấy mình sống có ý nghĩa hơn."</p>
              <strong>- Trần Thị Hồng</strong>
            </div>
          </Slider>
        </section>

        {/* Community posts */}
        <section>
          <div className="posts-header">
            <h2 className="section-title">Bài viết cộng đồng</h2>
            <Button variant="outline" className="add-post-button">
              <PlusCircle size={18} /> Thêm bài viết
            </Button>
          </div>

          <div className="posts-grid">
            {(filteredPosts.length > 0 ? filteredPosts : posts).map((post) => (
              <Card key={post.id} className="post-card">
                <img src={post.image} alt={post.title} className="post-image" />
                <CardContent className="post-content">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-text">{post.content}</p>
                  <p className="post-date">
                    Ngày đăng: {format(new Date(post.date), "dd/MM/yyyy")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Home;
