import React, { useState } from 'react';
import { Card, CardContent } from "@/components/common/card";
import Button from "@/components/common/Button";
import { format } from "date-fns";
import posts from "../../../data/posts"; // Giả sử bạn có dữ liệu bài viết trong file này
import './PostSection.css'; // Import CSS file for styling

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

    return (
        <section>
            <div className="post-container">
                <div className="posts-header">
                    <h2 className="post-section-title">Bài viết cộng đồng</h2>
                </div>

                <div className="community-posts-grid">
                    {currentPosts.map((item) => (
                        <Card key={item.id} className="community-post-card">
                            <CardContent>
                                <img src={item.image} alt={item.title} className="post-thumbnail" />
                                <h3 className="post-title">{item.title}</h3>
                                <p className="post-content">{item.content}</p>
                                <p className="post-date">
                                    Ngày: {format(new Date(item.date), "dd/MM/yyyy")}
                                </p>
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
            </div>
        </section>
    );
}
