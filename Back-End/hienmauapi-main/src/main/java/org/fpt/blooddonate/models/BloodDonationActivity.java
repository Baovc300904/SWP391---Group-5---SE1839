package org.fpt.blooddonate.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "HoatDongHienMau")
@Data
public class BloodDonationActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 255)
    private String ten;

    @Column(nullable = false)
    private LocalDate ngayBatDau;

    @Column(nullable = false)
    private LocalDate ngayKetThuc;

    @Column(nullable = false, length = 255)
    private String diaDiem;

    @Column(nullable = false)
    private String moTa;

    @Column(nullable = false)
    private Integer soLuongNguoiToiDa;

    @Column(nullable = false)
    private Integer soLuongNguoiDangKyHienTai = 0;

    @ManyToOne
    @JoinColumn(name = "nguoiTaoId")
    private User nguoiTao;

    @Column(length = 20)
    private String trangThaiHoatDong;

    @OneToMany(mappedBy = "hoatDongHienMau", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<BloodDonationRequest> danhSachYeuCauHieuMau = new ArrayList<>();

    @Column(nullable = false, updatable = false)
    private LocalDateTime ngayTao;

    @Column(nullable = false)
    private LocalDateTime ngayCapNhat;

    @PrePersist
    protected void onCreate() {
        this.ngayTao = LocalDateTime.now();
        this.ngayCapNhat = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.ngayCapNhat = LocalDateTime.now();
    }
}