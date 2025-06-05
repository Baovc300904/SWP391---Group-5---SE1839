package com.blooddonatesupport.fap.controller;

import com.blooddonatesupport.fap.entity.*;
import com.blooddonatesupport.fap.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/blog")
@RequiredArgsConstructor
public class BlogPostController {
    private final BlogPostRepository blogPostRepo;
    private final BlogCommentRepository commentRepo;
    private final WebNotificationRepository notificationRepo;
    private final EmailLogRepository emailRepo;
    private final ActivityReportRepository reportRepo;
    private final UserRepository userRepository;

    @GetMapping("/all")
    public List<BlogPost> getAll() {
        return blogPostRepo.findAll();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createPost(@RequestBody BlogPost post, @AuthenticationPrincipal UserDetails userDetails) {
        User author = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
        post.setAuthor(author);
        post.setStatus("Ban Thao");
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        blogPostRepo.save(post);
        return ResponseEntity.ok("Đã tạo bài viết");
    }

    @PostMapping("/{postId}/comment")
    public ResponseEntity<?> addComment(@PathVariable Long postId, @RequestBody BlogComment comment, @AuthenticationPrincipal UserDetails userDetails) {
        BlogPost post = blogPostRepo.findById(postId).orElseThrow();
        User commenter = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
        comment.setBlogPost(post);
        comment.setCommenter(commenter);
        comment.setCommentedAt(LocalDateTime.now());
        commentRepo.save(comment);
        return ResponseEntity.ok("Đã bình luận");
    }
    @PostMapping("/{postId}/approve")
    public ResponseEntity<?> approvePost(@PathVariable Long postId, @AuthenticationPrincipal UserDetails userDetails) {
        BlogPost post = blogPostRepo.findById(postId).orElseThrow();
        User verifier = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
        post.setVerifier(verifier);
        post.setStatus("Da Duyet");
        post.setVerificationStatus("Da Xac Thuc");
        post.setVerifiedAt(LocalDateTime.now());
        blogPostRepo.save(post);

        WebNotification notify = new WebNotification();
        notify.setUser(post.getAuthor());
        notify.setTitle("Bài viết đã được duyệt");
        notify.setContent("Bài viết: " + post.getTitle());
        notify.setType("Bai Viet Moi");
        notify.setRedirectUrl("/blog/" + post.getId());
        notificationRepo.save(notify);

        EmailLog email = new EmailLog();
        email.setUser(post.getAuthor());
        email.setRecipientEmail(post.getAuthor().getEmail());
        email.setSubject("Bài viết của bạn đã được duyệt");
        email.setBody("Chúng tôi đã duyệt bài viết: " + post.getTitle());
        email.setStatus("Thanh Cong");
        email.setType("Bai Viet Moi");
        email.setReferenceType("BlogPost");
        email.setReferenceId(post.getId());
        emailRepo.save(email);

        return ResponseEntity.ok("Bài viết đã được duyệt và thông báo đã gửi");
    }

    @GetMapping("/report/{month}")
    public List<ActivityReport> getReportsByMonth(@PathVariable String month) {
        return reportRepo.findAll(); // bạn có thể lọc theo tháng nếu cần
    }
}