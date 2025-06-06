package com.blooddonatesupport.fap.repository;

import com.blooddonatesupport.fap.entity.BlogComment;
import com.blooddonatesupport.fap.entity.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogCommentRepository extends JpaRepository<BlogComment, Long> {
    List<BlogComment> findByBlogPost(BlogPost blogPost);
}
