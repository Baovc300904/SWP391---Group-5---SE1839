package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "BloodInventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 10)
    private String bloodGroup;  // Example: A+, O-, B+

    @Column(nullable = false)
    private Integer quantity; // Unit: ml or blood units
}

