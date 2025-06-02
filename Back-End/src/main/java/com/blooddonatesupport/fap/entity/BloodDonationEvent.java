package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "SuKienHienMau")
public class BloodDonationEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String tenSuKien;

    @Column(nullable = false)
    private LocalDate ngayToChuc;

    @Column(nullable = false)
    private String diaDiem;

    private String moTa;

    private Integer soLuongNguoiDuKien;
}