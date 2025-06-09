package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "HoatDongHienMau")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BloodDonationEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaHoatDong")
    private Long id;

    @Column(name = "TenHoatDong")
    private String eventName;

    @Column(name = "NgayBatDau")
    private LocalDate startDate;

    @Column(name = "NgayKetThuc")
    private LocalDate endDate;

    @Column(name = "DiaDiem")
    private String location;

    @Column(name = "MoTa")
    private String description;

    @Column(name = "SoLuongNguoiToiDa")
    private Integer maxParticipants;

    @Column(name = "TrangThaiHoatDong")
    private String status;

    @ManyToOne
    @JoinColumn(name = "MaNguoiTao")
    private User creator;
}
