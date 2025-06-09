package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "BaoCaoHoatDong")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActivityReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaBaoCao")
    private Long id;

    @Column(name = "TenBaoCao")
    private String title;

    @Column(name = "LoaiBaoCao")
    private String type;

    @Column(name = "ThangNamBaoCao")
    private LocalDateTime reportMonth;

    @Column(name = "NgayTaoBaoCao")
    private LocalDateTime createdAt;

    @Column(name = "MoTaBaoCao")
    @Lob
    private String description;

    @Column(name = "DuongDanFileBaoCao")
    private String reportFilePath;

    @ManyToOne
    @JoinColumn(name = "MaNguoiTaoBaoCao")
    private User createdBy;
}
