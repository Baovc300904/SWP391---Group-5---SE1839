
package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "NguoiDung")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaNguoiDung")
    private Integer userId;

    @Column(name = "HoVaTen", nullable = false, length = 100)
    private String fullName;

    @Column(name = "TenDangNhap", unique = true, nullable = false, length = 50)
    private String username;

    @Column(name = "MatKhauHash", nullable = false)
    private String password;

    @Column(name = "Email", unique = true, nullable = false, length = 100)
    private String email;

    @Column(name = "SoDienThoai", length = 20)
    private String phoneNumber;

    @Column(name = "NgaySinh")
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column(name = "GioiTinh")
    private Gender gender;

    @Column(name = "DiaChi")
    private String address;

    @Column(name = "MaNhomMau")
    private Integer bloodGroupId;

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
    private HealthStatus currentHealthStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "VaiTro", nullable = false)
    private Role role;

    @Column(name = "NgayDangKy")
    private LocalDateTime registrationDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThaiTaiKhoan")
    private AccountStatus accountStatus;  // ← Đây là enum

    // OAuth fields
    private String provider;
    private String providerId;

    // ===============================
    // = ENUMS DEFINITIONS
    // ===============================

    public enum Gender {
        Nam("Nam"),
        Nu("Nữ"),
        Khac("Khác");

        private final String displayName;

        Gender(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    public enum RhFactor {
        POSITIVE("+"),
        NEGATIVE("-");

        private final String value;

        RhFactor(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    public enum HealthStatus {
        Tot("Tốt"),
        Trung_Binh("Trung Bình"),
        Khong_Dat("Không Đạt");

        private final String displayName;

        HealthStatus(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    public enum Role {
        Thanh_Vien("Thành Viên"),
        Quan_Tri_Vien("Quản Trị Viên"),
        Nhan_Vien("Nhân Viên"),
        Quan_Ly("Quản Lý");

        private final String displayName;

        Role(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    // ← AccountStatus ENUM HERE
    public enum AccountStatus {
        Hoat_Dong("Hoạt Động"),
        Khoa("Khóa"),
        Cho_Kich_Hoat("Chờ Kích Hoạt");

        private final String displayName;

        AccountStatus(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }

        // Helper methods
        public boolean isActive() {
            return this == Hoat_Dong;
        }

        public boolean isPending() {
            return this == Cho_Kich_Hoat;
        }

        public boolean isBlocked() {
            return this == Khoa;
        }
    }

    // ===============================
    // = HELPER METHODS
    // ===============================

    public boolean isAccountActive() {
        return this.accountStatus != null && this.accountStatus.isActive();
    }

    public boolean canLogin() {
        return isAccountActive();
    }

    public String getFullBloodType() {
        if (bloodGroupId != null && rhFactor != null) {
            // Assuming blood group names like A, B, AB, O
            return "BloodGroup" + bloodGroupId + rhFactor.getValue();
        }
        return "Unknown";
    }
}