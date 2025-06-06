package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "ThongBaoTrangWeb")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WebNotification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaThongBao")
    private Long id;

    @Column(name = "TieuDe")
    private String title;

    @Column(name = "NoiDung")
    @Lob
    private String content;

    @Column(name = "LoaiThongBao")
    private String type;

    @Column(name = "DaDoc")
    private boolean isRead;

    @Column(name = "DuongDanChiTiet")
    private String redirectUrl;

    @Column(name = "NgayTao")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "MaNguoiDung")
    private User user;
}