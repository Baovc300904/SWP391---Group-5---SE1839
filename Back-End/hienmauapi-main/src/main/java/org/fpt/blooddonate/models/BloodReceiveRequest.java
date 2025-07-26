package org.fpt.blooddonate.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "YeuCauCanMau")
@Data
@NoArgsConstructor
public class BloodReceiveRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "NguoiNhanId")
    private User nguoiNhan;

    private LocalDate ngayNhanMauDuKien;

    @ManyToOne(optional = false)
    @JoinColumn(name = "NhomMauId", nullable = false)
    private Blood nhomMau;

    @Column(length = 255)
    private String thanhPhanMauCan;

    @Column(nullable = false)
    private Integer soLuongDonVi;

    private String lyDo;

    @Column(nullable = false)
    private Boolean khanCap = false;

    @Column(length = 255)
    private String diaChiNhanMau;

    private String ghiChu;

    @ManyToOne
    @JoinColumn(name = "NguoiDuyetId")
    private User nguoiDuyet;

    private LocalDateTime ngayDuyet;

    @Column(name = "TrangThai", nullable = false)
    private String trangThai = "dangcho";

    @Column(name = "SucKhoeHienTai", nullable = true)
    private String sucKhoeHienTai = "";

    @Column(name = "DangMangThai", nullable = true)
    private int dangMangThai = 0;

    @Column(name = "MacBenhTruyenNhiem", nullable = true)
    private int macBenhTruyenNhiem = 0;

    @Column(name = "NgayTao", updatable = false)
    private LocalDateTime ngayTao = LocalDateTime.now();

    @Column(name = "NgayCapNhat")
    private LocalDateTime ngayCapNhat = LocalDateTime.now();

    @PreUpdate
    public void preUpdate() {
        this.ngayCapNhat = LocalDateTime.now();
    }
}
