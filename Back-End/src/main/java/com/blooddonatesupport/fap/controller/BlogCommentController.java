package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.entity.BlogComment;
import com.blooddonatesupport.fap.entity.BlogPost;
import com.blooddonatesupport.fap.entity.User;
import com.blooddonatesupport.fap.repository.BlogCommentRepository;
import com.blooddonatesupport.fap.repository.BlogPostRepository;
import com.blooddonatesupport.fap.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class BlogCommentController {

    private final BlogCommentRepository commentRepo;
    private final BlogPostRepository postRepo;
    private final UserRepository userRepo;

    /**
     * Lấy tất cả bình luận theo bài viết
     */
    @GetMapping("/by-post/{postId}")
    public ResponseEntity<List<BlogComment>> getCommentsByPost(@PathVariable Long postId) {
        BlogPost post = postRepo.findById(postId).orElseThrow();
        List<BlogComment> comments = commentRepo.findByBlogPost(post);
        return ResponseEntity.ok(comments);
    }

    /**
     * Xoá bình luận nếu là admin hoặc chính chủ
     */
    @DeleteMapping("/{commentId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'USER')")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId,
                                           @AuthenticationPrincipal UserDetails userDetails) {
        BlogComment comment = commentRepo.findById(commentId).orElseThrow();
        User requester = userRepo.findByEmail(userDetails.getUsername()).orElseThrow();

        // Chỉ chính chủ hoặc admin mới được xoá
        if (!comment.getCommenter().getUserId().equals(requester.getUserId()) && !requester.getRole().equals("ADMIN")) {
            return ResponseEntity.status(403).body("Không có quyền xoá bình luận này.");
        }

        commentRepo.delete(comment);
        return ResponseEntity.ok("Đã xoá bình luận");
    }
}

