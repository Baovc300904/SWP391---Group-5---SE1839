import React from "react";
import { Heart, BookOpen, Users, Droplets, Activity } from "lucide-react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-section__content">
        <h1 className="hero-section__title">
          Hiến máu cứu người - <br />
          <span className="hero-section__title-highlight">Một nghĩa cử cao đẹp</span>
        </h1>
        <p className="hero-section__description">
          Mỗi giọt máu cho đi, một cuộc đời ở lại. Hãy chung tay hiến máu để cứu sống những người cần máu.
        </p>
        <div className="hero-section__buttons">
          <button className="hero-section__button--primary">
            <Heart size={20} />
            Đăng ký hiến máu
          </button>
          <button className="hero-section__button--secondary">
            <BookOpen size={20} />
            Tìm hiểu thêm
          </button>
        </div>
      </div>
      <div className="hero-section__stats">
        <div className="hero-section__stat-item">
          <div className="hero-section__stat-icon">
            <Users size={32} />
          </div>
          <h3>1000+</h3>
          <p>Người hiến máu</p>
        </div>
        <div className="hero-section__stat-item">
          <div className="hero-section__stat-icon">
            <Droplets size={32} />
          </div>
          <h3>500+</h3>
          <p>Đơn vị máu</p>
        </div>
        <div className="hero-section__stat-item">
          <div className="hero-section__stat-icon">
            <Activity size={32} />
          </div>
          <h3>300+</h3>
          <p>Người được cứu</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
