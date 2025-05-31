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
import AppLayout from "../../layouts/AppLayout";
import Footer from "../Footers/Footer";
{/* Import DateRangePicker */}
import MyDateRangePicker from "./HomeSearchs/MyDateRangePicker";

/* Import image cho slider */
import slideshow1 from "../../assets/images/slideshows/slideshow1.png";
import introPost from "../../assets/images/posts/introPost.jpg"; // Giới thiệu website

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

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // hoặc số lượng bạn muốn hiển thị mỗi trang

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
      {
        id: 3,
        title: "Ngày hội hiến máu tại Đà Nẵng",
        image: "/images/post3.jpg",
        content:
          "Sự kiện thu hút hàng ngàn người dân thành phố Đà Nẵng tham gia hiến máu cứu người.",
        date: "2025-05-20",
        location: "Đà Nẵng",
      },
      {
        id: 4,
        title: "Chiến dịch hiến máu mùa hè 2025",
        image: "/images/post4.jpg",
        content:
          "Chiến dịch lan tỏa tinh thần hiến máu tình nguyện trong mùa hè nóng bỏng.",
        date: "2025-06-01",
        location: "TP. HCM",
      },
      {
        id: 5,
        title: "Hiến máu cứu sống bệnh nhi ở Huế",
        image: "/images/post5.jpg",
        content:
          "Người hiến máu tại Huế góp phần cứu sống nhiều trẻ em mắc bệnh hiểm nghèo.",
        date: "2025-06-05",
        location: "Huế",
      },
      {
        id: 6,
        title: "Lan tỏa yêu thương với ngày hội hiến máu Quảng Ninh",
        image: "/images/post6.jpg",
        content:
          "Hàng trăm người dân Quảng Ninh tham gia ngày hội hiến máu vì cộng đồng.",
        date: "2025-06-10",
        location: "Quảng Ninh",
      },
      {
        id: 7,
        title: "Cảm xúc ngày hiến máu tại Cần Thơ",
        image: "/images/post7.jpg",
        content:
          "Ngày hội hiến máu tại Cần Thơ đã thu hút rất nhiều bạn trẻ tham gia.",
        date: "2025-06-15",
        location: "Cần Thơ",
      },
      {
        id: 8,
        title: "Hành trình đỏ xuyên Việt",
        image: "/images/post8.jpg",
        content:
          "Chuyến hành trình đỏ xuyên Việt kết nối những tấm lòng nhân ái trên toàn quốc.",
        date: "2025-06-20",
        location: "Hà Nội",
      },
      {
        id: 9,
        title: "Hiến máu cứu người tại Bình Dương",
        image: "/images/post9.jpg",
        content:
          "Bình Dương tổ chức thành công ngày hội hiến máu cứu người đầu năm 2025.",
        date: "2025-06-25",
        location: "Bình Dương",
      },
      {
        id: 10,
        title: "Tiếp nhận hơn 200 đơn vị máu tại Tây Ninh",
        image: "/images/post10.jpg",
        content:
          "Chương trình hiến máu tại Tây Ninh vượt chỉ tiêu với hơn 200 đơn vị máu tiếp nhận.",
        date: "2025-07-01",
        location: "Tây Ninh",
      },
      {
        id: 11,
        title: "Ngày hội hiến máu trường Đại học Bách Khoa",
        image: "/images/post11.jpg",
        content:
          "Sinh viên Bách Khoa tham gia nhiệt tình ngày hội hiến máu với tinh thần xung kích.",
        date: "2025-07-05",
        location: "Hà Nội",
      },
      {
        id: 12,
        title: "Hiến máu cứu người tại Long An",
        image: "/images/post12.jpg",
        content:
          "Ngày hội hiến máu tại Long An thu hút đông đảo người dân và cán bộ tham gia.",
        date: "2025-07-10",
        location: "Long An",
      },
      {
        id: 13,
        title: "Câu chuyện cảm động của người hiến máu",
        image: "/images/post13.jpg",
        content:
          "Người hiến máu chia sẻ cảm xúc và ý nghĩa của hành trình cứu người bằng máu.",
        date: "2025-07-15",
        location: "TP. HCM",
      },
      {
        id: 14,
        title: "Hành trình lan tỏa sự sống tại Nghệ An",
        image: "/images/post14.jpg",
        content:
          "Nghệ An tổ chức chương trình hiến máu tình nguyện với sự tham gia của nhiều đoàn viên.",
        date: "2025-07-20",
        location: "Nghệ An",
      },
      {
        id: 15,
        title: "Ngày hội hiến máu vì cộng đồng tại Hải Phòng",
        image: "/images/post15.jpg",
        content:
          "Hải Phòng phát động chiến dịch hiến máu tình nguyện đầu mùa hè thành công rực rỡ.",
        date: "2025-07-25",
        location: "Hải Phòng",
      },
      {
        id: 16,
        title: "Lan tỏa tinh thần hiến máu ở Thanh Hóa",
        image: "/images/post16.jpg",
        content:
          "Thanh Hóa tổ chức ngày hội hiến máu với sự tham gia của đông đảo các tầng lớp nhân dân.",
        date: "2025-07-30",
        location: "Thanh Hóa",
      },
      {
        id: 17,
        title: "Hiến máu cứu người tại Vinh",
        image: "/images/post17.jpg",
        content:
          "Sự kiện hiến máu tình nguyện tại Vinh góp phần cứu sống nhiều bệnh nhân cần máu gấp.",
        date: "2025-08-01",
        location: "Vinh",
      },
      {
        id: 18,
        title: "Ngày hội hiến máu tình nguyện tại Quảng Nam",
        image: "/images/post18.jpg",
        content:
          "Quảng Nam tổ chức thành công ngày hội hiến máu với hàng trăm người tham gia.",
        date: "2025-08-05",
        location: "Quảng Nam",
      },
      {
        id: 19,
        title: "Hiến máu cứu người tại Bình Thuận",
        image: "/images/post19.jpg",
        content:
          "Bình Thuận phát động chiến dịch hiến máu tình nguyện thu hút sự quan tâm lớn từ cộng đồng.",
        date: "2025-08-10",
        location: "Bình Thuận",
      },
      {
        id: 20,
        title: "Chiến dịch hiến máu mùa thu tại Đồng Nai",
        image: "/images/post20.jpg",
        content:
          "Đồng Nai tổ chức chiến dịch hiến máu tình nguyện với mục tiêu lớn trong mùa thu năm nay.",
        date: "2025-08-15",
        location: "Đồng Nai",
      },
      {
        id: 21,
        title: "Ngày hội hiến máu tại Gia Lai",
        image: "/images/post21.jpg",
        content:
          "Gia Lai phát động chương trình hiến máu tình nguyện, nhận được nhiều sự hưởng ứng từ người dân.",
        date: "2025-08-20",
        location: "Gia Lai",
      },
      {
        id: 22,
        title: "Hiến máu cứu người tại Phú Yên",
        image: "/images/post22.jpg",
        content:
          "Phú Yên tổ chức ngày hội hiến máu tình nguyện thu hút đông đảo các bạn trẻ tham gia.",
        date: "2025-08-25",
        location: "Phú Yên",
      },
    ];
    
    setPosts(mockPosts);
    setFilteredPosts(mockPosts);
    setShowNotification(true);
    setCurrentPage(1); // Reset current page khi dữ liệu posts được cập nhật
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
  {/* Pagination logic */}
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = (filteredPosts.length > 0 ? filteredPosts : posts).slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil((filteredPosts.length > 0 ? filteredPosts : posts).length / postsPerPage);


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

        <div className="intro-container my-5">
          <div className="row align-items-center bg-white shadow rounded p-4">
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
            <div className="col-md-6 text-center">
              <img
                src={introPost}
                alt="Giới thiệu website"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>

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
        <section className="home-faq-section">
          <h2 className="home-section-title">Câu hỏi thường gặp</h2>
          <div className="home-faq-item">
            <h4 className="home-faq-question">Ai có thể tham gia hiến máu?</h4>
            <p className="home-faq-answer">
              Bất kỳ ai từ 18 đến 60 tuổi, có sức khỏe tốt và không mắc các bệnh truyền nhiễm đều có thể tham gia hiến máu.
            </p>
          </div>
          <div className="home-faq-item">
            <h4 className="home-faq-question">Tôi có được nhận giấy chứng nhận không?</h4>
            <p className="home-faq-answer">
              Có. Sau khi hiến máu, bạn sẽ được cấp giấy chứng nhận hiến máu tình nguyện.
            </p>
          </div>
        </section>

        {/* Quick Stats Section */}
        <div className="home-quick-stats">
          <Card className="home-stat-card">
            <CardContent>
              <h3 className="home-stat-value">1,254+</h3>
              <p className="home-stat-label">Người tham gia</p>
            </CardContent>
          </Card>
          <Card className="home-stat-card">
            <CardContent>
              <h3 className="home-stat-value">3,785</h3>
              <p className="home-stat-label">Đơn vị máu tiếp nhận</p>
            </CardContent>
          </Card>
          <Card className="home-stat-card">
            <CardContent>
              <h3 className="home-stat-value">52</h3>
              <p className="home-stat-label">Trung tâm y tế liên kết</p>
            </CardContent>
          </Card>
        </div>

        {/* Blood Donor Stories */}
        <section className="home-donor-stories">
          <h2 className="home-section-title">Câu chuyện người hiến máu</h2>
          <Slider {...sliderSettings}>
            <div className="home-story-slide">
              <p>"Tôi từng cần máu để cứu sống người thân. Giờ đây tôi muốn đền đáp lại."</p>
              <strong>- Nguyễn Văn Minh</strong>
            </div>
            <div className="home-story-slide">
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

          <div className="community-posts-grid">
            {currentPosts.map((item) => (
              <Card key={item.id} className="community-post-card">
                <CardContent>
                  <img src={item.image} alt={item.title} className="post-thumbnail" />
                  <h3 className="post-title">{item.title}</h3>
                  <p className="post-date">
                    Ngày: {format(new Date(item.date), "dd/MM/yyyy")}
                  </p>
                  <p className="post-location">Địa điểm: {item.location}</p>
                  <p className="post-content">{item.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="pagination-controls">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Trang trước
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                variant={currentPage === i + 1 ? "default" : "outline"}
                className="pagination-button"
              >
                {i + 1}
              </Button>
            ))}

            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Trang sau
            </Button>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Home;
