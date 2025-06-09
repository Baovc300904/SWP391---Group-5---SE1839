package com.blooddonatesupport.fap.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "LoaiNhomMau")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BloodType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaNhomMau")
    private Integer id;

    @Column(name = "TenNhomMau", nullable = false, unique = true)
    private String name;
}