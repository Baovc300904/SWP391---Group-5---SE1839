package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WebNotification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob
    private String content;

    private String type; // He Thong, Cap Nhat, Bai Viet Moi, etc.

    private boolean isRead = false;

    private String redirectUrl;

    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    private User user;
}