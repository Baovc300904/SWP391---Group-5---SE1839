package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "LichSuHienMau")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonationHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaLichSu")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MaNguoiDung")
    private User user;

    @Column(name = "NgayHien")
    private LocalDate donationDate;

    @Column(name = "DiaDiem")
    private String location;

    @Column(name = "ThanhPhanMau")
    private String bloodComponent;

    @Column(name = "SoLuong")
    private Integer quantity;

    @Column(name = "GhiChu")
    private String note;
}
