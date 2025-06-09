package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "YeuCauHienMau")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonationRegistration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaYeuCauHienMau")
    private Long id;

    @Column(name = "NgayHienMauDuKien")
    private LocalDate donationDate;

    @Column(name = "LoaiHien")
    private String donationType;

    @Column(name = "NhomMau")
    private String bloodGroup;

    @Column(name = "DiaDiem")
    private String location;

    @Column(name = "TrangThai")
    private String status;

    @ManyToOne
    @JoinColumn(name = "MaNguoiDung")
    private User user;
}



