package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "NhatKyGuiEmail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmailLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaNhatKyEmail")
    private Long id;

    @Column(name = "LoaiEmail")
    private String type;

    @Column(name = "TieuDeEmail")
    private String subject;

    @Column(name = "NoiDungEmail")
    @Lob
    private String body;

    @Column(name = "DiaChiNguoiNhan")
    private String recipientEmail;

    @Column(name = "TrangThaiGui")
    private String status;

    @Column(name = "ThongDiepLoi")
    @Lob
    private String errorMessage;

    @Column(name = "NgayGioGui")
    private LocalDateTime sentAt;

    @Column(name = "LoaiThamChieuLienQuan")
    private String referenceType;

    @Column(name = "MaThamChieuLienQuan")
    private Long referenceId;

    @ManyToOne
    @JoinColumn(name = "MaNguoiDung")
    private User user;
}
