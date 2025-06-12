package com.demobe.demobe.entity;

import com.demobe.demobe.enums.DonationType;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "LichSuHienMau")
public class DonationHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maLichSuHienMau;

    @ManyToOne
    @JoinColumn(name = "MaNguoiDung", nullable = false)
    private User nguoiDung;

    private LocalDate ngayHienThucTe;

    @Enumerated(EnumType.STRING)
    private DonationType loaiHien;

    private BigDecimal soLuongDonVi;

    private String diaDiemHien;

    // Getters and Setters

    public Integer getMaLichSuHienMau() {
        return maLichSuHienMau;
    }

    public void setMaLichSuHienMau(Integer maLichSuHienMau) {
        this.maLichSuHienMau = maLichSuHienMau;
    }

    public User getNguoiDung() {
        return nguoiDung;
    }

    public void setNguoiDung(User nguoiDung) {
        this.nguoiDung = nguoiDung;
    }

    public LocalDate getNgayHienThucTe() {
        return ngayHienThucTe;
    }

    public void setNgayHienThucTe(LocalDate ngayHienThucTe) {
        this.ngayHienThucTe = ngayHienThucTe;
    }

    public DonationType getLoaiHien() {
        return loaiHien;
    }

    public void setLoaiHien(DonationType loaiHien) {
        this.loaiHien = loaiHien;
    }

    public BigDecimal getSoLuongDonVi() {
        return soLuongDonVi;
    }

    public void setSoLuongDonVi(BigDecimal soLuongDonVi) {
        this.soLuongDonVi = soLuongDonVi;
    }

    public String getDiaDiemHien() {
        return diaDiemHien;
    }

    public void setDiaDiemHien(String diaDiemHien) {
        this.diaDiemHien = diaDiemHien;
    }
}
