package com.blooddonatesupport.fap.repository;

import com.blooddonatesupport.fap.entity.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {}
