import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { ArrowUp } from "lucide-react";
import "./Home.css";
import AppLayout from "../../layouts/AppLayout";
import Footer from "../common/Footers/Footer";

// Import các phần của Trang chủ
import HeroSection from "./Hero/HeroSection";
import IntroSection from "./Intro/IntroSection";
import SlideSection from "./Slider/SlideSection";
import VideoSection from "./HomeVideos/VideoSection";
import SearchSection from "./Search/SearchSection";
import FAQSection from "./FAQ/FAQSection";
import HomePost from "./HomePost/PostSection";

const Home = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [, setSearchResults] = useState(null);

  const handleSearchResults = (results) => {
    setSearchResults(results);
    // Nếu muốn bạn có thể xử lý gì thêm ở đây, ví dụ cập nhật UI khác
    console.log("Kết quả tìm kiếm nhận được ở Home:", results);
  };

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300); // Hiện nút nếu cuộn > 300px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    setShowNotification(true);
  }, []);

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
        {/* Các section chính */}
        <SearchSection onSearchResults={handleSearchResults} />
        <HeroSection />
        <IntroSection />
        <SlideSection sliderSettings={sliderSettings} />
        <VideoSection />
        <FAQSection />
        <HomePost />
      </div>
      {showBackToTop && (
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <ArrowUp size={25} />
        </button>
      )}
      <Footer />
    </>
  );
};

export default Home;