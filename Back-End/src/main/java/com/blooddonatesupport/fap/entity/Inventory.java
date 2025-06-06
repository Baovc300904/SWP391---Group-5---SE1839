package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "KhoDonViMau")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaDonViMau")
    private Long id;

    @Column(name = "MaNhomMau")
    private Integer bloodGroupId;

    @Column(name = "ThanhPhanMau")
    private String bloodComponent;

    @Column(name = "SoLuong")
    private BigDecimal quantity;

    @Column(name = "NgayLayMau")
    private LocalDate collectedDate;

    @Column(name = "NgayHetHan")
    private LocalDate expiredDate;

    @Column(name = "TrangThai")
    private String status;
}

