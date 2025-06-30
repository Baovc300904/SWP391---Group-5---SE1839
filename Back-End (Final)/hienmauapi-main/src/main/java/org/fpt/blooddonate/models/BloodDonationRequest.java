package org.fpt.blooddonate.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "YeuCauHienMau")
@Data
@NoArgsConstructor
public class BloodDonationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "NguoiHienId", nullable = false)
    private User nguoiHien;

    @ManyToOne
    @JoinColumn(name = "HoatDongHienMauId", nullable = true)
    private BloodDonationActivity hoatDongHienMau;

    @Column(name = "NgayHienMauDuKien", nullable = false)
    private LocalDate ngayHienMauDuKien;

    @Column(name = "NgayPhucHoiGanNhat")
    private LocalDate ngayPhucHoiGanNhat;

    @Column(name = "GhiChu", columnDefinition = "TEXT")
    private String ghiChu;

    @ManyToOne
    @JoinColumn(name = "NguoiDuyetId")
    private User nguoiDuyet;

    @Column(name = "NgayDuyet")
    private LocalDateTime ngayDuyet;

    @Column(name = "SoLuong")
    private int soLuong;

    @Column(name = "LoaiHien", nullable = false)
    private String loaiHien = "toanphan";

    @Column(name = "TrangThai", nullable = false)
    private String trangThai = "dangcho";

    @Column(name = "NgayTao", updatable = false)
    private LocalDateTime ngayTao = LocalDateTime.now();

    @Column(name = "NgayCapNhat")
    private LocalDateTime ngayCapNhat = LocalDateTime.now();

    @PreUpdate
    public void preUpdate() {
        this.ngayCapNhat = LocalDateTime.now();
    }
}