package org.fpt.blooddonate.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "KhoDonViMau")
@Data
@NoArgsConstructor
public class BloodUnitWareHouse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "NhomMauId")
    private Blood nhomMau;

    @Column(name = "ThanhPhan")
    private String thanhPhan = "toanphan";

    @Column(name = "SoLuong")
    private int soLuong;

    @Column(name = "NgayLayMau")
    private LocalDateTime ngayLayMau;

    @Column(name = "NgayHetHan")
    private LocalDateTime ngayHetHan;

    @ManyToOne
    @JoinColumn(name = "NguoiHienId")
    private User nguoiHien;

    @Column(name = "KetQuaXetNghiem", columnDefinition = "TEXT")
    private String ketQuaXetNghiem;

    @Column(name = "ViTriLuuTru")
    private String viTriLuuTru;

    @Column(name = "GhiChu")
    private String ghiChu;

    @Column(name = "TrangThai", nullable = false)
    private String trangThai = "choxetnghiem";

    @ManyToOne
    @JoinColumn(name = "YeuCauCanMauId")
    private BloodReceiveRequest yeuCauCanMau;

    @Column(name = "NgayTao", updatable = false)
    private LocalDateTime ngayTao = LocalDateTime.now();

    @Column(name = "NgayCapNhat")
    private LocalDateTime ngayCapNhat = LocalDateTime.now();

    @PreUpdate
    public void preUpdate() {
        this.ngayCapNhat = LocalDateTime.now();
    }
}
