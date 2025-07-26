package org.fpt.blooddonate.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "NguoiDung")
@Data
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String ten;

    @Column(nullable = false, unique = true, length = 50)
    private String tenDangNhap;

    @JsonIgnore
    @Column(nullable = false, length = 255)
    private String matKhau;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(length = 20)
    private String soDienThoai;

    private LocalDate ngaySinh;

    @Column(length = 10)
    private String gioiTinh;

    @Column(length = 255)
    private String diaChi;

    @Column(nullable = true)
    private double latitude = 21.030653;

    @Column(nullable = true)
    private double longitude = 105.847130;

    @ManyToOne
    @JoinColumn(name = "NhomMauId", nullable = true)
    private Blood nhomMau;

    @OneToOne(mappedBy = "nguoiDung", cascade = CascadeType.ALL)
    @JsonManagedReference
    private EmployeeInformation thongTinNhanVien;

    @Column(length = 1)
    private String yeuToRh;

    @Column(columnDefinition = "TEXT")
    private String tienSuBenh;

    @Column(precision = 5, scale = 2)
    private BigDecimal canNang;

    @Column(precision = 5, scale = 2)
    private BigDecimal chieuCao;

    @Column(nullable = false, length = 20)
    private String vaiTro;

    @Column(nullable = false, columnDefinition = "INT DEFAULT 1", length = 1)
    private Integer trangThai = 1; // 0: inactive, 1: active

    @Column(name = "NgayTao", updatable = false)
    private LocalDateTime ngayTao;

    @Column(name = "NgayCapNhat")
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

    @Transient
    private double distance;
}
