import React from 'react'
import { motion } from "framer-motion";
import './HeroSection.css'; // Import your CSS file for styling

export default function HeroSection() {
  return (
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
  )
}
