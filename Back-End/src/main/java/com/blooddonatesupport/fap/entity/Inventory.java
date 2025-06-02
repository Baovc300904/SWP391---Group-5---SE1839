package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "KhoMau")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 10)
    private String nhomMau;  // VD: A+, O-, B+

    @Column(nullable = false)
    private Integer soLuong; // Đơn vị: ml hoặc đơn vị máu
}
