package com.demobe.demobe.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "ThongTinNhanVien")
public class EmployeeDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaThongTinNhanVien")
    private Integer id;

    // Quan hệ 1-1 với bảng NguoiDung
    @OneToOne
    @JoinColumn(name = "MaNguoiDung", referencedColumnName = "MaNguoiDung", nullable = false, unique = true)
    private User user;

    @Column(name = "MaSoNhanVien", nullable = false, unique = true, length = 50)
    private String employeeCode;

    @Column(name = "ChucVu", length = 100)
    private String position;

    @Column(name = "PhongBan", length = 100)
    private String department;

    @Column(name = "NgayVaoLam")
    private LocalDate startDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThaiLamViec")
    private WorkStatus workStatus;

    @Column(name = "NgayNghiViec")
    private LocalDate resignationDate;

    @Column(name = "GhiChuNhanSu", columnDefinition = "TEXT")
    private String hrNotes;

    public enum WorkStatus {
        Dang_Lam_Viec,
        Nghi_Viec,
        Tam_Nghi
    }
}
