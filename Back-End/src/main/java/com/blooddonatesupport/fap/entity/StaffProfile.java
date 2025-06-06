package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ThongTinNhanVien")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaThongTin")
    private Long id;

    @OneToOne
    @JoinColumn(name = "MaNguoiDung")
    private User user;

    @Column(name = "ChucVu")
    private String position;

    @Column(name = "PhongBan")
    private String department;

    @Column(name = "GhiChu")
    private String note;
}
