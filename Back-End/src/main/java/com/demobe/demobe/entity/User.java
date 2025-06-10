package com.demobe.demobe.entity;
import com.demobe.demobe.enums.BloodType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Getter
@Setter
@Table(name = "NguoiDung")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaNguoiDung")
    private Integer id;

    @Column(name = "HoVaTen", nullable = false, length = 100)
    private String fullName;

    @Column(name = "TenDangNhap", nullable = false, unique = true, length = 50)
    private String username;

    @Column(name = "MatKhauHash", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "Email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "SoDienThoai", length = 20)
    private String phone;

    @Column(name = "NgaySinh")
    private LocalDate birthDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "GioiTinh")
    private Gender gender;

    @Column(name = "DiaChi", length = 255)
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "NhomMau")
    private BloodType bloodType;

    @Enumerated(EnumType.STRING)
    @Column(name = "YeuToRh")
    private RhFactor rhFactor;

    @Column(name = "TienSuBenh", columnDefinition = "TEXT")
    private String medicalHistory;

    @Column(name = "CanNang", precision = 5, scale = 2)
    private BigDecimal weight;

    @Column(name = "ChieuCao", precision = 5, scale = 2)
    private BigDecimal height;

    @Enumerated(EnumType.STRING)
    @Column(name = "TinhTrangSucKhoeHienTai")
    private HealthStatus healthStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "VaiTro", nullable = false)
    private Role role;

    @Column(name = "NgayDangKy")
    private LocalDateTime registrationDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThaiTaiKhoan")
    private AccountStatus accountStatus = AccountStatus.Hoat_Dong;
    // Enum
    public enum Gender { Nam, Nu, Khac }
    public enum RhFactor { PLUS("+"), MINUS("-"); private final String symbol; RhFactor(String s) { this.symbol = s; } @Override public String toString() { return symbol; } }
    public enum HealthStatus { Tot, Trung_Binh, Khong_Dat }
    public enum Role { Thanh_Vien, Quan_Tri_Vien, Nhan_Vien, Quan_Ly }
    public enum AccountStatus { Hoat_Dong, Khoa, Cho_Kich_Hoat }
}
