package com.demobe.demobe.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "LoaiNhomMau")
public class BloodType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaNhomMau")
    private Integer id;

    @Column(name = "TenNhomMau", nullable = false, unique = true, length = 10)
    private String name;

    @Column(name = "MoTa", columnDefinition = "TEXT")
    private String description;

    @Column(name = "TuongThichNhan", length = 255)
    private String compatibleReceive;

    @Column(name = "TuongThichHien", length = 255)
    private String compatibleDonate;
}
