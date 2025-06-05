package com.blooddonatesupport.fap.repository;

import com.blooddonatesupport.fap.entity.BlogComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogCommentRepository extends JpaRepository<BlogComment, Long> {}
