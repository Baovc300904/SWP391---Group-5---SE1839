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
public class EmailLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    private String subject;

    @Lob
    private String body;

    private String recipientEmail;

    private String status; // Thanh Cong, That Bai, Dang Cho

    @Lob
    private String errorMessage;

    private LocalDateTime sentAt = LocalDateTime.now();

    private String referenceType; // YeuCauHienMau, HoatDongHienMau, etc.

    private Long referenceId;

    @ManyToOne
    private User user;
}