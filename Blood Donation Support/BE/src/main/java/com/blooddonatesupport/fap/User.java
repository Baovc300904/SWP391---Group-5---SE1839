package com.blooddonatesupport.fap;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalDate;
import lombok.*;

@Entity
@Table(name = "NguoiDung")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maNguoiDung;

    @Column(nullable = false, length = 100)
    private String hoVaTen;

    @Column(nullable = false, unique = true, length = 50)
    private String tenDangNhap;

    @Column(nullable = false, length = 255)
    private String matKhauHash;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(length = 20)
    private String soDienThoai;

    private LocalDate ngaySinh;

    @Column(length = 10)
    private String gioiTinh;

    @Column(length = 255)
    private String diaChi;

    private Integer maNhomMau;

    @Column(length = 5)
    private String yeuToRh;

    @Lob
    private String tienSuBenh;

    @Column(precision = 5, scale = 2)
    private BigDecimal canNang;

    @Column(precision = 5, scale = 2)
    private BigDecimal chieuCao;

    @Column(length = 50)
    private String tinhTrangSucKhoeHienTai;

    @Column(nullable = false, length = 50)
    private String vaiTro;

    @Column(columnDefinition = "DATETIME DEFAULT GETDATE()")
    private LocalDateTime ngayDangKy;

    @Column(length = 50)
    private String trangThaiTaiKhoan = "Hoạt Động";

    @Column(length = 20)
    private String provider;
}