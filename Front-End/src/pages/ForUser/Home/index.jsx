import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X } from "lucide-react";
import "./Home.css";

// Import các phần của Trang chủ
import HeroSection from "./sections/Hero";
import IntroSection from "./sections/Intro";
import SlideSection from "./sections/Slider";
import TipSection from "./sections/Tips";
import VideoSection from "./sections/Videos";
import SearchSection from "./sections/Search";
import FAQSection from "./sections/FAQ";
import PostSection from "./sections/Posts";
import BackToTop from "../../../components/common/BackToTop";

const Home = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [, setSearchResults] = useState(null);

  const handleSearchResults = (results) => {
    setSearchResults(results);
    console.log("Kết quả tìm kiếm nhận được ở Home:", results);
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  useEffect(() => {
    // Hiển thị thông báo sau 2 giây
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="home-page__container">
        
        {/* Các section chính */}
        <HeroSection />
        <SearchSection onSearchResults={handleSearchResults} />
        <IntroSection />
        <SlideSection />
        <TipSection />
        <VideoSection />
        <FAQSection />
        <PostSection />
      </div>

      {/* Back to Top Component */}
      <BackToTop />
    </>
  );
};

export default Home;
