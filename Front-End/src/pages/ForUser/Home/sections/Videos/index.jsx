import React, { useState } from 'react';
import './VideoSection.css';

const videos = [
  {
    id: 1,
    title: 'Quy trình hiến máu an toàn',
    description: 'Hướng dẫn chi tiết các bước hiến máu tình nguyện',
    thumbnail: '/assets/images/home-images/intro-home-section.png',
    videoUrl: 'https://www.youtube.com/watch?v=_evmdF4IAsY&ab_channel=Vi%E1%BB%87nHuy%E1%BA%BFth%E1%BB%8Dc-Truy%E1%BB%81nm%C3%A1uTrung%C6%B0%C6%A1ng'
  },
  {
    id: 2,
    title: 'Câu chuyện người hiến máu',
    description: 'Những câu chuyện cảm động từ người hiến máu tình nguyện',
    thumbnail: '/assets/images/slideshows/slideshow1.png',
    videoUrl: 'https://www.youtube.com/watch?v=_Jj9ilBB4mc&ab_channel=HTV-%C4%90%C3%A0iH%C3%A0N%E1%BB%99i'
  },
  {
    id: 3,
    title: 'Tác dụng của việc hiến máu',
    description: 'Lợi ích sức khỏe khi tham gia hiến máu định kỳ',
    thumbnail: '/assets/images/slideshows/slideshow2.png',
    videoUrl: 'https://www.youtube.com/watch?v=5iiGudQrFg0&ab_channel=THVLT%E1%BB%95ngH%E1%BB%A3p'
  }
];

const getEmbedUrl = (url) => {
  const videoId = new URL(url).searchParams.get('v');
  return `https://www.youtube.com/embed/${videoId}`;
};

const VideoSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openVideo = (video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <section className="video-section">
      <div className="video-container">
        <div className="video-header">
          <h2 className="video-title">Video hướng dẫn</h2>
          <p className="video-subtitle">
            Tìm hiểu thêm về hiến máu qua các video hữu ích
          </p>
        </div>

        <div className="video-grid">
          {videos.map((video) => (
            <div key={video.id} className="video-card" onClick={() => openVideo(video)}>
              <div className="video-thumbnail">
                <img src={video.thumbnail} alt={video.title} />
                <div className="play-button">▶</div>
              </div>
              <div className="video-info">
                <h3>{video.title}</h3>
                <p>{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedVideo && (
          <div className="video-modal" onClick={closeVideo}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={closeVideo}>×</button>
              <div className="video-wrapper">
                <iframe
                  src={getEmbedUrl(selectedVideo.videoUrl)}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="modal-info">
                <h3>{selectedVideo.title}</h3>
                <p>{selectedVideo.description}</p>
              </div>
            </div>
          </div>
        )}

        <div className="video-footer">
          <p>Xem thêm video trên <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">kênh YouTube</a> của chúng tôi</p>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
