import React, { useState } from 'react';
import Button from "../../../../../components/ui/Button";
import posts from "../../../../../data/posts";
import './PostSection.css';

/**
 * Displays a paginated and optionally filtered list of community posts with images, locations, and metadata.
 *
 * Renders a section containing a header, a grid of post cards, and pagination controls. Supports filtering posts via search results and formats post dates for the Vietnamese locale. Each post card includes an image with lazy loading and fallback, location overlay, title, content snippet, and formatted date. Pagination controls allow navigation between pages.
 *
 * @returns {JSX.Element} The rendered post section component.
 */
export default function PostSection() {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const postsPerPage = 6;

    const displayedPosts = filteredPosts.length > 0 ? filteredPosts : posts;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = displayedPosts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(displayedPosts.length / postsPerPage);

    const handleSearchResults = (results) => {
        setFilteredPosts(results);
        setCurrentPage(1);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    return (
        <section className="posts-section">
            <div className="post-container">
                <div className="posts-header">
                    <h2 className="post-section-title">Bài viết cộng đồng</h2>
                    <p className="post-section-subtitle">
                        Chia sẻ những câu chuyện cảm động từ cộng đồng hiến máu
                    </p>
                </div>

                <div className="community-posts-grid">
                    {currentPosts.map((item) => (
                        <article key={item.id} className="community-post-card">
                            <div className="post-card-content">
                                <div className="post-image-wrapper">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="post-thumbnail"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = '/images/placeholder.jpg';
                                        }}
                                    />
                                    <div className="post-overlay">
                                        <span className="post-location">{item.location}</span>
                                    </div>
                                </div>
                                <div className="post-content-wrapper">
                                    <h3 className="post-title">{item.title}</h3>
                                    <p className="post-content">{item.content}</p>
                                    <div className="post-meta">
                                        <span className="post-date">
                                            📅 {formatDate(item.date)}
                                        </span>
                                        <span className="post-read-more">Đọc thêm →</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="pagination-controls">
                        <Button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            variant="secondary"
                            size="small"
                        >
                            ← Trang trước
                        </Button>

                        <div className="pagination-numbers">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <Button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    variant={currentPage === i + 1 ? "primary" : "outline"}
                                    size="small"
                                >
                                    {i + 1}
                                </Button>
                            ))}
                        </div>

                        <Button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            variant="secondary"
                            size="small"
                        >
                            Trang sau →
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
