package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Table(name = "BaiVietBlog")
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BlogPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob
    private String content;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt = LocalDateTime.now();

    private int views = 0;

    private String status; // Ban Thao, Cho Duyet, Da Duyet, Tu Choi

    private String tags;

    private String category;

    private boolean isDonorPost = false;

    private boolean isProfessionalPost = false;

    private String professionalAttachment;

    private String verificationStatus; // Chua Gui, Cho Duyet, Da Xac Thuc, Tu Choi

    @ManyToOne
    private User author;

    @ManyToOne
    private User verifier;

    private LocalDateTime verifiedAt;

    @OneToMany(mappedBy = "blogPost", cascade = CascadeType.ALL)
    private List<BlogComment> comments;
}