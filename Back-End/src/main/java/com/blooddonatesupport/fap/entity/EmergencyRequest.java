package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "YeuCauCanMau")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmergencyRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaYeuCauCanMau")
    private Long id;

    @Column(name = "MaNhomMauCan")
    private Integer bloodGroupId;

    @Column(name = "ThanhPhanMauCan")
    private String bloodComponent;

    @Column(name = "SoLuongDonVi")
    private Integer quantity;

    @Column(name = "LyDo")
    private String description;

    @Column(name = "LaKhanCap")
    private boolean urgent;

    @Column(name = "DiaChiNhanMau")
    private String location;

    @Column(name = "TrangThai")
    private String status;

    @Column(name = "NgayDangKy")
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaNguoiDung")
    private User creator;
}
