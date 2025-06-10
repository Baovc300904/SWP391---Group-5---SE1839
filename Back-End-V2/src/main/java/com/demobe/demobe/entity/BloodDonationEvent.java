package com.demobe.demobe.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "HoatDongHienMau")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BloodDonationEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaHoatDong")
    private Integer id;

    @Column(name = "TenHoatDong", nullable = false)
    private String name;

    @Column(name = "NgayBatDau", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "NgayKetThuc", nullable = false)
    private LocalDateTime endDate;

    @Column(name = "DiaDiem", nullable = false)
    private String location;

    @Column(name = "MoTa", columnDefinition = "TEXT")
    private String description;

    @Column(name = "SoLuongNguoiToiDa")
    private Integer maxParticipants;

    @Column(name = "SoLuongNguoiDangKyHienTai")
    private Integer currentParticipants = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThaiHoatDong")
    private EventStatus status;

    @ManyToOne
    @JoinColumn(name = "MaNguoiTao", nullable = false)
    private User createdBy;

    @Column(name = "NgayTao")
    private LocalDateTime createdDate = LocalDateTime.now();

    public enum EventStatus {
        Sap_Dien_Ra, Dang_Dien_Ra, Da_Ket_Thuc, Huy
    }
}

