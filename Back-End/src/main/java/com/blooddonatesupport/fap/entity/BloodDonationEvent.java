package com.blooddonatesupport.fap.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "BloodDonationEvent") // Hoặc giữ nguyên "SuKienHienMau" nếu DB chưa đổi
public class BloodDonationEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String eventName;

    @Column(nullable = false)
    private LocalDate eventDate;

    @Column(nullable = false)
    private String location;

    private String description;

    private Integer expectedParticipants;
}
