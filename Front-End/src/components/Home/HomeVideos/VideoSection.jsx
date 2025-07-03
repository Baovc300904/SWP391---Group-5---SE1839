import React from 'react'

export default function VideoSection() {
  return (
    <section className="video-section">
    <h2 className="video-section-title">Video truyền cảm hứng</h2>
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
  )
}
