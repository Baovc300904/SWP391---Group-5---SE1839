package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
import lombok.*;

@Entity
@Table(name = "NguoiDung")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaNguoiDung")
    private Long userId;

    @Column(name = "HoVaTen", nullable = false, length = 100)
    private String fullName;

    @Column(name = "TenDangNhap", nullable = false, unique = true, length = 50)
    private String username;

    @Column(name = "MatKhauHash", nullable = false, length = 255)
    private String password;

    @Column(name = "Email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "SoDienThoai", length = 20)
    private String phoneNumber;

    @Column(name = "NgaySinh")
    private LocalDate dateOfBirth;

    @Column(name = "GioiTinh", length = 10)
    private String gender;

    @Column(name = "DiaChi", length = 255)
    private String address;

    @Column(name = "MaNhomMau") // FK tới bảng LoaiNhomMau
    private String bloodType;

    @Column(name = "YeuToRh", length = 5)
    private String rhFactor;

    @Column(name = "TienSuBenh")
    @Lob
    private String medicalHistory;

    @Column(name = "CanNang", precision = 5, scale = 2)
    private BigDecimal weight;

    @Column(name = "ChieuCao", precision = 5, scale = 2)
    private BigDecimal height;

    @Column(name = "TinhTrangSucKhoeHienTai", length = 50)
    private String currentHealthStatus;

    @Column(name = "VaiTro", nullable = false, length = 50)
    private String role = "USER";

    @Column(name = "NgayDangKy", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime registrationDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThaiTaiKhoan", length = 50)
    private AccountStatus accountStatus = AccountStatus.HoatDong;

    // Cột này không có trong DB, bạn có thể bỏ nếu không dùng
    @Transient
    private String provider = "local";

    // Các quan hệ ánh xạ khác giữ nguyên
    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BloodRequest> bloodRequests;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DonationRegistration> donations;

    @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<EmergencyRequest> emergencyRequests;

    @PrePersist
    protected void onCreate() {
        if (registrationDate == null) registrationDate = LocalDateTime.now();
        if (accountStatus == null) accountStatus = AccountStatus.HoatDong;
        if (role == null) role = "USER";
    }
}

