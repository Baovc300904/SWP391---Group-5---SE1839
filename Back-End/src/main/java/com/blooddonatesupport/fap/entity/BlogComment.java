package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "BinhLuanBlog")
public class BlogComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private BlogPost blogPost;

    @ManyToOne
    private User commenter;

    @Lob
    @Column(name = "NoiDungBinhLuan")
    private String content;

    @Column(name = "NgayBinhLuan")
    private LocalDateTime commentedAt = LocalDateTime.now();

    private Integer rating;
}
