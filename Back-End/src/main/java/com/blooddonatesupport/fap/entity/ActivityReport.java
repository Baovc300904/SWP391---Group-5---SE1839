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
public class ActivityReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String type; // Lich Su Hien Mau, Thong Ke Kho Mau, etc.

    private LocalDateTime reportMonth;

    private LocalDateTime createdAt = LocalDateTime.now();

    @Lob
    private String description;

    private String reportFilePath;

    @ManyToOne
    private User createdBy;
}
