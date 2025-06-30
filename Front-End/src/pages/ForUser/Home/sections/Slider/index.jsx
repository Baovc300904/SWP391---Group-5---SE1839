import React, { useState, useEffect } from 'react';
import './SlideSection.css';

const slides = [
  {
    id: 1,
    image: '/assets/images/slideshows/slideshow1.png',
    title: 'Hiến máu cứu người - Một nghĩa cử cao đẹp',
    description: 'Mỗi giọt máu cho đi, một cuộc đời ở lại'
  },
  {
    id: 2,
    image: '/assets/images/slideshows/slideshow2.png',
    title: 'Cùng chung tay vì cộng đồng',
    description: 'Lan tỏa yêu thương - Sẻ chia sự sống'
  },
  {
    id: 3,
    image: '/assets/images/home-images/intro-home-section.png',
    title: 'Hiến máu an toàn - Cứu người hiệu quả',
    description: 'Mỗi đơn vị máu có thể cứu sống 3 người'
  }
];

const SlideSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section className="slider-section">
      <div className="slider-container">
        <div className="slider-wrapper">
          <div 
            className="slides" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={slide.id} className="slide">
                <img src={slide.image} alt={slide.title} className="slide-image" />
                <div className="slide-content">
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="slider-arrow prev" onClick={prevSlide}>
            &#10094;
          </button>
          <button className="slider-arrow next" onClick={nextSlide}>
            &#10095;
          </button>

          <div className="slider-controls">
            <div className="slider-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
            <button 
              className={`autoplay-button ${isAutoPlaying ? 'playing' : ''}`}
              onClick={toggleAutoPlay}
            >
              {isAutoPlaying ? '⏸' : '▶'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SlideSection;
